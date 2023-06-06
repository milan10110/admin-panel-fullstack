import Role from "../models/Role.js";

async function seedRoles() {
  try {
    const userPermissions = [
      {
        id: 1,
        name: "User",
        read: true,
        write: false,
        create: false,
        delete: false,
      },
      {
        id: 2,
        name: "Transactions",
        read: true,
      },
    ];
    const adminPermissions = [
      {
        id: 1,
        name: "User",
        read: true,
        write: true,
        create: true,
        delete: true,
      },
      {
        id: 2,
        name: "Transactions",
        read: true,
        write: true,
        create: true,
        delete: true,
      },
    ];

    const adminRole = new Role({
      name: "admin",
      permissions: adminPermissions,
    });
    await adminRole.save();

    const userRole = new Role({
      name: "user",
      permissions: userPermissions,
    });
    await userRole.save();

    console.log("Roles and permissions seeded successfully.");
  } catch (error) {
    console.error("Error seeding roles and permissions: ", error);
  }
}

export default seedRoles;
