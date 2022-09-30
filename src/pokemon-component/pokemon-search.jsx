const PokemonSearchBar = ({setPokeName, pokeName}) => { 
    return(
        <input
        className="form-control my-3"
        type="text"
        placeholder="Search Pokemon"
        aria-label="default input example"
        value={pokeName}
        onChange={(e)=> setPokeName(e.target.value)}
      />
    )
 }

 export default PokemonSearchBar;