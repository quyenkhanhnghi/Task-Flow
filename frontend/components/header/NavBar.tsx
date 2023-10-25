import InboxIcon from "@mui/icons-material/Inbox";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../button";
import { UserIcon } from "./UserIcon";

interface NavBarProps {}

export function NavBar({}: NavBarProps) {
  const { data: session, status } = useSession();
  const handleLogout = () => {
    signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}`,
    });
  };

  return (
    <div className="AppHeader-notification">
      {session?.user ? (
        <>
          <a className="notification-icon AppHeader-button ">
            <InboxIcon style={{ fontSize: 25, color: "GrayText" }}>
              Notification
            </InboxIcon>
            <span className="notification-indicator"></span>
          </a>
          <UserIcon />
          <Button onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
    // <div className="flex items-center space-x-5 flex-1 justify-end w-full ">
    //   {session?.user ? (
    //     <>
    //       <div className="border border-gray-icon rounded-md hover:bg-gray-hover-icon transition duration-300 w-8 h-8 items-center align-super">
    //         <InboxIcon style={{ fontSize: 25, color: "GrayText" }}>
    //           Notification
    //         </InboxIcon>
    //       </div>
    //       <Button>Notification</Button>
    //       <Button onClick={handleLogout}>Logout</Button>
    //     </>
    //   ) : (
    //     <Link href="/login">Login</Link>
    //   )}
    // </div>
  );
}
