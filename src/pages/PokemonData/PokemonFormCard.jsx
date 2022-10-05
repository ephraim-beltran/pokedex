import "./PokemonFormCard.css";

const PokemonStats = ({
  pokemonImage,
  pokemonType,
  pokemonFormDescription,
}) => {
  const pokemonTypeList = pokemonType.map((types, i) => {
    return (
      <div key={i} className={`pokemon-type-item col mx-2 text-center text-white ${types.type.name}`}>
        {types.type.name}
      </div>
    );
  });

  return (
    <div className="pokemon-stats-card p-md-3 p-4">
      <img src={pokemonImage} alt="" className="pokemon-image mb-3" />
      <div className="pokemon-type row justify-content-center">{pokemonTypeList}</div>
    </div>
  );
};

export default PokemonStats;
