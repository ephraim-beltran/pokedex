import { useEffect, useState } from "react";
import "./pokemon-list.css";

const PokemonCard = ({ pokeApi }) => {
  const [pokeImage, setPokeImage] = useState("");
  useEffect(() => {
    fetch(pokeApi.url)
      .then((res) => res.json())
      .then((data) => {
        setPokeImage(data.sprites.other["official-artwork"]["front_default"]);
      });
  }, [pokeApi.url]);
  return (
    <div className="card" style={{ width: "10rem" }}>
      <img src={pokeImage} className="card-img-top" alt={pokeApi.name} />
      <div className="card-body">
        <h5 className="card-title">{pokeApi.name}</h5>
      </div>
    </div>
  );
};

const PokemonList = ({pokeName}) => {
  const [pokeList, setPokeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=16&offset=0"
  );
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState("");
  const filteredList = [];

  useEffect(() => {
    fetch(currentPage)
      .then((res) => res.json())
      .then((data) => {
        setPokeList(data.results);
        setPreviousPage(data.previous);
        setNextPage(data.next);
      });
  }, [currentPage]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    .then(res => res.json())
    .then(data => {
      data.results.map((obj, i) => {
        if (obj.name === pokeName) {
          filteredList.push(obj)
        }
      })
    })
  }, [pokeName])

  const pokeListItems = pokeList.map((obj, i) => {
    return <PokemonCard pokeApi={obj} key={i} />;
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
