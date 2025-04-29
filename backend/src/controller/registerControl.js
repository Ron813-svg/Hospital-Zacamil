import jsonwebtoken from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

import crypto from 'crypto'
import registerModel from '../models/Doctor.js'
import { config } from '../config.js'

import sendVerificationEmail from '../utils/verificationCode.js'

const registerControl = {}

registerControl.register = async (req, res) => {
    const { name, specialty, email, password } = req.body;
    try {
        const existProfile = await registerModel.findOne({ email });

        if (existProfile) {
            return res.status(400).json({ message: "El email ya se encuentra registrado" });
        }

        const passwordHash = await bcryptjs.hash(password, 10);
        const newProfile = new registerModel({ name, specialty, email, password: passwordHash });
        await newProfile.save();

        const verificationCode = crypto.randomBytes(6).toString('hex');
        console.log("Generated Verification Code:", verificationCode); 

        const tokenCode = jsonwebtoken.sign(
            { email, verificationCode },
            config.JWT.secret, 
            { expiresIn: '2h' }
        );

        res.cookie('VerificationToken', tokenCode, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });

        await sendVerificationEmail(email, verificationCode);

        res.json({ message: 'Client registered, please verify your email with the code' });

    } catch (error) {
        console.log('Error: ' + error);
        res.status(500).json({ message: 'Hubo un error en el registro: ' + error.message });
    }
};


registerControl.verificationCodeEmail = async (req, res) => {
    const { requirecode } = req.body;
    const token = req.cookies.VerificationToken;  

    try {
        if (!token) {
            return res.status(400).json({ message: "Token not found" });
        }

        console.log("Received Token:", token); 
        console.log("JWT Secret:", config.JWT.secret); 

        const decode = jsonwebtoken.verify(token, config.JWT.secret);
        console.log("Decoded Token:", decode); 
        const { email, verificationCode: storedCode } = decode;

        console.log("Stored Code from Token:", storedCode); 
        console.log("Code entered by user:", requirecode); 

        if (requirecode !== storedCode) {
            return res.json({ message: "Invalid code" });
        }

        await registerModel.findOneAndUpdate(
            { email },
            { isVerified: true },
            { new: true }
        );

        res.clearCookie("VerificationToken");
        res.json({ message: "Email verified successfully" });

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Hubo un error en la verificación: " + error.message });
    }
};

export default registerControl