import { useContext } from "react";
import { PokemonDataContext } from "../../../PokemonData";

const AbilitiesList = () => {
  const pokemonInfo = useContext(PokemonDataContext);
  const abilities = pokemonInfo.abilities;
  const listHidden = (hidden) => {
    const ability = abilities
      .filter((ability) => ability.is_hidden === hidden)
      .map((ability, i) => {
        return (
            <dd key={i}>
                {ability.name.replace(/-/g, " ")}
            </dd>
        )
        });
    return ability
  };
  return (
    <div className="pokemon-abilities">
      <dl>
        <dt>Abilities</dt>
        {listHidden(false)}
      </dl>
      <dl>
        <dt>Hidden</dt>
        {listHidden(true)}
      </dl>
    </div>
  );
};

export default AbilitiesList;
