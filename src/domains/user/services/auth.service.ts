import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/shared/lib/database";
import { User } from "@/domains/user/models/user.models";

export async function Auth(identifier: string, password: string) {
  try {
    if (!identifier || !password) {
      return { status: 400, error: "Data missing." };
    }

    await connectDB();
    const user = await User.findOne({
      $or: [
        { username: new RegExp(`^${identifier}$`, "i") },
        { email: new RegExp(`^${identifier}$`, "i") },
      ],
    });

    if (!user) {
      return { status: 404, error: "User not found." };
    }
    console.log("User Password from DB:", user.password);
    console.log("Entered Password:", password);
    const crypt = await bcrypt.hash(password, 10);
    console.log(crypt)
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Coincide", isMatch)
    if (!isMatch) {
      return { status: 401, error: "Failed password." };
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return { status: 200, token };
  } catch (error) {
    console.log("Error in Auth: ", error);
    return { status: 500, error: "Internal error" };
  }
}
