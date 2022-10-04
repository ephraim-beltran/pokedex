import "./PokemonFormCard.css"

const PokemonStats = ({pokemonImage}) => {
    return(
        <div className="pokemon-stats-card">
            <img src={pokemonImage} alt='' className="pokemon-image"/>
            <div className="pokemon-type">
            
            </div>
        </div>
    )
}

export default PokemonStats;