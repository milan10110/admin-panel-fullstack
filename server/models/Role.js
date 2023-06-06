import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
    required: true,
  },
  write: {
    type: Boolean,
    default: false,
    required: true,
  },
  create: {
    type: Boolean,
    default: false,
    required: true,
  },
  delete: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    permissions: [
      {
        type: permissionSchema,
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);

export default Role;
