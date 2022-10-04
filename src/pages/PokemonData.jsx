import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PokemonFormCard from "./PokemonData/PokemonFormCard";
import PokemonForm from "./PokemonData/PokemonForm";
import PokemonType from "./PokemonData/PokemonType";

const PokemonData = () => {
  const { id } = useParams();
  const [pokeName, setPokeName] = useState("");
  const [pokemonForms, setPokemonForms] = useState([]);
  const [pokemonFormCurrent, setPokemonFormCurrent] = useState({});
  const [pokemonStats, setPokemonStats] = useState({});
  const [pokemonImage, setPokemonImage] = useState("");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPokeName(data.name);
        setPokemonForms(data.varieties);
        setPokemonFormCurrent(
          data.varieties[data.varieties.findIndex((obj) => obj.is_default)]
        );
      });
  }, [id]);

  useEffect(() => {
    if (Object.keys(pokemonFormCurrent).length !== 0) {
      console.log("Form API loaded: " + pokemonFormCurrent.pokemon.url);
      fetch(pokemonFormCurrent.pokemon.url)
        .then((res) => res.json())
        .then((data) => {
          setPokemonStats(data);
          setPokemonImage(data.sprites.other["official-artwork"].front_default);
        });
    } else {
      console.log("Not yet loaded");
    }
  }, [pokemonFormCurrent]);

  return (
    <>
      <div className="row">
        <h1 className="col-auto" style={{ textTransform: "capitalize" }}>
          {pokeName}
        </h1>
        <h2 className="col-auto fw-lighter"># {id}</h2>
        <PokemonForm
          pokemonForms={pokemonForms}
          pokemonFormCurrent={pokemonFormCurrent}
          setPokemonFormCurrent={setPokemonFormCurrent}
        />
      </div>
      <div className="row my-2">
        <div id="pokemon-stats" className="col-sm-4">
          <PokemonFormCard pokemonImage={pokemonImage} />
        </div>
        <div className="col">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            quisquam ab odio inventore iste, autem architecto praesentium hic
            corporis voluptatibus ipsum, officia quo maiores quidem ut
            accusamus, nesciunt atque. Explicabo.
          </p>
        </div>
      </div>
    </>
  );
};

export default PokemonData;
