const express = require('express');
const router = express.Router();
const { addUser,getUserByID,getUser, deleteUserByID, updateUserByID } = require('../controllers/userController');
const storage = require('node-persist');

//get all users
router.get('/',getUser)

//get user by id
router.get('/:id',getUserByID)

//create new user
router.post('/',addUser)

//path /user/3 means delete user 3
router.delete('/:id',deleteUserByID)

//path /user/3 means update user 3
router.put('/:id',updateUserByID)

module.exports = router //export the router to use it in app.js