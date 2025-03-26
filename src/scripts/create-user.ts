import { User } from "@/domains/user/models/user.models";
import { connectDB } from "@/shared/lib/database";

export async function createAdmin() {
  await connectDB();

  const existingAdmin = await User.findOne({ username: "admin" });

  if (existingAdmin) {
    console.log("El usuario administrador ya existe.");
    return;
  }
  const admin = new User({
    username: "admin",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",
  });

  await admin.save();
  console.log("Administrador creado correctamente.");
}
