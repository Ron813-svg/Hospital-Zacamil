import jsonwebtoken from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import registerModel from '../models/Doctor.js'
import { config } from '../config.js'
import { error } from 'console'
import sendVerificationEmail from '../utils/verificationCode.js'

const registerControl = {}

registerControl.register = async (req,res) =>{
    const { name, specialty, email, password} = req.body
    try{
        const existProfile = await registerModel.findOne({email})

        if(existProfile){return res.status(400).json({message: "El email ya se encuentra registrado"})}

        const passwordHash = await bcryptjs.hash(password,10)
        const newProfile = await registerModel({name, specialty, email, password: passwordHash})
        await newProfile.save()

        const verificationCode = crypto.randomBytes(6).toString('hex')

        const tokenCode = jsonwebtoken.sign(
            {email,verificationCode},
            {expiresIn: '2h'}
        )
        res.cookie('VerificationToken', tokenCode, {maxAge: 2*60*60*1000})

        await sendVerificationEmail(email, verificationCode)

        res.json({message: 'Client register, please verify your email with the code'})

    } catch{
        console.log('error: '+ error)
        res.status(500).json({message: 'Hubo un error en el registro'})
    }
}

registerControl.verificationCodeEmail = async (req, res)=>{
    const {requirecode} = req.body
    const token = req.cookie.verificationCode

    try{
        console.log('JWT Secret: ', config.JWT.secret)
        const decode = jsonwebtoken.verify(token, config.JWT.secret)
        const {email, verificationCode: storedCode} = decode

        if(requirecode !== storedCode){ return res.json ({message: "Invalid code"}) }
        const client = await registerModel.findOne({email})
        client.isVerified = true
        await client.save()

        res.clearCookie('verificationToken')
        res.json({message:'Email verified Successfuly'})

    } catch{
        console.log("Error: " + error) 
    }
}
export default registerControl