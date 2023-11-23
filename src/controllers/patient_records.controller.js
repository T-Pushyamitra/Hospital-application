import{
    getAllPatientRecords,
    createPatientRecords,
} from '../services/patientRecords.services';

exports.getPatientRecordsList = async(req,res) => {
    try{
        const patientRecords = await getAllPatientRecords();
        return res.json({
            message: 'Patient records found',
            data: patientRecords,
            status: 200,
        });
        
    }catch(error){
        return res.json({error:error.message, status: 500})
    }
};

exports.createNewPatientRecord = async (req,res)=>{
    try{
        const patientRecord = await createPatientRecords(req.body);
        return res.json({
            message:`Created Patient record`,
            data: patientRecord,
            status : 201,
        });
    }catch (error){
        console.log(error.message);
        return res.json({error: error.message, status:500});
    }
};