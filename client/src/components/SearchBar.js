const SearchBar = ({keyword, onChange}) => {
  const BarStyle = {
    width: "20rem",
    background: "#F0F0F0",
    border: "none",
    borderRadius: "999px",
    margin: "0rem 1rem",
    padding: "0.7rem 1rem",
    color:'black'
  };
  return (
    <input 
     style={BarStyle}
     key="search-bar"
     value={keyword}
     placeholder={"Search ..."}
     onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;
