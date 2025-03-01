import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from '@clerk/express'


import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import authRoutes from './routes/auth.route.js';
import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/ablum.route.js';
import statsRoutes from './routes/stat.route.js';

import {connectDB} from './lib/dib.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()) //parse req.body
app.use(clerkMiddleware()) // this add autho to req.obj => req.user.auth

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);





app.listen(PORT, () => {
    console.log(`Server is runing on ${PORT}`)
    connectDB();
})