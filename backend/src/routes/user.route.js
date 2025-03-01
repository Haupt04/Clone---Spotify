import {Router} from 'express';

const router = Router();

router.get('/', (req,res) => {
    req.auth.userId
    res.send('User route with Get method')
})

export default router