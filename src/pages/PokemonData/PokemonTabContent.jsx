import { MoonLoader } from "react-spinners";
import "./PokemonTabContent.css";
import TabContentCard from "./PokemonTabContent/TabContentCard";
import DamageCalculator from "./PokemonTabContent/DamageCalculator";

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
          <div className="col">
            <div className="row h-auto">
              <div className="col">
                <div className="row">
                  <div className="col"><h3>Takes damage from:</h3></div>
                </div>
                <div className="row">
                  <div className="col">
                  <DamageCalculator />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-auto">
              <div className="col">
                <p>Note: If type is not listed above, assume that it is a 1x damage</p>
              </div>
            </div>
          </div>
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
