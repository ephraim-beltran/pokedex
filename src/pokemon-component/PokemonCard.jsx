import { useState , useEffect } from "react";
import "./PokemonCard.css";

const PokemonCard = ({ pokeApi }) => {
  const [pokeImage, setPokeImage] = useState("");
  const [pokeName, setPokeName] = useState("");

  useEffect(() => {
    fetch(pokeApi)
      .then(res => res.json())
      .then(data => {
        setPokeImage(data.sprites.other["official-artwork"]["front_default"]);
        setPokeName(data.name);
      });
  }, [pokeApi]);

  return (
    <div className="card mx-1" style={{ width: "10rem" }}>
      <img src={pokeImage} className="card-img-top" alt={pokeName} loading='lazy' />
      <div className="card-body">
        <h5 className="card-title">{pokeName}</h5>
      </div>
    </div>
  );
};
export default PokemonCard;
