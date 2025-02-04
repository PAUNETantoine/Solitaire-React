/*@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
Script contenant tout un tas de méthodes utiles permettant de gagner de l'espace dans le code
*/


import Carte from "./Carte";

//Cette fonction permet de savoir si on clic dans les colonnes
const clicEstDansColonnes = (x,y) => {
	const canvaFrame = document.getElementById("canvaFrame");

	return (x > (canvaFrame.width / 2 - 450) && x < (canvaFrame.width / 2 + 450) && y > 250 && y < 850);
}

//Cette fonction permet de savoir si on clic dans la pioche
const clicEstDansPioche = (x,y, mouseUp) => {
	const canvaFrame = document.getElementById("canvaFrame");

	if(mouseUp)
	{
		return (x > (canvaFrame.width - 250) && x < (canvaFrame.width - 130) && y > 0 && y < 200);
	}else{
		return (x > (canvaFrame.width - 250) && x < (canvaFrame.width) && y > 0 && y < 200);
	}

}

const clicEstDansPile = (x,y) => {
	const canvaFrame = document.getElementById("canvaFrame");

	return (x > (canvaFrame.width / 2 - 235) && x < (canvaFrame.width / 2 + 270) && y > 0 && y < 200);
}


const copierTableauColonnes = (tabDep, tabArrivee) => {

	const tabArr = [[],[],[],[],[],[],[]];

	if(tabArr === undefined || tabDep === undefined)
	{
		return null;
	}


	for(let i = 0 ; i < tabDep.length ; i++)
	{
		for(let j = 0 ; j < tabDep[i].length ; j++)		
		{
			tabArr[i][j] = new Carte(tabDep[i][j]);
		}
	}

	return tabArr;
}


const copierTableauFin = (tabDep) => {

	const tabArr = [[],[],[],[]];

	if(tabArr === undefined || tabDep === undefined)
	{
		return null;
	}


	for(let i = 0 ; i < tabDep.length ; i++)
	{
		for(let j = 0 ; j < tabDep[i].length ; j++)		
		{
			tabArr[i][j] = new Carte(tabDep[i][j]);
		}
	}

	return tabArr;
}


const copierCartes = (tabDep) => {

	const tabArr = [];

	if(tabArr === undefined || tabDep === undefined)
	{
		return null;
	}

	for(let i = 0 ; i < tabDep.length ; i++)
	{
		tabArr[i] = new Carte(tabDep[i]);
	}

	return tabArr;
}




export {clicEstDansColonnes, clicEstDansPioche, clicEstDansPile, copierTableauColonnes, copierTableauFin, copierCartes}
