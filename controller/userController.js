const asyncHandler = require("express-async-handler")
const Users = require("../model/userSchema") 

const createUser = asyncHandler(async(req, res) => {
       
    const {firstName, lastName,email, gender} = req.body


    //Details are missing
    if(!firstName || !lastName || !email || !gender) {
        res.status(400)
        throw new Error("Details are missing")
    }

    //If user already exists
    const userExists = await Users.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("User already exists")
    }

    //Create User
    const newUSer = await Users.create({
        firstName,
        lastName,
        email,
        gender
    })

    if(newUSer){
        res.status(201).json({
           message: "User has been created successfully",
           firstName,
           lastName,
           email,
           gender
        })
    }else{
        res.status(400)
        throw new Error("Something went wrong")
    }
    

})

//Update User
const updateUser = (async(req, res)=>{
    const user = await Users.findById(req.params.id)

    //Error If user Not found
    if(!user){
        res.status(400)
        throw new error("User Not Found")
    }

    //Update User
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, 
    {new: true})

    if(updatedUser){
        res.status(200)
        res.json(updatedUser)
    }else{
        res.status(400)
        throw new Error ("User not updated")
    }
})

//Delete User
const deleteUser = asyncHandler(async(req,res) =>{
    const user = await Users.findById(req.params.id)
    
    //Error If user Not found
    if(!user){
        res.status(400)
        throw new Error("User not Found ")
    }

    //Delete if user Found
    const deletedUser = await user.remove()
    res.status(200).json({message: "User has been deleted"})
})

//List Users

const getUser = asyncHandler(async(req,res) =>{
    //Pagination

    const page = req.query.p || 0
    const perPage = 5
    const getUsers = await Users.find().skip((page-1) * perPage).limit(perPage)
    res.status(200).json(getUsers)

    // if(getUsers){
    //     res.status(200).json(getUsers)
    // }
})
module.exports = {createUser, updateUser, deleteUser, getUser}