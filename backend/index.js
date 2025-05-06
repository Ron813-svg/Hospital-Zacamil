import app from './app.js'

import './database.js'
import dotenv from 'dotenv'

dotenv.config

import { config } from './src/config.js'

async function main() {
    const port = config.server.port
    app.listen(port)
    console.log('Server on port: ', port)
}

main();
