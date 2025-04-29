import express from 'express'
import cookieParser from 'cookie-parser'
import registerRoute from './src/routes/register.js'
import logoutRoute from './src/routes/logout.js'
import loginRoute from './src/routes/login.js'
import passRecovRoute from './src/routes/passRecov.js'

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/login", loginRoute);
app.use("/api/logout", logoutRoute);
app.use('/api/register', registerRoute)
app.use('/api/passwordRecovery', passRecovRoute)



export default app