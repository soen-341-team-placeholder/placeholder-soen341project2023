const SearchBar = ({ keyword, onChange }) => {
  const barStyle = {
    width: "30rem",
    background: "#F0F0F0",
    border: "none",
    borderRadius: "999px",
    margin: "0 1rem",
    padding: "0.7rem 1rem",
    color: "black",
  };
  return (
    <input
      style={barStyle}
      key="search-bar"
      value={keyword}
      placeholder="Search..."
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;
