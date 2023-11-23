const mongoose = require('mongoose');

const { Schema } = mongoose;

const patientRecordSchema = new Schema({
    _userId: {type: Schema.Types.ObjectId, ref:'UserModel'},
    _doctorId:{type: Schema.Types.ObjectId, ref:'UserModel'},
    report:{type: String, required: true},
    }
);

const patientRecordModel = mongoose.model('patientRecordModel', patientRecordSchema);

module.exports = patientRecordModel;