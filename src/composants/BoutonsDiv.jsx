function BoutonsDiv({handleGameRefresh, handleAutoStore})
{
    return (
        <div id="zoneBoutons">
            <button id="Rafraichir" className="boutons" onClick={handleGameRefresh} data-text="Relancer une partie"><img src={process.env.PUBLIC_URL + '/images/rafraichir.png'} ></img></button>
            <button id="arriere"    className="boutons"></button>
            <button id="avant"      className="boutons"></button>
            <button id="rangementAuto" className="cacher" onClick={handleAutoStore}>Fin automatique</button>
        </div>
    )
}

export default BoutonsDiv;