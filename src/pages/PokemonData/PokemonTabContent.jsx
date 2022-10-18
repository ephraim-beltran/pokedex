const PokemonTabContent = ({activeForm}) => {
    
    return (
        <>
        <div
          className="tab-pane fade"
          id="home-tab-pane"
          role="tabpanel"
          aria-labelledby="home-tab"
          tabIndex="0"
        >
          This is home
        </div>
        <div
          // className="tab-pane fade show active"
          className="tab-pane fade show"
          id="charizard-mega-x-tab-pane"
          role="tabpanel"
          aria-labelledby="charizard-mega-x-tab"
          tabIndex="0"
        >
          This is profile
        </div>
        <div
          className="tab-pane fade"
          id="contact-tab-pane"
          role="tabpanel"
          aria-labelledby="contact-tab"
          tabIndex="0"
        >
          This is contacts
        </div>
        </>
    )
 }

 export default PokemonTabContent;