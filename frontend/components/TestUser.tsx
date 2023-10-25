import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

interface TestUserProps {}

export async function TestUser({}: TestUserProps) {
  const session = await getServerSession(options);
  console.log(session);
  console.log("hii");
  return <div>Hiii</div>;
}
