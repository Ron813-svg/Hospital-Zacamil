import express from 'express';
import passwordRecovControl from '../controller/passRecovControl.js';

const router = express.Router();

router.route('/requestCode').post(passwordRecovControl.requestCode)
router.route('/verifyCode').post(passwordRecovControl.verifyCode)
router.route('/newPassword').post(passwordRecovControl.newPassword)

export default router;