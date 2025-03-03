import {Router} from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', protectRoute, (req,res) => {
    req.auth.userId
    res.send('User route with Get method')
    
})

export default router