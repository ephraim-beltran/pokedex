import "./PokemonForms.css";

const PokemonForms = ({ pokeFormList, activeForm, setActiveForm }) => {
  const formTabs = pokeFormList.map((form, i) => {
    const pokemonName = form.replace("-", " ");
    const changeForm = (btn) => {
      btn.preventDefault();
      setActiveForm(form);
    };
    return (
      <li className="nav-item" key={i}>
        <button
          className={`nav-link ${form === activeForm ? "active" : ""}`}
          id={`${form}-tab`}
          data-bs-toggle="tab"
          data-bs-target={`#${form}-tab-pane`}
          type="button"
          role="tab"
          aria-controls={`#${form}-tab-pane`}
          aria-selected={form === activeForm}
          onClick={changeForm}
        >
          {pokemonName}
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
