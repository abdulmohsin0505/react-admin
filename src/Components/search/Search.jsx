import React, { useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import "./search.css";

function Search({ value, handleSearch, handlePageClick }) {
  const inputRef = useRef(null);

  return (
    <div className="search">
      <input
        className="search_field"
        placeholder="Search..."
        value={value}
        onChange={(e) => {
          handleSearch(e.target.value);
          handlePageClick({ selected: 0 });
          inputRef.current.style.display = "none";
        }}
        onBlur={() => {
          inputRef.current.style.display = "block";
        }}
      />
      <div className="search_icon">
        <div ref={inputRef}>
          <AiOutlineSearch />
        </div>
      </div>
    </div>
  );
}

export default Search;
