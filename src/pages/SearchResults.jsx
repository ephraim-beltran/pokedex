import PokemonCard from "../pokemon-component/PokemonCard";

const SearchResults = () => {
  let pokeList = [];
  fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    .then((res) => res.json())
    .then((data) => {
      pokeList = data.results;
    });
  const pokeName = "pikachu";
  
  const pokeFilter = pokeList.filter(pokemon => {
    return pokeList.name === pokeName;
  })

  const filteredList = pokeFilter.map((pokemon, i) => {
    return <PokemonCard pokeApi={pokemon.url} key={i} />
  })

  return <>{ filteredList }</>;
};

export default SearchResults;
