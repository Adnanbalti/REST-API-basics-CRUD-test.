import express from 'express'
import { getUsers, getUser } from '../controllers/usersController.js'
const usersRoutes = express.Router();

usersRoutes.get('/users', getUsers);
usersRoutes.get('/user/:id', getUser);

export default usersRoutes;