/*
@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
Composant qui permet d'afficher le nombre d'actions effectuées.
*/

function NombreDeClics({nbClics})
{
	return (
		<div className="txtZones" id="nbClics">
			<p id="nbClicsTxt">Nombre de coups : 0</p>
		</div>
	)
}


export default NombreDeClics;