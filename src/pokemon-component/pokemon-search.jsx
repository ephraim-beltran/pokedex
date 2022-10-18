import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const PokemonSearchBar = ({ setPokeName, pokeName }) => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (searchInput.length > 2) {
      setPokeName(searchInput);
    } else {
      setPokeName('')
    }
  }, [searchInput, setPokeName]);

  const handleInput = (e) => {
    setSearchInput(e.target.value);
    navigate("/pokemon");
  }

  return (
    <input
      className="form-control my-3"
      type="text"
      placeholder="Search Pokemon"
      aria-label="Search Pokemon"
      value={searchInput}
      onChange={handleInput}
    />
  );
};

export default PokemonSearchBar;
