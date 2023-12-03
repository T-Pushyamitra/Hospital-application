const mongoose = require('mongoose');

const { Schema } = mongoose;

const PermissionSchema = new Schema(
  {
    permissionName: { type: String, required: true, unique: true },
    description: { type: String },
  },
  { versionKey: false, autoIndex: true },
);

const PermissionModel = mongoose.model('PermissionModel', PermissionSchema);

module.exports = PermissionModel;
