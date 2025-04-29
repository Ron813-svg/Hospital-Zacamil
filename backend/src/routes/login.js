import express from 'express'
import loginControl from '../controller/loginControl.js'

const router = express.Router()

router.route('/').post(loginControl.login)

export default router