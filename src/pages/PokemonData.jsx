import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const PokemonData = () => {
  const { id } = useParams();
  const [pokeName, setPokeName] = useState("");

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPokeName(data.name);
        fetch()
      });
  }, [id]);

  return (
    <>
    <div className="row">
        <h1 style={{textTransform: 'capitalize'}}>
        {pokeName}
        </h1>    
    </div>
      <div className="row">
        <div className="col-sm-4">
        </div>
        <div className="col">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            quisquam ab odio inventore iste, autem architecto praesentium hic
            corporis voluptatibus ipsum, officia quo maiores quidem ut
            accusamus, nesciunt atque. Explicabo.
          </p>
        </div>
      </div>
    </>
  );
};

export default PokemonData;
