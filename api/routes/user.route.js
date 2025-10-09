import express from 'express';
import { getUser,deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();


router.get("/:id",getUser)
router.delete("/:id",verifyToken ,deleteUser)



export default router;  