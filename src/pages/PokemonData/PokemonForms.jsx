import "./PokemonForms.css";
// Accepts an array of strings and state hook
const PokemonForms = ({ pokeFormList, activeForm, setActiveForm }) => {
  const formTabs = pokeFormList.map((form, i) => {
    const pokemonName = form.pokemon.name;
    const pokemonNameDerived = form.pokemon.name.replace("-", " ");
    const activeName = activeForm.pokemon.name;
    const changeForm = (btn) => {
      btn.preventDefault();
      setActiveForm(form);
    };
    return (
      <li className="nav-item" key={i}>
        <button
          className={`nav-link ${pokemonName === activeName && "active"}`}
          id={`${pokemonName}-tab`}
          data-bs-toggle="tab"
          data-bs-target={`#${pokemonName}-tab-pane`}
          type="button"
          role="tab"
          aria-controls={`#${pokemonName}-tab-pane`}
          aria-selected={pokemonName === activeName}
          onClick={changeForm}
        >
          {pokemonNameDerived}
        </button>
      </li>
    );
  });

  return (
    <ul className="nav nav-tabs" id="myTab" role="tablist">
      {formTabs}
    </ul>
  );
};

export default PokemonForms;
