import { useEffect } from "react";
import { MoonLoader } from "react-spinners";
import "./PokemonTabContent.css";
import TabContentCard from "./PokemonTabContent/TabContentCard";

// pokemonInfo format
// name: "",
// forms: [],
// image: "",
// type: [],
// stats: [],
// abilities: [{
//    name: "",
//    is_hidden: true,
//    }],
// national_dex: 0

const PokemonTabContent = ({ activeForm, pokemonInfo }) => {
  // =====================
  // For console debugging
  // =====================
  useEffect(() => {
    Object.keys(activeForm).length > 0
      ? console.log("Active form selected")
      : console.warn("No form active");
  }, [activeForm]);
  // =====================

  if (Object.keys(activeForm).length > 0) {
    const activeName = activeForm.pokemon.name;
    return (
      <div
        className="tab-pane fade show active py-3"
        id={`${activeName}-tab-pane`}
        role="tabpanel"
        aria-labelledby={`${activeName}-tab`}
        tabIndex="0"
      >
        <div className="row">
          <div className="col-lg-4 col-sm-5">
            <TabContentCard
              image={pokemonInfo.image}
              type={pokemonInfo.type}
              abilities={pokemonInfo.abilities}
            />
          </div>
          <div className="col">Pokemon info</div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="loader-container">
        <MoonLoader color="hsla(168, 0%, 0%, 1)" />
      </div>
    );
  }
};

export default PokemonTabContent;
