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
          <p>Pokemon loaded: {pokemonInfo.name}</p>
          <p>Form loaded: {activeForm.pokemon.name}</p>
        </div>
    )
  } else {
    return (
      <div className="loader-container">
        <MoonLoader color="hsla(168, 0%, 0%, 1)" />
      </div>
    )
  }




    // return (
    //     <>
    //     <div
    //       className="tab-pane fade"
    //       id="home-tab-pane"
    //       role="tabpanel"
    //       aria-labelledby="home-tab"
    //       tabIndex="0"
    //     >
    //       This is home
    //     </div>
    //     <div
    //       className="tab-pane fade show active"
    //       className="tab-pane fade show"
    //       id="charizard-mega-x-tab-pane"
    //       role="tabpanel"
    //       aria-labelledby="charizard-mega-x-tab"
    //       tabIndex="0"
    //     >
    //       This is profile
    //     </div>
    //     <div
    //       className="tab-pane fade"
    //       id="contact-tab-pane"
    //       role="tabpanel"
    //       aria-labelledby="contact-tab"
    //       tabIndex="0"
    //     >
    //       This is contacts
    //     </div>
    //     </>
    // )
 }

 export default PokemonTabContent;