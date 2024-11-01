import jwt from 'jsonwebtoken';
import { User } from "../models/User.js";
import bcrypt from 'bcrypt'
import sendMail from '../../middlewares/sendMail.mjs';

export const register = async(req, res) => {
    try {
        // res.send("Register Api...");
        const {email, name, password}=req.body;
        let user= await User.findOne({email});
        if(user)
            return res.status(400).json({
                message:"User already exists!!!",

        });
        const hashPassword = await bcrypt.hash(password, 10)
        //user
        user = {
            name,
            email,
            password: hashPassword
        }
        //otp
        const otp=Math.floor(Math.random()*1000000);
        //activation token
        const activationToken = jwt.sign(
            {
                user, 
                otp
            },
            process.env.Activation_Secret,
            {
                expiresIn: "5m",
            }
        );

        const data={
            name,
            otp,
        };

        await sendMail(
            email,
            "E learning",
            data
        )
        res.status(200).json({
            message:"OTP sent to your mail",
            activationToken,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}