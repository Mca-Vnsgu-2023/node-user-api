const express=require("express");
const router=express.Router();
const User= require('../model/UserModel')
var jwt = require('jsonwebtoken')
router.use(express.json());

router.post('/register', async(req,res)=>{
    const user= await User.create({
        username: req.body.username,
        email: req.body.email,
        password:req.body.password
    });
    return res.send({message: "Signup successfully.", user});
})

router.post('/login', async(req,res)=>{
    const {email, password} = req.body
    const UserData=await User.findOne({"email":email})
    if(!UserData){
        return res.send({
             message: "Email was not found." 
        })
    }
    if(UserData.password != password){
        return res.send({
            message: "Password is incorrect."
        })
    }

    const user = {
        _id: UserData?._id,
        username: UserData?.username,
        useremail: UserData?.email
    }

    const token=jwt.sign(user,process.env.JWT_SECRET_KEY);

    res.cookie('token', token, {expire : new Date() + 9999});
    
    return res.send({message: "User Login Successfully.", user, token})
})


router.get('/signout', async(req,res)=>{
    res.clearCookie("token")
    return res.json({message: "User SignOut successfully."})
})

router.get('/GetAllUser', async(req,res)=>{
    const UserList=await User.find();
    if(UserList.length ===0){
        res.send({message: "No data found"})
    }
    return res.send({data: UserList})
})

module.exports = router
