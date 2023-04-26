const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, picturePath } = req.body;
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password,salt)
    const newUser = new userModel({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath
    })
    const savedUser = await newUser.save()
    
    res.status(201).json({user:savedUser, token})
  } catch (err) {
    res.status(500).json({message:err.message})
  }
};

const login = async(req,res) =>{
  try {
    const {email, password} = req.body
    const foundUser = await userModel.findOne({email:email})
    if(!foundUser)return res.status(400).json({message:'User not found'})

    const isMatch = await bcrypt.compare(password, foundUser.password)
    if(!isMatch)return res.status(400).json({message:'Incorrect Password'})
    const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    delete foundUser.password
    res.status(200).json({foundUser, token})
  } catch (err) {
    res.status(500).json({message:err.message})
  }
    

}

module.exports = {register, login}
