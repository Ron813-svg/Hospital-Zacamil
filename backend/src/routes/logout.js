import express from 'express';
import logoutControl from '../controller/logoutControl';

const router = express.Router();

router.route("/").post(logoutControl.logout);

export default router;