import User from './models/User.js';
import conn from './config/db.js';
import express from 'express';
import mongoose from 'mongoose';

const { model } = mongoose;

const _app = express();

_app.use(express.static('public'));
_app.use(express.json());

_app.listen(80, function () {
    console.log('listening on port 80');
})

_app.get('/api/users', async (req, res, next) => {
    const model_query = model('test', User);

    const user = await model_query.find().exec();

    console.log(user);
    res.status(200).json({
        message: "Done"
    });
})

_app.post('/api/users', async (req, res, next) => {
    const model_query = model('test', User);

    console.log(req.body);
    const data = req.body
    const user = new model_query(data);

   await user.save();
    res.status(200).json({
        message: 'Success added user'
    });
})

