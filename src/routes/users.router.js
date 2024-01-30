import {Router} from 'express';
import {usersController} from '../controller/users.controller.js'
export const router = Router();
  
router.get('/', usersController.getUsers)
router.post('/', usersController.createUser)
router.get('/:id', usersController.getUsersById)
router.put('/:id', usersController.updateUser)



