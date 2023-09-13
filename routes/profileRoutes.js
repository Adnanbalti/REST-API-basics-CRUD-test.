import express from 'express';
import {getProfile, updateProfile} from '../controllers/profileControllers.js'

const profileRoutes = express.Router();

profileRoutes.get('/getProfile', getProfile)
profileRoutes.put('/updateProfile', updateProfile)

export default profileRoutes
