import express from "express";
import { getUser, login, logout, updatePassword, updateProfile, deleteUser, sendOtp, registerWithOtp } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/getuser", isAuthenticated, getUser);
router.put("/update/profile", isAuthenticated, updateProfile)
router.put("/update/password", isAuthenticated, updatePassword)
router.delete("/delete", deleteUser);

router.post("/register", sendOtp);; // Step 1: Send OTP
router.post("/register/otp", registerWithOtp); // Step 2: Verify OTP and register

export default router;
