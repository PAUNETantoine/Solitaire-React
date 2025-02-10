/*@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
Composant pour affichage des boutons
*/

function BoutonsDiv({handleGameRefresh, handleAutoStore, handleRetourArriere, handlePause})
{
    return (
        <div id="zoneBoutons">
            <button id="Rafraichir" className="boutons" onClick={handleGameRefresh} data-text="Relancer une partie"><img src={process.env.PUBLIC_URL + '/images/rafraichir.png'}></img></button>
            <button id="arriere"    className="boutons" onClick={handleRetourArriere} data-text="Action précédente"><img src={process.env.PUBLIC_URL + '/images/retour.png'}></img></button>
            <button id="pause"      className="boutons" onClick={handlePause} data-text="Mettre en pause"><img src={process.env.PUBLIC_URL + '/images/pause.png'}></img></button>
            <button id="rangementAuto" className="cacher" onClick={handleAutoStore} data-text="Rangement automatique"><img src={process.env.PUBLIC_URL + '/images/tri-auto.png'}></img></button>
        </div>
    )
}

export default BoutonsDiv;