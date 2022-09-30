import "./App.css";
import Home from "./pages/Home";
import PokemonSearchBar from "./pokemon-component/pokemon-search";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import SearchResults from "./pages/SearchResults";

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-results" element={<SearchResults pokeName={pokeName}/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
