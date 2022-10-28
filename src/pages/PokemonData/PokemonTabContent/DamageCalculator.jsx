import { useContext } from "react";
import { PokemonDataContext } from "../../PokemonData";
import "./DamageCalculator.css";


const DamageTypes = ({types}) => {
    const typeBoxes = types.map((obj, i) => {
    return <div key={`${obj.position}-${obj.damage}-${obj.type}`} className={`${obj.type}`}>{obj.type}</div>
})
    return (
        <>
        {typeBoxes}
        </>
    )
}

const DamageCalculator = () => {
    const pokemonInfo = useContext(PokemonDataContext);

    const defensive = pokemonInfo.defensive;
    const toSortDamage = [...new Set(defensive.map(obj => obj.damage))];
    const damageRating = toSortDamage.sort().reverse()
    const damageBoxes = damageRating.map((rating, i) => {
        const types = defensive.filter(obj => {
            return obj.damage === rating
        })
        return (
            <div className="damage-boxes" key={`${i}-${rating}`}>
            <span>{rating}x Damage</span>
            <DamageTypes types={types} />
            </div>
        )
    })
    return (
        <div className="damage-calculator">
            {damageBoxes}
        </div>
    )
}

export default DamageCalculator;