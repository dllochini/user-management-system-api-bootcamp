const express = require('express');
const storage = require('node-persist');
storage.init();//initialize storage
const router = express.Router();

router.get('/',async (req,res)=>{ 
    try {
        const values = await storage.values();//give you all values and it waits until you get the data
        res.send(values)//send us the fetched data 
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id',async (req,res)=>{ 
    const id = req.params.id;
    const userData = await storage.getItem(id);
    if(userData)
        return res.status(200).send({'message':'User Found',userData})
    else
        return res.status(404).send({'message':'User Not Found',userData})
})

router.post('/',(req,res)=>{
    // console.log(req.body); //this is form data coming from user
    const {id,name,email,country} = req.body;
    storage.setItem(id,{id,name,email,country}); //for nord-persist id should be string
    //setItem function takes key as id anf full object as value
    res.status(201).send('New User Created')
})

//path /user/3 means delete user 3
router.delete('/:id',async (req,res)=>{
    const id = req.params.id; //id i am capturing from URL
    const userData = await storage.getItem(id);
    if(userData){
        await storage.removeItem(id);
        res.status.apply(200).send({"message":"User Deleted Successfully"})
    }else{
        res.status(404).send({"message":`User with id: ${id} id not registered with us`})
    }
    res.send(`User ${id} is deleted`)
})

//path /user/3 means update user 3
router.put('/:id',async (req,res)=>{
    const id = req.params.id;
    const userData = await storage.getItem(id);
    if(userData){
        const {name,email,country} = req.body;
        if(name)
            userData.name=name
        if(email)
            userData.email=email
        if(country)
            userData.country=country
        await storage.updateItem(id,userData)
        res.send(`User ${id} is updated successfully`)
    } else {
        res.send(`User with id ${id} is not available to update`)
    }
})

module.exports = router //export the router to use it in app.js