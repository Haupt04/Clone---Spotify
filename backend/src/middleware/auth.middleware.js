import { clerkClient } from "@clerk/express";
import dotenv from "dotenv";

dotenv.config();

export const protectRoute = async (req, res, next) => {
	// console.log("🔍 Request headers:", req.headers);
    // console.log("🔍 Auth Data:", req.auth);
	if (!req.auth.userId) {
		console.log(" Unauthorized: No valid user ID");
		return res.status(401).json({ message: "Unauthorized - you must be logged in" });
	}
	next();
};

export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        console.log("Checking admin status for:", currentUser.primaryEmailAddress?.emailAddress);
        console.log("Expected admin email:", process.env.ADMIN_EMAIL);

        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

        if (!isAdmin) {
            return res.status(403).json({ message: "Unauthorized - you must be an admin" });
        }

        next();
    } catch (error) {
        next(error);
    }
};