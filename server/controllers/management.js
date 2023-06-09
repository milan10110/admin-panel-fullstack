import mongoose from "mongoose";
import { availablePermissions } from "../data/availablePermissions.js";
import Role from "../models/Role.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

async function getAdmins(req, res) {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function getUserPerformance(req, res) {
  try {
    const { id } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    const filteredSalesTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSalesTransactions });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function getRoleList(req, res) {
  try {
    const roles = await Role.find();

    const roleList = roles.map((role) => role.name);

    res.status(200).json(roleList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getRolePermissions(req, res) {
  try {
    const { name } = req.params;
    const role = await Role.findOne({ name: name });

    res.status(200).json(role.permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateRolePermissions(req, res) {
  try {
    const { name } = req.params;
    const permissions = req.body;

    await Role.updateOne({ name: name }, { permissions: permissions });

    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createNewRole(req, res) {
  try {
    const role = req.body;

    await Role.updateOne(
      { name: role.name },
      { name: role.name, permissions: role.permissions },
      { upsert: true }
    );

    res.status(200).json({ message: "Created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getAvailablePermissions(req, res) {
  try {
    const permissions = availablePermissions;
    res.status(200).json(permissions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

async function updateUserRole(req, res) {
  try {
    const { email } = req.params;
    const updatedRoles = req.body;

    const user = await User.updateOne({ email: email }, { role: updatedRoles });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
  getAdmins,
  getUserPerformance,
  getRoleList,
  getRolePermissions,
  updateRolePermissions,
  createNewRole,
  getAvailablePermissions,
  updateUserRole,
};
