import{
    index,
    createPatientRecords,
} from '../daos/patient_records.dao';

exports.getAllPatientRecords = async () =>{return index()};

exports.createPatientRecords  = async (patientRecord) => {
    return createPatientRecords({...patientRecord});
}