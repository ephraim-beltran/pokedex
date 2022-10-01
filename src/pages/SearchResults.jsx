import { useState, useEffect } from "react";
import PokemonCard from "../pokemon-component/PokemonCard";

const SearchResults = ({ pokeName }) => {
  const [pokeList, setPokeList] = useState([]);

  useEffect(() => {
    if (pokeName !== null) {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
        .then((res) => res.json())
        .then((data) => {
          setPokeList(data.results);
        });
    }
  }, [pokeName]);

  const pokeFilter = pokeList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokeName.toLowerCase())
  );

  const filteredList = pokeFilter.map((obj, i) => {
    return <PokemonCard pokeApi={obj} key={i} />;
  });


  if (pokeName !== ''){
    return (
      <>
        <div className="row row-cols-2 justify-content-center g-2">
          {filteredList}
        </div>
      </>
    );
  } else { return <h1>Enter pokemon name</h1>}
};

export default SearchResults;
