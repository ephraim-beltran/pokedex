import { useState, useEffect } from "react";
import { PokemonCard } from "./pokemon-list";

const SearchResult = () => { 
    const [pokeList, setPokeList] = useState([]);

    useEffect(() => {
      fetch().then(res => res.json()).then(data => {
        setPokeList(data.results)
      })
    });
    
    const pokeCardResult = pokeList.map((obj, i) => {
        return <PokemonCard pokeApi={obj.url} key={i} />
    })
    return (
        <>
        { pokeCardResult }
        </>
    )
 }

 export default SearchResult;