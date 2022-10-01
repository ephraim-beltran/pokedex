import PokemonCard from "./PokemonCard";
import { useEffect, useState } from "react";
import './poke-list.css';

const PokemonList = () => {
  const [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon-species?limit=16&offset=0"
  );
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState("");
  const [pokeList, setPokeList] = useState([]);

  useEffect(() => {
    fetch(currentPage)
      .then((res) => res.json())
      .then((data) => {
        setPokeList(data.results);
        setPreviousPage(data.previous);
        setNextPage(data.next);
      });
  }, [currentPage]);

  const pokeListItems = pokeList.map((obj, i) => {
    return <PokemonCard pokeApi={obj.url} key={i} />;
  });

  return (
    <>
      <div className="row row-cols-2 justify-content-center g-2">
        {pokeListItems}
      </div>
      {/* Button navigations */}
      <div
        className="btn-group btn-nav row-cols-3 my-3 mx-auto"
        role="group"
        aria-label="Page navigation"
      >
        <button
          type="button"
          className="btn btn-dark"
          disabled={previousPage === null ? true : false}
          onClick={() => setCurrentPage(previousPage)}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-dark"
          disabled={nextPage === null ? true : false}
          onClick={() => setCurrentPage(nextPage)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default PokemonList;
