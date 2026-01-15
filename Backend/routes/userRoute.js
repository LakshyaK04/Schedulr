import express from 'express';
import { registerUser, loginUser, getProfile, updateProfile, bookApointment, listAppointments, cancelAppointment } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';
import doctorModel from '../models/doctorModel.js';

const userRouter  = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

userRouter.get('/get-profile',authUser, getProfile);
userRouter.post('/update-profile', upload.single('image'), authUser,  updateProfile);
userRouter.post('/book-appointment', authUser, bookApointment);
userRouter.get('/appointments', authUser, listAppointments);
userRouter.post('/cancel-appointment', authUser, cancelAppointment);






export default userRouter;