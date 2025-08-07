import sequelize from "./database.js";

// Import all models
import User from "./models/User.js";
import UserSettings from "./models/UserSettings.js";
import UserProgress from "./models/UserProgress.js";
import UserSchedule from "./models/UserSchedule.js";
import UserAchievement from "./models/UserAchievement.js";
import UserAccumulatedStats from "./models/UserAccumulatedStats.js";
import Exercise from "./models/Exercise.js";
import ExerciseGoal from "./models/ExerciseGoal.js";
import ExerciseMuscleGroup from "./models/ExerciseMuscleGroup.js";
import ExerciseType from "./models/ExerciseType.js";
import Routine from "./models/Routine.js";
import RoutineExercise from "./models/RoutineExercise.js";
import RoutineGoal from "./models/RoutineGoal.js";
import RoutineHistory from "./models/RoutineHistory.js";
import Program from "./models/Program.js";
import ProgramRoutine from "./models/ProgramRoutine.js";
import Goal from "./models/Goal.js";
import Intensity from "./models/Intensity.js";
import Achievement from "./models/Achievement.js";
import MuscleGroup from "./models/MuscleGroup.js";
import Type from "./models/Type.js";

// Import associations
import "./models/_associations.js";

const syncDatabase = async () => {
  try {
    console.log("🔄 Starting database synchronization...");

    // Check if force flag is provided
    const forceSync = process.argv.includes("--force");

    if (forceSync) {
      console.log(
        "⚠️  WARNING: Force sync enabled - This will DROP and RECREATE all tables!"
      );
      console.log("⚠️  All existing data will be LOST!");
    }

    // Test connection first
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");

    // Sync all models to database
    await sequelize.sync({
      force: forceSync, // Drop and recreate tables if --force flag is used
      alter: !forceSync, // Alter existing tables only if not using force
    });

    console.log("✅ All models were synchronized successfully.");
    console.log("📋 Tables created/updated:");

    // List all models that were synced
    const models = [
      "user",
      "user_settings",
      "user_progress",
      "user_schedule",
      "user_achievement",
      "user_accumulated_stats",
      "exercise",
      "exercise_goal",
      "exercise_muscle_group",
      "exercise_type",
      "routine",
      "routine_exercise",
      "routine_goal",
      "routine_history",
      "program",
      "program_routine",
      "local_goal",
      "local_intensity",
      "local_achievement",
      "local_muscle_group",
      "local_type",
    ];

    models.forEach((model) => {
      console.log(`   - ${model}`);
    });

    console.log("\n🎉 Database synchronization completed!");
  } catch (error) {
    console.error("❌ Unable to sync database:", error);
  } finally {
    // Close the connection
    await sequelize.close();
    console.log("🔌 Database connection closed.");
  }
};

// Run the sync
syncDatabase();
