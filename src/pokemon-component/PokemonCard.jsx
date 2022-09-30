import { useState } from "react";
import "./PokemonCard.css";

const PokemonCard = ({ pokeApi }) => {
  const [pokeImage, setPokeImage] = useState("");

  fetch(pokeApi.url)
    .then((res) => res.json())
    .then((data) => {
      setPokeImage(data.sprites.other["official-artwork"]["front_default"]);
    });

  return (
    <div className="card" style={{ width: "10rem" }}>
      <img src={pokeImage} className="card-img-top" alt={pokeApi.name} />
      <div className="card-body">
        <h5 className="card-title">{pokeApi.name}</h5>
      </div>
    </div>
  );
};
export default PokemonCard;
