import jwt from "jsonwebtoken";
import User from "./user.model";
import bcrypt from 'bcryptjs'
import env from 'dotenv'

env.config()

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All Fields Are Required",
            success: false
        });
    }

    try {
        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                message: "User Already Exist",
                success: false
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10).catch((err) => {
            throw new Error("Password hashing failed");
        });

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            success: true
        });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({
            message: "Error registering user",
            success: false
        });
    }
};




export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate request body
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required.",
            success: false,
        });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password); // Ensure 'user.password' is hashed
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1d", // Token validity
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Set secure to true only in production
            sameSite: 'strict',  // Allow cross-origin in production
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });



        // Respond with success
        res.status(200).json({
            message: "Login successful.",
            success: true,
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({
            error: "An error occurred while processing your request.",
        });
    }
};


export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.status(200).json({ message: "Logout successful", success: true });
};

