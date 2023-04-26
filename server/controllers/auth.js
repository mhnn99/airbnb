import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

export const register = async (req, res) => {
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
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(500).json({message:err.message})
  }
};
