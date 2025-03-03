import express from "express";
import dotenv from "dotenv";
import fileUpload from 'express-fileupload'
import { clerkMiddleware } from '@clerk/express'
import {connectDB} from './lib/dib.js'
import path from 'path';


import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import authRoutes from './routes/auth.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/ablum.route.js';
import statsRoutes from './routes/stat.route.js';


dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(express.json()) //parse req.body
app.use(clerkMiddleware()) // this add autho to req.obj => req.user.auth
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: path.join(__dirname,"tmp"),
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024 //10mb max file size
    }
}))

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);


// error handing
app.use((err,req,res,next) => {
    res.status(500).json({message:process.env.NODE_ENV === "production" ? "Internal server error" : err.message})
})



app.listen(PORT, () => {
    console.log(`Server is runing on ${PORT}`)
    connectDB();
})