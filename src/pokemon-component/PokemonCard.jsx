import { useState , useEffect } from "react";
import "./PokemonCard.css";

const PokemonCard = ({ pokeApi }) => {
  const [pokeImage, setPokeImage] = useState("");
  useEffect(() => {
    fetch(pokeApi.url)
      .then(res => res.json())
      .then((data) => {
        setPokeImage(data.sprites.other["official-artwork"]["front_default"]);
      });
  }, [pokeApi]);

  return (
    <div className="card mx-1" style={{ width: "10rem" }}>
      <img src={pokeImage} className="card-img-top" alt={pokeApi.name} loading='lazy' />
      <div className="card-body">
        <h5 className="card-title">{pokeApi.name}</h5>
      </div>
    </div>
  );
};
export default PokemonCard;
