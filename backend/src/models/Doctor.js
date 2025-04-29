import {Schema,model} from 'mongoose'


const doctorSchema = Schema({
    name: {
        type:String,
        require: true
    },
    specialty: {
        type:String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true,
    strict: false
})

export default model('Doctores', doctorSchema)