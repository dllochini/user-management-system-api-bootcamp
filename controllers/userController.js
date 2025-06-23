//all data related logic
const storage = require('node-persist');
const bcrypt = require('bcrypt')
const getUser = async function(req,res){ 
    try {
        const values = await storage.values();//give you all values and it waits until you get the data
        res.send(values)//send us the fetched data 
    } catch (error) {
        console.log(error)
    }
}

const getUserByID = async (req,res)=>{ 
    const id = req.params.id;
    const userData = await storage.getItem(id);
    if(userData)
        return res.status(200).send({'message':'User Found',userData})
    else
        return res.status(404).send({'message':'User Not Found',userData})
}

const addUser = (req,res)=>{
    // console.log(req.body); //this is form data coming from user
    const {id,name,email,country,password,} = req.body;
    const hashPassword = bcrypt.hash(password,10)
    storage.setItem(id,{id,name,email,country,password:hashPassword}); //for nord-persist id should be string
    //setItem function takes key as id anf full object as value
    res.status(201).send('New User Created')
}

const deleteUserByID = async (req,res)=>{
    const id = req.params.id; //id i am capturing from URL
    const userData = await storage.getItem(id);
    if(userData){
        await storage.removeItem(id);
        res.status(200).send({"message":"User Deleted Successfully"})
    }else{
        res.status(404).send({"message":`User with id: ${id} id not registered with us`})
    }
    res.send(`User ${id} is deleted`)
}

const updateUserByID = async (req,res)=>{
    const id = req.params.id;
    const userData = await storage.getItem(id);
    if(userData){
        const {name,email,country,password} = req.body;
        if(name)
            userData.name=name
        if(email)
            userData.email=email
        if(country)
            userData.country=country
        if(password)
            userData.password = await bcrypt.hash(password,10)
        await storage.updateItem(id,userData)
        res.send(`User ${id} is updated successfully`)
    } else {
        res.send(`User with id ${id} is not available to update`)
    }
}

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
        return res.status(403).send({message: "All Fields are mandotory"})
    const users = await storage.values();
    const user = users.find(u => u.email === email);
    if(user){
        const result = await bcrypt.compare(password,user.password)
        if(result){
            return res.status(200).send("Login Successful")
        }else{
            return res.send("Invalid Creadentials")
        }
    }else{
        return res.send(`${email} is not registered with us`)
    }

}

module.exports = {
    getUser,
    getUserByID,
    addUser,
    deleteUserByID,
    updateUserByID,
    loginUser,
}