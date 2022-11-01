import { useParams } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import PokemonForms from "./PokemonData/PokemonForms";
import PokemonTabContent from "./PokemonData/PokemonTabContent/TabContentCard/PokemonTabContent";

export const PokemonDataContext = createContext();

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
  const [pokemonDamageList, setPokemonDamageList] = useState([]);

  const pokemonInfo = formLoaded && {
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
    defensive: pokemonDamageList.filter((obj) => obj.position === "defence"),
    offensive: pokemonDamageList.filter((obj) => obj.position === "attack"),
  };
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
    const filterTypeData = (data) => {
      let damageListFiltered = [];

      data.forEach((obj) => {
        const index = damageListFiltered.findIndex(
          (item) => item.type === obj.type && item.position === obj.position
        );

        if (index !== -1) {
          damageListFiltered[index].damage =
            damageListFiltered[index].damage * obj.damage;
        } else {
          damageListFiltered.push(obj);
        }
      });

      return damageListFiltered;
    };

    const fetchTypeData = async (dataUrl) => {
      let data = [];

      const typeData = await fetch(dataUrl).then((res) => res.json());
      const damageRelations = await typeData.damage_relations; // Return an Object
      const damageMultiplier = Object.keys(damageRelations); // Returns an array
      damageMultiplier.forEach((multiplier) => {
        let position;
        let damage;
        switch (multiplier) {
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
        damageRelations[multiplier].forEach((type) => {
          const newItem = {
            position: position,
            damage: damage,
            type: type.name,
          };
          data.push(newItem);
        });
      });
      return data;
    };

    const genTypeData = async () => {
      const typeDataUrl = pokemonData.types.map((obj) => obj.type.url);
      const typeDamage = await Promise.all(
        typeDataUrl.map((dataUrl) => fetchTypeData(dataUrl))
      );
      const typeDamageData = typeDamage.flat();
      const filteredData = filterTypeData(typeDamageData);
      setPokemonDamageList(filteredData);
    };
    genTypeData();
    return () => {
      controller.abort();
    };
  }, [pokemonData]);

  // Used for debugging
  // ==================
  useEffect(() => {
    speciesLoaded && console.info(`Species loaded: ${species.name}`);
  }, [speciesLoaded, species]);

  useEffect(() => {
    formLoaded && console.info(`Form data loaded: ID no. ${pokemonData.id}`);
  }, [pokemonData, formLoaded]);

  // ==================
  if (formLoaded) {
    return (
      <PokemonDataContext.Provider value={pokemonInfo}>
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
      </PokemonDataContext.Provider>
    );
  } else {
    return <div>Loading Pokemon</div>;
  }
};

export default PokemonInfo;