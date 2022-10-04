import "./PokemonForm.css";

const PokemonForm = ({
  pokemonForms,
  pokemonFormCurrent,
  setPokemonFormCurrent,
}) => {
  const pokemonFormsList = pokemonForms.map((obj, i) => {
    const pokemonFormSelection = (btn) => {
      btn.preventDefault();
      setPokemonFormCurrent(obj);
    };
    const pokemonName = obj.pokemon.name.replace("-", " ");
    return (
      <li className="nav-item" key={i}>
        <button
          className={`nav-link ${obj === pokemonFormCurrent ? "active" : ""}`}
          onClick={pokemonFormSelection}
        >
          {pokemonName}
        </button>
      </li>
    );
  });
  return <ul className="nav nav-tabs flex-nowrap">{pokemonFormsList}</ul>;
};

export default PokemonForm;
