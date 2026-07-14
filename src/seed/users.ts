import userModel from "../models/user.model";

export const getAllUsers = async () => {
  return await userModel.find();
};

export const seedInitialUsers = async () => {
  try {
    const users = [
      {
        name: "admin",
        email: "admin@example.com",
        password: "password123@",
        role: "admin",
      },
      {
        name: "user",
        email: "user@example.com",
        password: "password456@",
        role: "user",
      },
    ];

    const existingUsers = await getAllUsers();

    if (existingUsers.length === 0) {
      await userModel.insertMany(users);
    }
  } catch (err) {
    console.error("Error seeding initial users:", err);
  }
};
