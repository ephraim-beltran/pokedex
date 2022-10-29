import "./TabContentCard.css";
import { useContext } from "react";
import { PokemonDataContext } from "../../PokemonData";

const TabContentCard = () => {
  const pokemonInfo = useContext(PokemonDataContext);
  const image = pokemonInfo.image; // String
  const type = pokemonInfo.type; // Array of objects
  const abilities = pokemonInfo.abilities; // Array of objects
  const stats = pokemonInfo.stats; // Array of objects

  const getStat = (name) => {
    if (stats.length > 0) {
      const index = stats.findIndex((obj) => obj.name === name);
      return stats[index].base_stat;
    }
  };

  const svgStats = () => {
    const hp = getStat("hp");
    const attack = getStat("attack");
    const defense = getStat("defense");
    const specialAttack = getStat("special-attack");
    const specialDefense = getStat("special-defense");
    const speed = getStat("speed");
    const centerPoint = 270;
    const yCenterPoint = 350;
    const pi = Math.PI;
    const radian30 = (30 * pi) / 180;
    const cos30 = Math.cos(radian30);
    const sin30 = Math.sin(radian30);
    const baseCos = 255 * cos30;
    const baseSin = 255 * sin30;
    const edge = 295;
    const plotPoints = {
      hp: {
        x: centerPoint,
        y: yCenterPoint - hp,
      },
      attack: {
        x: centerPoint + attack * cos30,
        y: yCenterPoint - attack * sin30,
      },
      defense: {
        x: centerPoint + defense * cos30,
        y: yCenterPoint + defense * sin30,
      },
      speed: {
        x: centerPoint,
        y: yCenterPoint + speed,
      },
      specialAttack: {
        x: centerPoint - specialAttack * cos30,
        y: specialAttack * sin30 + yCenterPoint,
      },
      specialDefense: {
        x: centerPoint - specialDefense * cos30,
        y: yCenterPoint - specialDefense * sin30,
      },
    };

    return (
      <svg
        id={`${pokemonInfo.name}-stats`}
        className="pokemon-stats"
        width="70%"
        viewBox="0 0 540 700"
      >
        <polygon
        className="pokemon-stats-container"
          points={`
          ${centerPoint} ${yCenterPoint+255},
          ${centerPoint + baseCos} ${yCenterPoint + baseSin},
          ${centerPoint + baseCos} ${yCenterPoint - baseSin},
          ${centerPoint} ${yCenterPoint-255},
          ${centerPoint - baseCos} ${yCenterPoint - baseSin},
          ${centerPoint - baseCos} ${yCenterPoint + baseSin},
          `}
        />

        <text
        className="pokemon-stats-label"
        x={centerPoint}
        y={yCenterPoint - edge - 10}
        >HP</text>
        <text
        className="pokemon-stats-value"
        x={centerPoint}
        y={yCenterPoint - edge + 30}
        >{hp}</text>
        <text
        className="pokemon-stats-label"
        x={centerPoint + edge*cos30 - 30}
        y={yCenterPoint - edge*sin30 - 15}
        >Atk</text>
        <text
        className="pokemon-stats-value"
        x={centerPoint + edge*cos30 - 30}
        y={yCenterPoint - edge*sin30 - 55}
        >{attack}</text>
        <text
        className="pokemon-stats-label"
        x={centerPoint + edge*cos30 - 30}
        y={yCenterPoint + edge*sin30 + 25}
        >Def</text>
        <text
        className="pokemon-stats-value"
        x={centerPoint + edge*cos30 - 30}
        y={yCenterPoint + edge*sin30 + 65}
        >{defense}</text>
        <text
        className="pokemon-stats-label"
        x={centerPoint}
        y={yCenterPoint + edge}
        >Speed</text>
        <text
        className="pokemon-stats-value"
        x={centerPoint}
        y={yCenterPoint + edge + 40}
        >{speed}</text>
        <text
        className="pokemon-stats-label"
        x={centerPoint - edge*cos30 + 30}
        y={yCenterPoint + edge*sin30 + 30}
        >Sp.Atk</text>
        <text
        className="pokemon-stats-value"
        x={centerPoint - edge*cos30 + 30}
        y={yCenterPoint + edge*sin30 + 70}
        >{specialAttack}</text>
        <text
        className="pokemon-stats-label"
        x={centerPoint - edge*cos30 + 35}
        y={yCenterPoint - edge*sin30 - 15}
        >Sp.Def</text>
        <text
        className="pokemon-stats-value"
        x={centerPoint - edge*cos30 + 30}
        y={yCenterPoint - edge*sin30 - 55}
        >{specialDefense}</text>
        <polygon 
        className="pokemon-stats-chart"
        points={`
        ${plotPoints.hp.x} ${plotPoints.hp.y},
        ${plotPoints.attack.x} ${plotPoints.attack.y},
        ${plotPoints.defense.x} ${plotPoints.defense.y},
        ${plotPoints.speed.x} ${plotPoints.speed.y},
        ${plotPoints.specialAttack.x} ${plotPoints.specialAttack.y},
        ${plotPoints.specialDefense.x} ${plotPoints.specialDefense.y},
        `}
        />
      </svg>
    );
  };

  const types = type.map((type, i) => {
    return (
      <span className={`pokemon-type-item ${type}`} key={i}>
        {type}
      </span>
    );
  });
  return (
    <>
      <div className={`card p-3 pokemon-card ${type[0]}`}>
        <img src={image} alt="" className="card-img-top" />
        <div className="card-body">
          <div className="pokemon-type">{types}</div>
          <div className="pokemon-stats">{svgStats()}</div>
        </div>
      </div>
    </>
  );
};

export default TabContentCard;
