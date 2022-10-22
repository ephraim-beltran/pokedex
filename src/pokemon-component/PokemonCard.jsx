import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PokemonCard.css";
import { PuffLoader, BarLoader } from "react-spinners";

const PokemonCard = ({ pokeApi }) => {
  const [loading, setLoading] = useState(true);
  const [listCard, setListCard] = useState({});
  const pokemonData = `/pokemon/${listCard.id}`;

  useEffect(() => {
    const controller = new AbortController();
    // setLoading(true);

    const fetchListItem = async () => {
      try {
        const cardData = await fetch(pokeApi, { signal: controller.signal }).then(
        (res) => res.json()
      );

      const cardImage = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${cardData.id}`,
        { signal: controller.signal }
      ).then((res) => res.json());

      const pokedex_number =
        cardData.pokedex_numbers[
          cardData.pokedex_numbers.findIndex(
            (obj) => obj.pokedex.name === "national"
          )
        ].entry_number;

      const image =
        cardImage.sprites.other["official-artwork"]["front_default"];

      setListCard({
        name: cardData.name,
        id: cardData.id,
        pokedex_number: pokedex_number,
        image: image,
      });
    }
    catch (error) {
      if (controller.signal.aborted) return
    }
    };
    pokeApi && fetchListItem();
    Object.keys(listCard).length > 0 && setLoading(false)

    return () => {
      controller.abort();
    };
  }, [pokeApi, listCard]);

  return (
    <Link to={pokemonData} className="card mx-1" style={{ width: "10rem" }}>
      {loading ? (
        <PuffLoader color="#000000" />
      ) : (
        <img
          src={listCard.image}
          className="card-img-top"
          alt=""
          role="presentation"
        />
      )}
      <div className="card-body">
        {loading ? (
          <BarLoader color="#000000" />
        ) : (
          <>
            <h5 className="card-title">{listCard.name}</h5>
            <div className="card-subtitle">#{listCard.pokedex_number}</div>
          </>
        )}
      </div>
    </Link>
  );
};
export default PokemonCard;
