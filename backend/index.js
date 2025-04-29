import express from 'express';
import cors from 'cors';
import { config } from './src/config.js';
import './database.js';
import loginControl from './src/controller/loginControl.js'

const app = express();

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
};

app.use(cors(corsOptions));

app.post('/api/login', loginControl.login);

async function main() {
    app.listen(config.server.port);
    console.log(`El servidor está encendido en el puerto ${config.server.port}`);
}

main();
