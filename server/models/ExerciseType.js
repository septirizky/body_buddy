import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const ExerciseType = sequelize.define(
  "ExerciseType",
  {
    type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    exercise_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
  },
  {
    tableName: "exercise_type",
    timestamps: false,
  }
);

export default ExerciseType;
