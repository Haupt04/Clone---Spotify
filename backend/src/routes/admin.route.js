import {Router} from 'express';
import { createSong, deleteSong, createAblum, deleteAblum, checkAdmin } from '../controller/admin.controller.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protectRoute, requireAdmin)

router.get("/check", checkAdmin)


router.get('/songs', createSong)
router.delete('/songs/:id', deleteSong)

router.get('/albums', createAblum)
router.delete('/albums/:id', deleteAblum)



export default router;