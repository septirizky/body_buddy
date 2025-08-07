import sequelize from "./database.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Sequelize, DataTypes, Model } from "sequelize";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const modelsDir = path.join(__dirname, "models");

const loadModels = async () => {
  const modelFiles = fs
    .readdirSync(modelsDir)
    .filter((file) => file.endsWith(".js"));

  for (const file of modelFiles) {
    const modelPath = path.join(modelsDir, file);
    const module = await import(modelPath);

    const ModelDef = module.default;

    // ✅ Jika model didefinisikan sebagai function (function-style)
    if (typeof ModelDef === "function" && !isClass(ModelDef)) {
      ModelDef(sequelize, DataTypes);
    }

    // ✅ Jika model didefinisikan sebagai class (class-style)
    else if (isClass(ModelDef)) {
      const modelInstance = new ModelDef(); // 👈 instantiate
      modelInstance.init(sequelize, DataTypes); // 👈 panggil init manual
    }

    // Kalau tidak keduanya, abaikan
    else {
      console.warn(`⚠️  Model ${file} tidak dikenali bentuknya.`);
    }
  }
};

function isClass(func) {
  return (
    typeof func === "function" &&
    /^class\s/.test(Function.prototype.toString.call(func))
  );
}

// Jalankan
loadModels()
  .then(() => sequelize.sync({ alter: true }))
  .then(() => {
    console.log("✅ Semua tabel berhasil dibuat atau diperbarui.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Gagal sync:", err);
    process.exit(1);
  });
