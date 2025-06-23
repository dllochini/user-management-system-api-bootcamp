const express = require('express');
const router = express.Router();
const { addUser,getUserByID,getUser, deleteUserByID, updateUserByID, loginUser } = require('../controllers/userController');

router.get('/',getUser)
router.get('/:id',getUserByID)
router.post('/',addUser)
router.delete('/:id',deleteUserByID)
router.put('/:id',updateUserByID)
router.post('/login',loginUser)

module.exports = router //export the router to use it in app.js