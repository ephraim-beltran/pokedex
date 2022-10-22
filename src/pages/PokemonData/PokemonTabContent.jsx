import { useEffect } from "react";
import { MoonLoader } from "react-spinners";
import "./PokemonTabContent.css";

const PokemonTabContent = ({
  activeForm,
  pokemonInfo
}) => {
  // =====================
  // For console debugging
  // =====================
    useEffect(() => {
      Object.keys(activeForm).length > 0
      ? console.log('Active form selected')
      : console.warn('No form active');
    }, [activeForm])
  // =====================

  if (Object.keys(activeForm).length > 0) {
    const activeName = activeForm.pokemon.name;
    return (
      <div
          className="tab-pane fade show active"
          id={`${activeName}-tab-pane`}
          role="tabpanel"
          aria-labelledby={`${activeName}-tab`}
          tabIndex="0"
        >
          <p>Pokemon loaded</p>
          {JSON.stringify(pokemonInfo)}
        </div>
    )
  } else {
    return (
      <div className="loader-container">
        <MoonLoader color="hsla(168, 0%, 0%, 1)" />
      </div>
    )
  }
 }

 export default PokemonTabContent;