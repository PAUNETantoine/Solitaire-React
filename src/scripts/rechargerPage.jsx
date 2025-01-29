/*
@author : Antoine PAUNET
Version : 0.9.5 Beta
Date    : 27/01/25
--------------------
File : rechargerPage
*/

import { handleDessinerCarteColonnes, handleDessinerCartesPioche, handleDessinerCartesPilesFin } from "./dessinerCartes";

const handleRechargerPage = (plateau, jeuLance, setGagner) => {

	checkVictoire(plateau, setGagner, jeuLance);

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
}

const checkVictoire = (plateau, setGagner, jeuLance) => 
{
	if(!jeuLance) return;

	for(let i = 0 ; i < plateau.tabColonnes.length ; i++)
	{
		if(plateau.tabColonnes[i][plateau.tabColonnes[i].length-1] !== undefined && !plateau.tabColonnes[i][plateau.tabColonnes[i].length-1].getEstRetournee())
		{
			setGagner(false)
			return
		}
	}

	setGagner(true);
}


export default handleRechargerPage;