import app from './app.js'
import { config } from './src/config.js'
import './database.js'

async function  main() {
    app.listen(config.server.port)
    console.log('El servidor esta encendido')
}

main()