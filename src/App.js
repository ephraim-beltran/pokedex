import "./App.css";
import PokemonList from "./pokemon-component/pokemon-list";
import PokemonSearchBar from "./pokemon-component/pokemon-search";
import { useState } from "react";

function App() {
  const [pokeName, setPokeName] = useState("");

  return (
    <div>
      <nav className="navbar bg-dark">
        <div className="container-sm">
          <a className="navbar-brand text-white" href="/PokeList">
            Pokedex
          </a>
        </div>
      </nav>
      <main className="container-sm my-3">
        <PokemonSearchBar pokeName={pokeName} setPokeName={setPokeName} />
        <PokemonList pokeName={pokeName} />
      </main>
    </div>
  );
}

export default App;
