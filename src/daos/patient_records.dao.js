const patientRecordModel = require('../models/patient_records.model');


/**
 * 
 * @param {*} filters 
 * @returns 
 */
exports.index = async (filters = {}) => {return await patientRecordModel.find(filters)};

exports.createPatientRecords = async (patientRecord) => {
    const newPatientRecord = new patientRecordModel(patientRecord);
    await newPatientRecord.save();
    return newPatientRecord;
}