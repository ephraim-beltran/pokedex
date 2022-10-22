import { useState, useEffect } from "react";
import PokemonCard from "../pokemon-component/PokemonCard";

const SearchResults = ({ pokeName }) => {
  const [pokeList, setPokeList] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchList = async () => {
      const list = await fetch("https://pokeapi.co/api/v2/pokemon-species?limit=100000&offset=0", {signal:controller.signal}).then((res) => res.json())
      
      setPokeList(list.results)
    }
    pokeName !== null && fetchList()
    return () => controller.abort()
  }, [pokeName]);

  const pokeFilter = pokeList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokeName.toLowerCase())
  );

  const filteredList = pokeFilter.map((obj, i) => {
    return <PokemonCard pokeApi={obj.url} key={i} />;
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