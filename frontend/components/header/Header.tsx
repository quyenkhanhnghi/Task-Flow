"use client"; //TODO: check why
import { useBoardStore } from "@/context/BoardStore";
import "./header.css";
import Image from "next/image";
import { NavBar } from "./NavBar";
import { SearchBar } from "./SearchBar";
import { Socket } from "socket.io-client";

interface HeaderProps {
  socket: null | Socket;
}

function Header() {
  const [searchString, setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);
  return (
    <header className="AppHeader">
      <div className="AppHeader-globalBar">
        <div className="AppHeader-globalBar-start">
          <Image
            src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Trello_logo.svg/1280px-Trello_logo.svg.png"
            alt="Trello logo"
            width={300}
            height={50}
            className="image-header"
          ></Image>
        </div>
        <div className="AppHeader-globalBar-end">
          <SearchBar />
          <NavBar />
        </div>
      </div>
    </header>
    // <header>
    //   <div className="flex flex-row justify-between md:flex-row items-center p-5 rounded-b-2xl">
    //     <div className="absolute top-0 left-0 w-full h-96 rounded-md filter blur-3xl opacity-50 -z-50" />
    //     <Image
    //       src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Trello_logo.svg/1280px-Trello_logo.svg.png"
    //       alt="Trello logo"
    //       width={300}
    //       height={100}
    //       className="w-44 md:w-56 pb-10 md:pb0 object-contain"
    //     ></Image>
    //     <div className="flex flex-end space-x-5 -translate-y-10 max-h-8 gap-1">
    //       <SearchBar />
    //       <NavBar />
    //     </div>
    //   </div>
    // </header>
  );
}

export default Header;
