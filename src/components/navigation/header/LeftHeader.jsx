import { FaSearch } from "react-icons/fa";

function LeftHeader() {
  return (
    <div className="p-4 lg:w-2/12  relative">
      <input
        type="text"
        className="text-md pl-2 pr-10 w-full  p-1 outline-none focus:shadow-lg focus:transition-all rounded-xl border border-black"
        placeholder="Search"
      />
      <FaSearch className="absolute  right-6 top-[22px] text-xl" />
    </div>
  );
}

export default LeftHeader;
