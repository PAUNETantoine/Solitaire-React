function AffichageGagner({handleGameRefresh})
{
    return (
        <div id="zoneGagner" className="cacher">
            <img src={process.env.PUBLIC_URL + '/images/feu d artifice.gif'}></img>
            <p>Vous avez gagné !</p>
            <p id="tpsFin">Temps :  </p>
            <button id="Rafraichir" className="boutons" onClick={handleGameRefresh} data-text="Relancer une partie"><img src={process.env.PUBLIC_URL + '/images/rafraichir-fin.png'} ></img></button>
        </div>
    )
}

export default AffichageGagner;