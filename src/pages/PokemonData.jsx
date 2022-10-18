import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PokemonForms from "./PokemonData/PokemonForms";
import PokemonTabContent from "./PokemonData/PokemonTabContent";

const PokemonInfo = () => {
  const { id } = useParams();
  const [pokemonSpecies, setPokemonSpecies] = useState({
    name: "type-null",
    varieties: [],
  });
  const [activeForm, setActiveForm] = useState("");

  
  useEffect(() => {
    const fetchPokemonData = async () => {
    // =================
    // DATA FETCH BEGINS
    // =================

    // Gets access to whole Pokemon Species JSON
    const pokemonSpecies = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
    ).then((res) => res.json());

    // Iterates through the Species varieties array API and returns an array
    const pokemonForms = await Promise.all(
        pokemonSpecies.varieties.map(async (pokeForm) => {
        return await fetch(pokeForm.pokemon.url)
            .then((res) => res.json())
            .then((data) => {
            return {
                name: data.name,
                image: data.sprites.other["official-artwork"].front_default,
                types: data.types,
                stats: data.stats,
            };
            });
        })
    );

    // ===============
    // DATA FETCH ENDS
    // ===============

    // ===================
    // DATA SETTING BEGINS
    // ===================
    setPokemonSpecies({
        name: pokemonSpecies.name,
        varieties: pokemonForms,
    });
    // Sets a default active form
    setActiveForm(
        pokemonSpecies.varieties[pokemonSpecies.varieties.findIndex((obj) => obj.is_default)].pokemon.name
        )
    // ==================
    // DATA SETTINGS ENDS
    // ==================
    };
    fetchPokemonData();
  }, [id]);

  const pokeFormList = pokemonSpecies.varieties.map((form) => {
    return form.name;
  });
  return (
    <>
      <div className="row">
        <h1 className="col-auto" style={{ textTransform: "capitalize" }}>
          {pokemonSpecies.name}
        </h1>
        <h2 className="col-auto fw-lighter"># {id}</h2>
      </div>
      <PokemonForms
        pokeFormList={pokeFormList}
        activeForm={activeForm}
        setActiveForm={setActiveForm}
      />
      <div className="tab-content" id="myTabContent">
        <PokemonTabContent
          activeForm={activeForm}
          varieties={pokemonSpecies.varieties}
          />
      </div>
    </>
  );
};

export default PokemonInfo;


// TODO: Type damage relations