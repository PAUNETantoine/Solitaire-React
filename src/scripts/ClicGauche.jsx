import handleDeplacerCarte from "./deplacerCarte";
import { clicEstDansColonnes, clicEstDansPile, clicEstDansPioche } from "./Utile";

const piocheClick = (x, y, plateau) => {
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

	}else if(x < 121)
	{
		if(plateau.getCartePiocheEstSelectionne())
		{
			plateau.setCartePiocheEstSelectionne(false);
		}else
		{
			plateau.setCartePiocheEstSelectionne(true);
		}
	}
};




const colonneClick = (x, y, plateau) => {
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

	//Si c'est  de la pioche vers les colonnes
	if(plateau.getCartePiocheSelectionne() !== null && plateau.getCarteColonneSelectionne() === null && plateau.getCartePiocheEstSelectionne() === true)
	{
		const carteDep = plateau.getCartePiocheSelectionne();

		if(plateau.tabColonnes[indexX][indexY] === undefined)
		{
			handleDeplacerCarte(carteDep, indexX, "PIOCHE", plateau);
			return;
		}

		const carteArr = plateau.tabColonnes[indexX][indexY];
		handleDeplacerCarte(carteDep, carteArr, "PIOCHE", plateau);
		return;
	}

	//Si c'est de la pile vers les colonnes
	if(plateau.getCarteFinSelectionne() !== null && plateau.getCarteColonneSelectionne() === null)
	{
		const carteDep = plateau.getCarteFinSelectionne();

		if(plateau.tabColonnes[indexX][indexY] === undefined)
		{
			handleDeplacerCarte(carteDep, indexX, "FINversCOLONNES", plateau);
			return;
		}

		const carteArr = plateau.tabColonnes[indexX][indexY];
		handleDeplacerCarte(carteDep, carteArr, "FINversCOLONNES", plateau);
		return;
	}



	//Si c'est de colonne vers colonne
	if(plateau.tabColonnes[indexX][indexY] === undefined) //Si clic sur une colonne vide
	{
		const carteDep = plateau.getCarteColonneSelectionne();
		handleDeplacerCarte(carteDep, indexX, "COLONNES", plateau);
		return;
	}

	if(plateau.getCarteColonneSelectionne() !== null)
	{
		const carteDep = plateau.getCarteColonneSelectionne();
		const carteArr = plateau.tabColonnes[indexX][indexY];

		if(carteArr === undefined) //Si clic sur colonne vide
		{
			handleDeplacerCarte(carteDep, indexX, "COLONNES", plateau);
		}else{
			handleDeplacerCarte(carteDep, carteArr, "COLONNES", plateau);
		}

	}else{
		plateau.setCarteColonneSelectionne(plateau.tabColonnes[indexX][indexY]);
	}

}


const pileClick = (x, y, plateau) => {

	const indexCarte = Math.floor(x/130);

	if(plateau.getCarteColonneSelectionne() !== null)
	{
		handleDeplacerCarte(plateau.getCarteColonneSelectionne(), indexCarte, "FIN-COLONNE", plateau);
		return;
	}

	if(plateau.getCartePiocheEstSelectionne() && plateau.getCartePiocheSelectionne() !== null)
	{
		handleDeplacerCarte(plateau.getCartePiocheSelectionne(), indexCarte, "FIN-PIOCHE", plateau);
		return;
	}

	plateau.setCarteFinSelectionne(plateau.tabFin[indexCarte][0])
}


//Cette methode permet d'appeler les autres fonctions selon la position du clic
/*Ici Action représente si on clic ou on relache la souris*/
const gestionClick = (x, y, plateau, mouseUp) => {
	const canvaFrame = document.getElementById("canvaFrame");


	if(clicEstDansPile(x,y)) //Si on clic sur les piles
	{
		pileClick((x-(canvaFrame.width / 2 - 235)), y, plateau);
	}

	if(clicEstDansColonnes(x,y)) //Si on clic sur les colonnes
	{
		colonneClick((x-(canvaFrame.width / 2 - 450)), y - 250, plateau)
	}

	if(clicEstDansPioche(x,y, mouseUp)) //Si on clic sur la pioche
	{
		piocheClick((x-(canvaFrame.width - 250)), y, plateau);
	}
}


export default gestionClick;