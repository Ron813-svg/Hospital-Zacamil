import express from 'express'
import registerControl from '../controller/registerControl.js'

const router = express.Router()

router.route('/').post(registerControl.register)
router.route('/verifyCodeEmail').post(registerControl.verificationCodeEmail)

export default router