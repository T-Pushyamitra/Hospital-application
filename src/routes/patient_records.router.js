const express = require('express');

const router = express.Router();

const{
    getPatientRecordsList,
    createNewPatientRecord,
}=require('../controllers/patient_records.controller');
const { auth, permit } = require('../auth/auth.middleware');

router.route('/pr').get(getPatientRecordsList).post(createNewPatientRecord);

module.exports = router;