const mongoose = require('mongoose');

const { Schema } = mongoose;

const RolePermissionSchema = new Schema(
  {
    _roleId: { type: Schema.Types.ObjectId, ref: 'RoleModel' },
    _permissionId: { type: Schema.Types.ObjectId, ref: 'PermissionModel' },
  },
  { versionKey: false, autoIndex: true },
);

const RolePermissionModel = mongoose.model(
  'RolePermissionModel',
  RolePermissionSchema,
);

module.exports = RolePermissionModel;
