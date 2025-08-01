import express from 'express'

import { loginUser, registerUser, adminLogin, deleteUsers } from '../controllers/userController.js'

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/delete', deleteUsers)

export default userRouter;