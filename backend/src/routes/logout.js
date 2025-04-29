import express from 'express';
import logoutControl from '../controller/logoutControl.js';

const router = express.Router();

router.route("/").post(logoutControl.logout);

export default router;