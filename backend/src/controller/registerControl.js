import jsonwebtoken from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import registerModel from '../models/Doctor.js'
import { config } from '../config.js'
import { error } from 'console'

const registerControl = {}

registerControl.register = async (req,res) =>{
    const { name, specialty, email, password} = req.body
    try{
        const existProfile = await registerModel.findOne({email})

        if(existProfile){return res.status(400).json({message: "El email ya se encuentra registrado"})}

        const passwordHash = await bcryptjs.hash(password,10)
        const newProfile = await registerModel({name, specialty, email, password: passwordHash})
        await newProfile.save()

        jsonwebtoken.sign(
            {id: newProfile._id},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},

            (err, token) => {
                if(err) console.log({message: "Hubo un error en el token: " + err.message})
                res.cookie("authtoken", token)
                res.json({message: "El empleado se ha registrado correctamente"})
            }
        )

    } catch{
        console.log('error: '+ error)
        res.status(500).json({message: 'Hubo un error en el registro'})
    }
}
export default registerControl