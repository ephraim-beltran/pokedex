import "./TabContentCard.css";
import { useContext } from "react";
import { PokemonDataContext } from "../../../PokemonData";
import AbilitiesList from "./AbilitiesList";

const TabContentCard = () => {
  const pokemonInfo = useContext(PokemonDataContext);
  const image = pokemonInfo.image; // String
  const type = pokemonInfo.type; // Array of objects
  const stats = pokemonInfo.stats; // Array of objects

  const types = type.map((type, i) => {
    return (
      <span className={`pokemon-type-item ${type}`} key={i}>
        {type}
      </span>
    );
  });

  const getStat = (name) => {
    if (stats.length > 0) {
      const index = stats.findIndex((obj) => obj.name === name);
      return stats[index].base_stat;
    }
  };
  const getPlotPoints = (clockface, hypotenuse, midpoint) => {
    const pi = Math.PI;
    const radian30 = (30 * pi) / 180;
    const cos30 = Math.cos(radian30);
    const sin30 = Math.sin(radian30);
    let x;
    let y;
    const xRight = midpoint + hypotenuse * cos30;
    const xLeft = midpoint - hypotenuse * cos30;
    const yUpper = midpoint - hypotenuse * sin30;
    const yLower = midpoint + hypotenuse * sin30;
    switch (clockface) {
      case 12:
        x = midpoint;
        y = midpoint - hypotenuse;
        break;
      case 6:
        x = midpoint;
        y = midpoint + hypotenuse;
        break;
      case 2:
        x = xRight;
        y = yUpper;
        break;
      case 4:
        x = xRight;
        y = yLower;
        break;
      case 8:
        x = xLeft;
        y = yLower;
        break;
      case 10:
        x = xLeft;
        y = yUpper;
        break;
      default:
        break;
    }
    return {
      x: x,
      y: y,
    };
  };
  const SvgStats = () => {
    const hp = getStat("hp");
    const attack = getStat("attack");
    const defense = getStat("defense");
    const specialAttack = getStat("special-attack");
    const specialDefense = getStat("special-defense");
    const speed = getStat("speed");
    const centerPoint = 350;
    const max = 255;
    const edge = 295;

    return (
      <div className="pokemon-stats">
        <svg
          id={`${pokemonInfo.name}-stats`}
          className="pokemon-stats"
          width="75%"
          viewBox="50 0 600 700"
        >
          <polygon
            className="pokemon-stats-container"
            points={`
          ${getPlotPoints(12, max, centerPoint).x} ${
              getPlotPoints(12, max, centerPoint).y
            },
          ${getPlotPoints(2, max, centerPoint).x} ${
              getPlotPoints(2, max, centerPoint).y
            },
          ${getPlotPoints(4, max, centerPoint).x} ${
              getPlotPoints(4, max, centerPoint).y
            },
          ${getPlotPoints(6, max, centerPoint).x} ${
              getPlotPoints(6, max, centerPoint).y
            },
          ${getPlotPoints(8, max, centerPoint).x} ${
              getPlotPoints(8, max, centerPoint).y
            },
          ${getPlotPoints(10, max, centerPoint).x} ${
              getPlotPoints(10, max, centerPoint).y
            }
          `}
          />
          <g className="pokemon-stats-line">
            <line
              x1={getPlotPoints(12, max, centerPoint).x}
              y1={getPlotPoints(12, max, centerPoint).y}
              x2={getPlotPoints(6, max, centerPoint).x}
              y2={getPlotPoints(6, max, centerPoint).y}
            />
            <line
              x1={getPlotPoints(4, max, centerPoint).x}
              y1={getPlotPoints(4, max, centerPoint).y}
              x2={getPlotPoints(10, max, centerPoint).x}
              y2={getPlotPoints(10, max, centerPoint).y}
            />
            <line
              x1={getPlotPoints(2, max, centerPoint).x}
              y1={getPlotPoints(2, max, centerPoint).y}
              x2={getPlotPoints(8, max, centerPoint).x}
              y2={getPlotPoints(8, max, centerPoint).y}
            />
          </g>

          <text
            className="pokemon-stats-label"
            x={getPlotPoints(12, edge, centerPoint).x}
            y={getPlotPoints(12, edge, centerPoint).y - 10}
          >
            HP
          </text>
          <text
            className="pokemon-stats-value"
            x={getPlotPoints(12, edge, centerPoint).x}
            y={getPlotPoints(12, edge, centerPoint).y + 30}
          >
            {hp}
          </text>
          <text
            className="pokemon-stats-label"
            x={getPlotPoints(2, edge, centerPoint).x}
            y={getPlotPoints(2, edge, centerPoint).y - 20}
          >
            Attack
          </text>
          <text
            className="pokemon-stats-value"
            x={getPlotPoints(2, edge, centerPoint).x}
            y={getPlotPoints(2, edge, centerPoint).y + 20}
          >
            {attack}
          </text>
          <text
            className="pokemon-stats-label"
            x={getPlotPoints(4, edge, centerPoint).x}
            y={getPlotPoints(4, edge, centerPoint).y + 40}
          >
            Def
          </text>
          <text
            className="pokemon-stats-value"
            x={getPlotPoints(4, edge, centerPoint).x}
            y={getPlotPoints(4, edge, centerPoint).y}
          >
            {defense}
          </text>
          <text
            className="pokemon-stats-label"
            x={getPlotPoints(6, edge, centerPoint).x}
            y={getPlotPoints(6, edge, centerPoint).y + 40}
          >
            Speed
          </text>
          <text
            className="pokemon-stats-value"
            x={getPlotPoints(6, edge, centerPoint).x}
            y={getPlotPoints(6, edge, centerPoint).y}
          >
            {speed}
          </text>
          <text
            className="pokemon-stats-label"
            x={getPlotPoints(8, edge, centerPoint).x}
            y={getPlotPoints(8, edge, centerPoint).y + 40}
          >
            Sp.Def
          </text>
          <text
            className="pokemon-stats-value"
            x={getPlotPoints(8, edge, centerPoint).x}
            y={getPlotPoints(8, edge, centerPoint).y}
          >
            {specialDefense}
          </text>
          <text
            className="pokemon-stats-label"
            x={getPlotPoints(10, edge, centerPoint).x}
            y={getPlotPoints(10, edge, centerPoint).y - 20}
          >
            Sp.Atk
          </text>
          <text
            className="pokemon-stats-value"
            x={getPlotPoints(10, edge, centerPoint).x}
            y={getPlotPoints(10, edge, centerPoint).y + 20}
          >
            {specialAttack}
          </text>

          <polygon
            className="pokemon-stats-chart"
            points={`
        ${getPlotPoints(12, hp, centerPoint).x} ${
              getPlotPoints(12, hp, centerPoint).y
            },
        ${getPlotPoints(2, attack, centerPoint).x} ${
              getPlotPoints(2, attack, centerPoint).y
            },
        ${getPlotPoints(4, defense, centerPoint).x} ${
              getPlotPoints(4, defense, centerPoint).y
            },
        ${getPlotPoints(6, speed, centerPoint).x} ${
              getPlotPoints(6, speed, centerPoint).y
            },
        ${getPlotPoints(8, specialDefense, centerPoint).x} ${
              getPlotPoints(8, specialDefense, centerPoint).y
            },
        ${getPlotPoints(10, specialAttack, centerPoint).x} ${
              getPlotPoints(10, specialAttack, centerPoint).y
            },
        `}
          />
        </svg>
      </div>
    );
  };

  return (
    <>
      <div className={`card p-3 pokemon-card ${type[0]}`}>
        <img src={image} alt="" className="card-img-top" />
        <div className="card-body">
          <div className="pokemon-type">{types}</div>
          <SvgStats />
          <AbilitiesList />
        </div>
      </div>
    </>
  );
};

export default TabContentCard;
