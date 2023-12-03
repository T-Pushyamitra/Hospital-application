var mongoose     = require('mongoose'), 
Schema       = mongoose.Schema

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


const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;