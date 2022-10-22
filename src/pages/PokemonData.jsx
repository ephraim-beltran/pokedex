import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PokemonForms from "./PokemonData/PokemonForms";
import PokemonTabContent from "./PokemonData/PokemonTabContent";

const PokemonInfo = () => {
  const { id } = useParams();
  const [species, setSpecies] = useState({
    name: "type-null",
    varieties: [],
    pokedex_numbers: [
      {
        entry_number: 0,
        pokedex: {
          name: "national",
        },
      },
    ],
  });
  const [activeForm, setActiveForm] = useState({});
  const [pokemonData, setPokemonData] = useState({
    types: [],
    stats: [],
    abilities: [],
    sprites: {
      other: {
        "official-artwork":
          "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      },
    },
  });
  const pokemonInfo = {
    name: species.name,
    forms: species.varieties,
    image: pokemonData.sprites.other["official-artwork"].front_default,
    type: pokemonData.types.map((types) => types.type.name),
    stats: pokemonData.stats.map((stats) => {
      return {
        name: stats.stat.name,
        base_stat: stats.base_stat,
      };
    }),
    abilities: pokemonData.abilities.map((abilities) => {
      return {
        name: abilities.ability.name,
        is_hidden: abilities.is_hidden,
      };
    }),
    national_dex:
      species.pokedex_numbers[
        species.pokedex_numbers.findIndex(
          (dex) => dex.pokedex.name === "national"
        )
      ].entry_number,
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        // Gets access to whole Pokemon Species JSON
        const species = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`,
          { signal: controller.signal }
        ).then((res) => res.json());

        setSpecies(species);

        // Sets a default active form object
        setActiveForm(
          species.varieties[
            species.varieties.findIndex((obj) => obj.is_default)
          ]
        );
        Object.keys(species).length > 0
          ? console.info("Species data loaded")
          : console.warn("Species data not loaded");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchFormData = async () => {
      const formData = await fetch(activeForm.pokemon.url).then((res) =>
        res.json()
      );
      setPokemonData(formData);
    };
    Object.keys(activeForm).length > 0 && fetchFormData();
    return () => {
      controller.abort();
    };
  }, [activeForm]);

  // =================
  // Used for debuggin
  useEffect(() => {
    Object.keys(activeForm).length > 0
      ? console.info(`Form loaded: ${activeForm.pokemon.name}`)
      : console.error("Form not loaded");
  }, [activeForm]);

  useEffect(() => {
    Object.keys(pokemonData).length > 0
      ? console.info(`Form data loaded: ID no. ${pokemonData.id}`)
      : console.error("Form data not loaded");
  }, [pokemonData]);
  // =================
  return (
    <>
      <div className="row">
        <h1 className="col-auto" style={{ textTransform: "capitalize" }}>
          {pokemonInfo.name}
        </h1>
        <h2 className="col-auto fw-lighter"># {pokemonInfo.national_dex}</h2>
      </div>
      <PokemonForms
        pokeFormList={pokemonInfo.forms}
        activeForm={activeForm}
        setActiveForm={setActiveForm}
      />
      <div className="tab-content" id="myTabContent">
        <PokemonTabContent
          activeForm={activeForm}
          pokemonInfo={pokemonInfo}
          varieties={species.varieties}
        />
      </div>
    </>
  );
};

export default PokemonInfo;

// TODO: Type damage relations
