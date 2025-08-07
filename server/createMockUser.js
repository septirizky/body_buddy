import sequelize from "./database.js";
import User from "./models/User.js";
import UserSettings from "./models/UserSettings.js";
import UserProgress from "./models/UserProgress.js";
import UserSchedule from "./models/UserSchedule.js";
import Goal from "./models/Goal.js";
import Intensity from "./models/Intensity.js";

const MOCK_USER_ID = "00000000-0000-0000-0000-000000000123";
const MOCK_GOAL_ID = "00000000-0000-0000-0000-000000000001";
const MOCK_INTENSITY_ID = "00000000-0000-0000-0000-000000000001";

const createMockUser = async () => {
  try {
    console.log("🔄 Creating complete mock user data for development...");

    // Create mock goal if it doesn't exist
    const existingGoal = await Goal.findByPk(MOCK_GOAL_ID);
    if (!existingGoal) {
      await Goal.create({
        id: MOCK_GOAL_ID,
        name: "General Fitness",
        description: "Improve overall fitness and health",
      });
      console.log("✅ Mock goal created");
    } else {
      console.log("✅ Mock goal already exists");
    }

    // Create mock intensity if it doesn't exist
    const existingIntensity = await Intensity.findByPk(MOCK_INTENSITY_ID);
    if (!existingIntensity) {
      await Intensity.create({
        id: MOCK_INTENSITY_ID,
        name: "Moderate",
      });
      console.log("✅ Mock intensity created");
    } else {
      console.log("✅ Mock intensity already exists");
    }

    // Check if mock user already exists
    const existingUser = await User.findByPk(MOCK_USER_ID);

    if (existingUser) {
      console.log("✅ Mock user already exists, checking related data...");
    } else {
      // Create mock user
      const mockUser = await User.create({
        id: MOCK_USER_ID,
        birthday: "1990-01-01",
        gender: "other",
        weight: 70,
        weight_unit: "kg",
        picture: null,
      });
      console.log("✅ Mock user created successfully:", mockUser.id);
    }

    // Create mock user settings
    const existingSettings = await UserSettings.findByPk(MOCK_USER_ID);
    if (!existingSettings) {
      await UserSettings.create({
        user_id: MOCK_USER_ID,
        intensity_id: MOCK_INTENSITY_ID,
        goal_id: MOCK_GOAL_ID,
      });
      console.log("✅ Mock user settings created");
    } else {
      console.log("✅ Mock user settings already exist");
    }

    // Create mock user progress
    const existingProgress = await UserProgress.findByPk(MOCK_USER_ID);
    if (!existingProgress) {
      await UserProgress.create({
        user_id: MOCK_USER_ID,
        level: 1,
        level_progress: 0,
        streak: 0,
        highest_streak: 0,
      });
      console.log("✅ Mock user progress created");
    } else {
      console.log("✅ Mock user progress already exists");
    }

    // Create mock user schedule (7 days)
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    // Check if any schedule exists for this user
    const existingSchedules = await UserSchedule.findAll({
      where: { user_id: MOCK_USER_ID },
    });

    if (existingSchedules.length === 0) {
      // Create all days at once
      const scheduleData = days.map((day) => ({
        user_id: MOCK_USER_ID,
        day: day,
        active: true,
      }));

      await UserSchedule.bulkCreate(scheduleData);
      console.log("✅ Mock user schedule created");
    } else {
      console.log("✅ Mock user schedule already exists");
    }

    console.log("🎉 Complete mock user data setup finished!");
  } catch (error) {
    console.error("❌ Error creating mock user:", error);
  } finally {
    await sequelize.close();
  }
};

createMockUser();
