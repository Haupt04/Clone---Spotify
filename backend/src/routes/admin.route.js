import {Router} from 'express';
import { createSong, deleteSong, createAblum, deleteAblum } from '../controller/admin.controller.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/songs',protectRoute,requireAdmin,createSong)
router.delete('/songs/:id', protectRoute,requireAdmin, deleteSong)

router.get('/albums',protectRoute,requireAdmin,createAblum)
router.delete('/albums/:id', protectRoute,requireAdmin, deleteAblum)



export default router;