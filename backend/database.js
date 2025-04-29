import mongoose, { connect } from 'mongoose'
import {config} from './src/config.js'

mongoose.connect(config.db.URI)

const connection =  mongoose.connection

connection.once('open', () => {console.log('Bd is connected')})

connection.once('disconnected', () => {console.log('Bd is disconnected')})

connection.once('error', (error) => {console.log('error: ' + error)})

