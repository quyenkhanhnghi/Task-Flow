import Board from "@/components/Board";
import Header from "@/components/header/Header";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("api/auth/signin?callbackUrl=/");
  }

  return (
    <main>
      <Header />
      <Board />
    </main>
  );
}
