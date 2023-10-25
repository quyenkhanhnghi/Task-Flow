import { useBoardStore } from "@/context/BoardStore";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "../button";

// flex border border-gray-icon rounded-md shadow-md md:flex-grow-0
interface SearchBarProps {}

export function SearchBar({}: SearchBarProps) {
  const [searchString, setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);
  return (
    <form className="AppHeader-search search-container">
      <div className="search-icon">
        <SearchIcon style={{ fontSize: "25", color: "GrayText" }} />
      </div>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchString(e.target.value)}
        className="search-input"
      />
    </form>

    // <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
    //   <SearchIcon fontSize="large" />
    //   <input
    //     type="text"
    //     placeholder="Search"
    //     onChange={(e) => setSearchString(e.target.value)}
    //     className="flex-1 outline-none p-2"
    //   />
    //   <button hidden>Search</button>
    // </form>
  );
}
