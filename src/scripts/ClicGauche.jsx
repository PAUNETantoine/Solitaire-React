/*@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
Script permettant de gérer les clics gauches sur le canva
*/

import handleDeplacerCarte from "./deplacerCarte";
import { clicEstDansColonnes, clicEstDansPile, clicEstDansPioche } from "./Utile";

const piocheClick = (x, y, plateau, annulerCoup) => {
	let canvaFrame = document.getElementById("canvaFrame");

	if(x > 130)
	{
		if(plateau.getCartePiocheSelectionne() !== null)
		{
			plateau.cartes.unshift(plateau.getCartePiocheSelectionne());
		}

		plateau.setCartePiocheSelectionne(plateau.cartes.pop());

		plateau.getCartePiocheSelectionne().setX((canvaFrame.width - 250));
		plateau.getCartePiocheSelectionne().setY(0);

		plateau.setCartePiocheEstSelectionne(false);

		return true;

	}else if(x < 121)
	{
		if(plateau.getCartePiocheEstSelectionne())
		{
			plateau.setCartePiocheEstSelectionne(false);
		}else
		{
			plateau.setCartePiocheEstSelectionne(true);
		}

		return false;
	}
};




const colonneClick = (x, y, plateau, annulerCoup) => {
	let indexX = Math.floor(x/130);
	let indexY = Math.floor(y/30);

	//Permet le calcul de la postion du clic selon la carte ( si une carte sous le paquet est cliquée )
	if(plateau.tabColonnes[indexX].length < indexY)
	{
		indexY = 0;
	}else{
		indexY = plateau.tabColonnes[indexX].length-1 - indexY;

		if(indexY < 0)
		{
			indexY = 0;
		}
	}

	if(plateau.tabColonnes[indexX][indexY] !== undefined && !plateau.tabColonnes[indexX][indexY].getEstRetournee())
	{
		return false;
	}

	//Si c'est  de la pioche vers les colonnes
	if(plateau.getCartePiocheSelectionne() !== null && plateau.getCarteColonneSelectionne() === null && plateau.getCartePiocheEstSelectionne() === true)
	{
		const carteDep = plateau.getCartePiocheSelectionne();

		if(plateau.tabColonnes[indexX][indexY] === undefined)
		{
			return handleDeplacerCarte(carteDep, indexX, "PIOCHE", plateau, annulerCoup);
		}

		const carteArr = plateau.tabColonnes[indexX][indexY];
		return handleDeplacerCarte(carteDep, carteArr, "PIOCHE", plateau, annulerCoup);

	}

	//Si c'est de la pile vers les colonnes
	if(plateau.getCarteFinSelectionne() !== null && plateau.getCarteColonneSelectionne() === null)
	{
		const carteDep = plateau.getCarteFinSelectionne();

		if(plateau.tabColonnes[indexX][indexY] === undefined)
		{
			return handleDeplacerCarte(carteDep, indexX, "FINversCOLONNES", plateau, annulerCoup);
		}

		const carteArr = plateau.tabColonnes[indexX][indexY];

		return handleDeplacerCarte(carteDep, carteArr, "FINversCOLONNES", plateau, annulerCoup);
	}



	//Si c'est de colonne vers colonne
	if(plateau.tabColonnes[indexX][indexY] === undefined) //Si clic sur une colonne vide
	{
		const carteDep = plateau.getCarteColonneSelectionne();
		return handleDeplacerCarte(carteDep, indexX, "COLONNES", plateau, annulerCoup);
	}

	if(plateau.getCarteColonneSelectionne() !== null)
	{
		const carteDep = plateau.getCarteColonneSelectionne();
		const carteArr = plateau.tabColonnes[indexX][indexY];

		if(carteArr === undefined) //Si clic sur colonne vide
		{
			return handleDeplacerCarte(carteDep, indexX, "COLONNES", plateau, annulerCoup);
		}else{
			return handleDeplacerCarte(carteDep, carteArr, "COLONNES", plateau, annulerCoup);
		}

	}else{
		plateau.setCarteColonneSelectionne(plateau.tabColonnes[indexX][indexY]);
	}

}


const pileClick = (x, y, plateau, annulerCoup) => {

	const indexCarte = Math.floor(x/130);

	if(plateau.getCarteColonneSelectionne() !== null)
	{
		return handleDeplacerCarte(plateau.getCarteColonneSelectionne(), indexCarte, "FIN-COLONNE", plateau, annulerCoup);

	}

	if(plateau.getCartePiocheEstSelectionne() && plateau.getCartePiocheSelectionne() !== null)
	{
		return handleDeplacerCarte(plateau.getCartePiocheSelectionne(), indexCarte, "FIN-PIOCHE", plateau, annulerCoup);
	}

	plateau.setCarteFinSelectionne(plateau.tabFin[indexCarte][0])
}


//Cette methode permet d'appeler les autres fonctions selon la position du clic
/*Ici Action représente si on clic ou on relache la souris*/
const gestionClick = (x, y, plateau, mouseUp, annulerCoup) => {
	const canvaFrame = document.getElementById("canvaFrame");


	if(clicEstDansPile(x,y)) //Si on clic sur les piles
	{
		return pileClick((x-(canvaFrame.width / 2 - 235)), y, plateau, annulerCoup);
	}

	if(clicEstDansColonnes(x,y)) //Si on clic sur les colonnes
	{
		return colonneClick((x-(canvaFrame.width / 2 - 450)), y - 250, plateau, annulerCoup)
	}

	if(clicEstDansPioche(x,y, mouseUp)) //Si on clic sur la pioche
	{
		return piocheClick((x-(canvaFrame.width - 250)), y, plateau, annulerCoup);
	}
}


export default gestionClick;