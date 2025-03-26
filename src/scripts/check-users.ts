import { User } from "@/domains/user/models/user.models";
import { connectDB } from "@/shared/lib/database";

export async function checkUsers() {
  await connectDB();
  const users = await User.find({});
  console.log(users);
}
