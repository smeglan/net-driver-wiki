"use server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/shared/lib/database";
import { User } from "@/domains/user/models/user.models";
import { cookies } from "next/headers";

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
    console.log(crypt);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Coincide", isMatch);
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

export const Login = async (identifier: string, password: string) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    return {
      isLogged: false,
      message: data.error || "Login Failed !",
    };
  }
  return { isLogged: true, message: "Welcome" };
};

export async function RefreshToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return { status: 401, error: "No token provided" };
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      role: string;
    };
    const newToken = jwt.sign(
      { userId: decoded.userId, role: decoded.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    cookieStore.set({
      name: "token",
      value: newToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    return { status: 200, token: newToken };
  } catch (error) {
    console.error("Error to refresh Token: \n", error);
    return { status: 401, error: "Invalid token" };
  }
}
