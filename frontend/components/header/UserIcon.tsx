import { useSession } from "next-auth/react";
import Image from "next/image";

interface UserIconProps {}

export function UserIcon({}: UserIconProps) {
  const { data: session, status } = useSession();
  return (
    session?.user && (
      <Image
        src={session.user.imageURL}
        alt="User image"
        width={50}
        height={50}
        className="AppHeader-user"
      />
    )
  );
}
