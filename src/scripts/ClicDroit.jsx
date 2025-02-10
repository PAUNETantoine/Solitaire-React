/*
@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
Script permettant de gérer les clis droits sur le canva
*/

import handleDeplacerCarte 						    from "./deplacerCarte";
import { clicEstDansColonnes, clicEstDansPioche, getIndexColCouleur } 	from "./Utile";

const clicDroit = (event, plateau, annulerCoup) => {
	event.preventDefault();
	const x = event.clientX;
	const y = event.clientY;
	let res = false;

	const canvaFrame = document.getElementById("canvaFrame");

	if(clicEstDansColonnes(x,y))
	{
		//index dans le tableau pour savoir où on clic
		let indexX = Math.floor((x - (canvaFrame.width / 2 - 450))/130);
		let indexY = Math.floor((y - 250)/30);

		indexY = plateau.tabColonnes[indexX].length-1 - indexY;

		if(indexY < 0)
		{
			indexY = 0;
		}

		plateau.setCarteColonneSelectionne(plateau.tabColonnes[indexX][indexY]);

		if(plateau.getCarteColonneSelectionne() === null || plateau.getCarteColonneSelectionne() === undefined || plateau.getIndexLigneCarte(plateau.getCarteColonneSelectionne()) !== 0)
		{
			return;
		}

		let indexColCouleur = getIndexColCouleur(plateau.getCarteColonneSelectionne(), plateau);

		res = handleDeplacerCarte(plateau.getCarteColonneSelectionne(), indexColCouleur, "FIN-COLONNE", plateau, annulerCoup); //Transfert de colonnes vers FIN

		plateau.setCarteColonneSelectionne(null);

	}else if(plateau.getCartePiocheSelectionne() !== null && plateau.getCartePiocheSelectionne() !== undefined && clicEstDansPioche(x,y))
	{
		let indexColCouleur = getIndexColCouleur(plateau.getCartePiocheSelectionne(), plateau);

		res = handleDeplacerCarte(plateau.getCartePiocheSelectionne(), indexColCouleur, "FIN-PIOCHE", plateau, annulerCoup); //Transfert de pioche vers FIN
	}
	return res;
}


export default clicDroit;