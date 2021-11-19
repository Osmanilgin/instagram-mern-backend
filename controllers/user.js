import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

import User from '../models/user.js';

export const login = async (req, res) => {
   const {email, password} = req.body;
     
   try {
       const existingUser = await User.findOne({email})

       if (!existingUser) return res.status(404).json({message:"User doesn't exist"})

       const isPasswordValid = await bcrypt.compare(password, existingUser.password)

       if(!isPasswordValid) return res.status(400).json({message: "Invalid credentials"})

       const token = jwt.sign({email: existingUser.email, id: existingUser._id},process.env.TOKEN_SECRET,{expiresIn: "1h"})

       res.status(200).json({result: existingUser, token})
   } catch (error) {
       res.status(500).json({message: "Something went wrong."})
   }
}

export const signup = async (req, res) => {
    const {email, password,username,name} = req.body

    try {
        const existingUser = await User.findOne({email})

        if (existingUser) return res.status(400).json({message:"Email already exist"})

        const existingUsername = await User.findOne({username})

        if (existingUsername) return res.status(400).json({message:"Username already exist"})

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({email, password: hashedPassword, name, username})

        const token = jwt.sign({email: result.email, username: result.username, id: result._id},process.env.TOKEN_SECRET,{expiresIn: "1h"})

        res.status(200).json({token,result})
    } catch (error) {
        res.status(500).json({message: "Something went wrong."})
    }
}