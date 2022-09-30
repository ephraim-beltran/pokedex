import { useNavigate } from "react-router-dom";
const PokemonSearchBar = ({setPokeName, pokeName}) => { 
    const navigate = useNavigate();
    return(
        <input
        className="form-control my-3"
        type="text"
        placeholder="Search Pokemon"
        aria-label="default input example"
        value={pokeName}
        onChange={(e)=> {
          setPokeName(e.target.value);
          navigate('/search-results');
        }
        }
      />
    )
 }

 export default PokemonSearchBar;