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
  const [speciesLoaded, setSpeciesLoaded] = useState(false); // Only used for debugging
  const [activeForm, setActiveForm] = useState({});
  const [pokemonData, setPokemonData] = useState({
    types: [],
    stats: [],
    abilities: [],
    sprites: {
      other: {
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/772.png",
        },
      },
    },
  });
  const [formLoaded, setFormLoaded] = useState(false);
  let pokemonInfo = {};
  if (formLoaded) {
    pokemonInfo = {
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
  }

  useEffect(() => {
    setFormLoaded(false);
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
      } catch (error) {
        if (controller.signal.aborted) return;
        else setFormLoaded(false);
      }
    };
    fetchData();
    setSpeciesLoaded(true);
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchFormData = async () => {
      try {
        const formData = await fetch(activeForm.pokemon.url, {
          signal: controller.signal,
        }).then((res) => res.json());

        setPokemonData(formData);
      } catch (error) {
        if (controller.signal.aborted) return;
      }
    };

    fetchFormData();
    setFormLoaded(true);
    return () => controller.abort();
  }, [activeForm]);

  useEffect(() => {
    const controller = new AbortController();
    const typeInfoUrl = pokemonData.types.map((obj) => obj.type.url);
    let damageList = [];
    const fetchTypeInfo = async (url) => {
      const typeInfo = await fetch(url, { signal: controller.signal }).then(
        (res) => res.json()
      );
      const damageRelations = await typeInfo.damage_relations;
      const multiplier = Object.keys(damageRelations);
      multiplier.forEach((obj) => {
        let position;
        let damage;
        switch (obj) {
          case "double_damage_from":
            position = "defence";
            damage = 2;
            break;

          case "double_damage_to":
            position = "attack";
            damage = 2;
            break;

          case "half_damage_from":
            position = "defence";
            damage = 0.5;
            break;

          case "half_damage_to":
            position = "attack";
            damage = 0.5;
            break;

          case "no_damage_from":
            position = "defence";
            damage = 0;
            break;

          case "no_damage_to":
            position = "attack";
            damage = 0;
            break;

          default:
            break;
        }
        damageRelations[obj].forEach((type) => {
          damageList.push({
            position: position,
            damage: damage,
            type: type.name,
          });
        });
      });
    };

    typeInfoUrl.forEach((url) => fetchTypeInfo(url));
    console.log(damageList);
    return () => {
      controller.abort();
    };
  }, [pokemonData]);

  // ==================
  // Used for debugging
  useEffect(() => {
    speciesLoaded && console.info(`Species loaded: ${species.name}`);
  }, [speciesLoaded, species]);

  useEffect(() => {
    formLoaded && console.info(`Form data loaded: ID no. ${pokemonData.id}`);
  }, [pokemonData, formLoaded]);
  // ==================
  if (formLoaded) {
    return (
      <>
        <div className="row align-items-center">
          <h1 className="col-auto" style={{ textTransform: "capitalize" }}>
            {pokemonInfo.name}
          </h1>
          <h2 className="col-auto fw-lighter align-self-end">
            # {pokemonInfo.national_dex}
          </h2>
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
  } else {
    return <div>Loading Pokemon</div>;
  }
};

export default PokemonInfo;

// TODO: Summarize damageList
