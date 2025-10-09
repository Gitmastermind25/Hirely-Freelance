import mongoose from "mongoose";
import createError from "../utils/createError.js";
import User from "../models/user.model.js";

// Get user
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, "Invalid user ID"));
    }
    const user = await User.findById(id);
    if (!user) return next(createError(404, "User not found"));
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    next(createError(500, "Internal Server Error"));
  }
};

// Delete user
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(createError(404, "User not found"));

    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can delete only your account!"));
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted");
  } catch (err) {
    console.error("Error deleting user:", err);
    next(createError(500, "Internal Server Error"));
  }
};
