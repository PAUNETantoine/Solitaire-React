/*@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
Composant pour affichage de la victoire
*/

function AffichageGagner({handleGameRefresh, estConnecte, nbVictoires, nbDefaites, meilleurTemps})
{
    return (
        <div id="zoneGagner" className="cacher">
            <img src={process.env.PUBLIC_URL + '/images/feu d artifice.gif'}></img>
            <p>Vous avez gagné !</p>
            <p id="tpsFin"></p>
            <p id="nbCoups"></p>
            {estConnecte && (
                <div>
                    <p>Nombre de victoires : {nbVictoires}</p>
                    <p>Nombre de défaites : {nbDefaites}</p>
                    <p>Ratio Victoires / Défaites : {nbVictoires/nbDefaites * 100}</p>
                    <p>Meilleur Temps : 'En développement'</p>
                </div>
            )}
            <button id="Rafraichir" className="boutons" onClick={handleGameRefresh} data-text="Relancer une partie"><img src={process.env.PUBLIC_URL + '/images/rafraichir-fin.png'} ></img></button>
        </div>
    )
}

export default AffichageGagner;