import "./TabContentCard.css";

const TabContentCard = ({
    image,      // String
    type,       // Array of objects
    abilities   // Array of objects
}) => {
    const types = type.map((type, i) => {
        return <span className={`pokemon-type-item ${type}`} key={i}>{type}</span>
    })
    return (
        <>
        <div className={`card p-3 ${type[0]}`} >
            <img src={image} alt="" />
            <div className="pokemon-type">{types}</div>
        </div>
        </>
    )
}

export default TabContentCard;