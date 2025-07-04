const express = require('express');
const storage = require('node-persist');
storage.init();//initialize storage
const UserController = require('./routes/userRoutes')
const app = express();
const cors = require('cors')

//inbuilt middleware to pass the data
app.use(express.json())//JSON Parser -> pass the data

app.use(cors()) //third party middleware to handle req from frontend

app.use('/api/v1/user/',UserController)

app.listen(5000,()=>console.log('App running on Port 5000'))

//to access user API use below Path
//http://localhost:5000/api/v1/user (get and post method)
//http://localhost:5000/api/v1/user/anyid (put and delete method)