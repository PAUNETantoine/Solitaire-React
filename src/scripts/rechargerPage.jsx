import { handleDessinerCarteColonnes, handleDessinerCartesPioche, handleDessinerCartesPilesFin } from "./dessinerCartes";

const handleRechargerPage = (plateau, jeuLance) => {
		handleDessinerCartesPilesFin(plateau);
		handleDessinerCarteColonnes(plateau, jeuLance);
		handleDessinerCartesPioche(plateau);

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