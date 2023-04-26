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
    const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.status(201).json(savedUser, token)
  } catch (err) {
    res.status(500).json({message:err.message})
  }
};

module.exports = register
