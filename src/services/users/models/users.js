import mongoose from "mongoose";
const { Schema } = mongoose;


let UserSchema = new Schema(
    {    
        firstName       : { type: String, required: true },
        lastName        : { type: String, required: true },
        phoneNumber     : { type: String, required: true, unique: true },
        email           : { type: String, required: true },
        sex             : { type: String, required: true },
        password        : { type: String, required: true },
        dateOfBirth     : { type: Date },
        dateOfJoining   : { type: Date },
        role            : { type: String, defaultValue: 'patient' }
    },
    { versionKey: false, autoIndex: true }
);


export const UserModel = model('UserModel', UserSchema);