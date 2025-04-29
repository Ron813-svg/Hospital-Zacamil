import doctorModel from '../models/Doctor.js'
import bcryptjs from 'bcryptjs'
import  hsonWebToken  from 'jsonwebtoke'
import { config } from '../config.js'

const loginControl = {}

loginControl.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const doctor = await doctorModel.findOne({ email })
        if (!doctor) return res.status(400).json({ message: 'El email no se encuentra registrado' })

        const isMatch = await bcryptjs.compare(password, doctor.password)
        if (!isMatch) return res.status(400).json({ message: 'La contraseña es incorrecta' })

        hsonWebToken.sign(
            { id: doctor._id },
            config.JWT.secret,
            { expiresIn: config.JWT.expiresIn },
            (err, token) => {
                if (err) console.log({ message: 'Hubo un error en el token: ' + err.message })
                res.cookie('authtoken', token)
                res.json({ message: 'El empleado se ha logueado correctamente' })
            }
        )
    } catch (error) {
        console.log('error: ' + error)
        res.status(500).json({ message: 'Hubo un error en el login' })
    }
}

export default loginControl