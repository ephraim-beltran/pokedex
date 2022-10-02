import { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css";

const PokemonCard = ({ pokeApi }) => {
  const [pokeId, setPokeId] = useState('');
  const [pokeImage, setPokeImage] = useState("");
  const [pokeName, setPokeName] = useState("");
  const [pokeDexNum, setPokeDexNum] = useState("");
  const pokemonData = `/pokemon/${pokeId}`;

  useEffect(() => {
    fetch(pokeApi)
      .then(res => res.json())
      .then(species => {
        setPokeId(species.id);
        setPokeName(species.name);
        setPokeDexNum(species.pokedex_numbers[species.pokedex_numbers.findIndex(obj => obj.pokedex.name === 'national')].entry_number)

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
        .then(res => res.json())
        .then(pokemon => {
          if (pokemon.sprites){
            setPokeImage(pokemon.sprites.other["official-artwork"]["front_default"]);
          }
        })
        
      });
  }, [pokeId, pokeApi]);

  return (
    <Link to={pokemonData} className="card mx-1" style={{ width: "10rem" }}>
      <img src={pokeImage} className="card-img-top" alt='' role='presentation' loading='lazy' />
      <div className="card-body">
        <h5 className="card-title">{pokeName}</h5>
        <div className="card-subtitle">#{pokeDexNum}</div>
      </div>
    </Link>
  );
};
export default PokemonCard;
