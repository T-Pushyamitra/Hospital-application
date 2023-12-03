const mongoose = require('mongoose');

const { Schema } = mongoose;

const RoleSchema = new Schema(
  {
    roleName: { type: String, required: true, unique: true },
    description: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { versionKey: false, autoIndex: true },
);

const RoleModel = mongoose.model('RoleModel', RoleSchema);

module.exports = RoleModel;
