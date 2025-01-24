/*
@author : Antoine PAUNET
Version : 0.6 Beta
Date    : 24/01/25
--------------------
File : rechargerPage
*/

import { handleDessinerCarteColonnes, handleDessinerCartesPioche, handleDessinerCartesPilesFin } from "./dessinerCartes";

const handleRechargerPage = (plateau, jeuLance) => {

	if(plateau.getCarteFinSelectionne() !== null) //Si la carte selectionnée est de la pile de fin alors on la place au dessus des autres elements
	{
		handleDessinerCarteColonnes(plateau, jeuLance);
		handleDessinerCartesPioche(plateau);
		handleDessinerCartesPilesFin(plateau);

	}else{
		handleDessinerCartesPilesFin(plateau);
		handleDessinerCarteColonnes(plateau, jeuLance);
		handleDessinerCartesPioche(plateau);
	}


	checkVictoire(plateau);
}

const checkVictoire = (plateau) => 
{

	for(let i = 0 ; i < plateau.tabFin.length ; i++)
	{
		if(plateau.tabFin[i].length != 13)
		{
			return;
		}
	}

	alert("Vous avez gagner !")
}


export default handleRechargerPage;