import express from 'express';
import * as userController from './user.controller';
import * as userValidation from './user.validation';
const router = express.Router();
import { catchError } from '../common/middleware/catch.error.middleware';

router.post('/register', userValidation.createUser, catchError, userController.registerUser);


export default router;