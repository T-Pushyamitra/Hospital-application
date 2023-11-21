const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Field First Name is required'],
    },
    lastName: { type: String, required: [true, 'Field Last Name is required'] },
    phoneNumber: {
      type: String,
      required: [true, 'Field Phone Number is required'],
      unique: true,
    },
    email: { type: String, required: [true, 'Field Email is required'] },
    sex: {
      type: String,
      required: [true, 'Field Sex is required'],
      enum: ['male', 'female'],
    },
    dateOfBirth: { type: Date },
    dateOfJoining: { type: Date },
    role: { type: Schema.Types.ObjectId, ref: 'RoleModel' },
    password: { type: String, required: [true, 'Feild Password is required'] },
    token: { type: String },
  },
  { versionKey: false, autoIndex: true },
);

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;
