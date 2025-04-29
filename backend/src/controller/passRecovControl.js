import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import doctorModel from "../models/Doctor.js"; 
import { config } from "../config.js";
import { sendMail, HTMLRecoveryEmail } from "../utils/MailPassRecov.js";

const passwordRecoveryController = {};

passwordRecoveryController.requestCode = async (req, res) => {
    const { email } = req.body;

    try {
        const doctorFound = await doctorModel.findOne({ email });

        if (!doctorFound) {
            return res.json({ message: "Doctor not found" });
        }

        const code = Math.floor(10000 + Math.random() * 90000).toString();
        const token = jsonwebtoken.sign(
            { email, code, verified: false },
            config.JWT.secret,
            { expiresIn: "30m" }
        );

        res.cookie("tokenRecoveryCode", token, { maxAge: 20 * 60 * 1000 });

        await sendMail(
            email,
            "Password recovery code",
            `Your verification code is: ${code}`,
            HTMLRecoveryEmail(code)
        );

        res.json({ message: "Verification code sent" });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Server error" });
    }
};

passwordRecoveryController.verifyCode = async (req, res) => {
    const { code } = req.body;

    try {
        const token = req.cookies.tokenRecoveryCode;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if (decoded.code !== code) {
            return res.json({ message: "Invalid Code" });
        }

        const newToken = jsonwebtoken.sign(
            { email: decoded.email, code: decoded.code, verified: true },
            config.JWT.secret,
            { expiresIn: "20m" }
        );

        res.cookie("tokenRecoveryCode", newToken, { maxAge: 20 * 60 * 1000 });
        res.json({ message: "Code Verified successfully" });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Server error" });
    }
};

passwordRecoveryController.newPassword = async (req, res) => {
    const { newPassword } = req.body;

    try {
        const token = req.cookies.tokenRecoveryCode;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if (!decoded.verified) {
            return res.json({ message: "Code not verified" });
        }

        const { email } = decoded;
        const doctor = await doctorModel.findOne({ email });

        const hashPassword = await bcryptjs.hash(newPassword, 10);

        await doctorModel.findOneAndUpdate(
            { email },
            { password: hashPassword },
            { new: true }
        );

        res.clearCookie("tokenRecoveryCode");
        res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Server error" });
    }
};

export default passwordRecoveryController;
