import mongoose from "mongoose";
const { Schema } = mongoose;


let User = new Schema({
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userPhoneNumber:{
        type : String,
        required: true,
        unique: true,
    },
    userEmail: {
        type : String,
        required: true,
    },
    userSex: {
        type : String,
        required: true,
    },
    userDOB: {
        type : Date
    },
    userDOJ:{
        type: Date,
    },
    userRole: {
        type: String,
        defaultValue: 'patient',
    }
});


export default User;