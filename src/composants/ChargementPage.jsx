/*
@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
Composant qui permet de marquer un temps de chargement entre chaques relancement de parties
*/


function ChargementPage()
{
    return (
        <div id="chargementPage" className="cacher">
            <img src={process.env.PUBLIC_URL + '/images/chargement.gif'} height="200px" width="200px"></img>
        </div>
    )
}

export default ChargementPage;