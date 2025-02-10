/*
@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
File : deplacerCartes
*/

const handleDeplacerCarte = async(carteDep, carteArr, location, plateau) => {

	if(carteDep === null || carteDep === undefined) //Si on essaye de deplacer une case vide
	{
		return false;
	}

	if(carteArr === null || carteArr === undefined)
	{
		return false;
	}


	let indexCarteDep  = plateau.getIndexColonneCarte(carteDep);
	let indexYCarteDep = plateau.getIndexLigneCarte(carteDep);

	carteDep.setEstMouvement(false);

	if(location === "FIN-COLONNE")
	{

		if(plateau.tabFin[carteArr][0] === undefined && carteDep.getNombre() === 1) //On ne place qu'un AS sur une case vide
		{
			plateau.tabFin[carteArr].unshift(plateau.tabColonnes[plateau.getIndexColonneCarte(carteDep)].shift());
			plateau.setCarteColonneSelectionne(null);

			if(plateau.tabColonnes[indexCarteDep][0] !== undefined)
			{
				plateau.tabColonnes[indexCarteDep][0].setEstRetournee(true);
			}

			return true;


		}else if(estSurCaseVide(carteDep, carteArr, plateau)) //Si on essaye de placer autre chose qu'un AS alors on retourne
		{
			return false;
		}

		if(plateau.tabFin[carteArr][0].getNombre() !== carteDep.getNombre() - 1 || plateau.tabFin[carteArr][0].getForme() !== carteDep.getForme()) //Si la carte qu'on met est bien le nombre au dessus de l'ancien et la forme est bien la même
		{
			return false;
		}

		plateau.tabFin[carteArr].unshift(plateau.tabColonnes[plateau.getIndexColonneCarte(carteDep)].shift());
		plateau.setCarteColonneSelectionne(null);

		if(plateau.tabColonnes[indexCarteDep][0] !== undefined)
		{
			plateau.tabColonnes[indexCarteDep][0].setEstRetournee(true);
		}

		return true;
	}

	if(location === "FIN-PIOCHE")
	{

		if(estSurCaseVide(carteDep, carteArr, plateau)) //On ne place qu'un AS sur une case vide
		{
			plateau.tabFin[carteArr].unshift(carteDep);

			plateau.tabFin[carteArr][0].setEstRetournee(true);
			plateau.setCartePiocheSelectionne(plateau.cartes.shift()); 
			plateau.setCartePiocheEstSelectionne(false);

			return true;

		}else if(plateau.tabFin[carteArr][0] === undefined && plateau.getCartePiocheSelectionne().getNombre() !== 1) //Si on essaye de placer autre chose qu'un AS alors on retourne
		{
			return false;
		}

		if(plateau.tabFin[carteArr][0].getNombre() !== plateau.getCartePiocheSelectionne().getNombre() - 1 || plateau.tabFin[carteArr][0].getForme() !== carteDep.getForme()) //Si la carte qu'on met est bien le nombre au dessus de l'ancien
		{
			return false;
		}

		console.log(carteArr)


		plateau.tabFin[carteArr].unshift(carteDep); 
		plateau.tabFin[carteArr][0].setEstRetournee(true);

		plateau.setCartePiocheSelectionne(plateau.cartes.shift());

		plateau.setCartePiocheEstSelectionne(false);

		return true;
	}
	
	

	if(carteArr >= 0) //Si case où placement libre authorisé
	{
		if(carteDep !== null && carteDep !== undefined && carteDep.getNombre() !== 13) //Seulement les rois peuvent être sur les cases vides
		{
			return false;
		}

		if(location === "PIOCHE")
		{
			plateau.tabColonnes[carteArr].unshift(plateau.getCartePiocheSelectionne());
			plateau.setCartePiocheSelectionne(plateau.cartes.shift());
			plateau.setCartePiocheEstSelectionne(false);
			plateau.tabColonnes[carteArr][0].setEstRetournee(true);

			return true;
		}

		if(location === "FINversCOLONNES")
		{
			plateau.tabColonnes[carteArr].unshift(plateau.tabFin[plateau.getIndexFinCarte(carteDep)].shift());
			plateau.setCarteFinSelectionne(null);

			return true;
		}

		if(plateau.tabColonnes[indexCarteDep] === undefined)
		{
			return false;
		}

		const tmpElemts = plateau.tabColonnes[indexCarteDep].splice(0,indexYCarteDep+1);

		let i = tmpElemts.length-1;

		do {
			plateau.tabColonnes[carteArr].unshift(tmpElemts[i]);

			i--;

		}while(i >= 0);

		if(plateau.tabColonnes[indexCarteDep][0] !== undefined)
		{
			plateau.tabColonnes[indexCarteDep][0].setEstRetournee(true);
		}

		plateau.setCarteColonneSelectionne(null);

		return true;
	}

	let indexCarteArr = plateau.getIndexColonneCarte(carteArr);


	if(carteDep.getNombre() !== 1 && carteArr === undefined && location === "FIN") //Si c'est pas un AS et qu'on le pose sur la case vide de la pile
	{
		return false;
	}



	if(carteDep.getCouleur() === carteArr.getCouleur())
	{
		return false;
	}

	if(carteDep.getNombre() !== carteArr.getNombre() - 1)
	{
		return false;
	}

	if(location === "FINversCOLONNES")
	{
		plateau.tabColonnes[plateau.getIndexColonneCarte(carteArr)].unshift(plateau.tabFin[plateau.getIndexFinCarte(carteDep)].shift());
		plateau.setCarteFinSelectionne(null);

		return true;
	}


	if(location === "COLONNES")
	{
		const tmpElemts = plateau.tabColonnes[indexCarteDep].splice(0,indexYCarteDep+1);

		let i = tmpElemts.length-1;

		do {
			plateau.tabColonnes[indexCarteArr].unshift(tmpElemts[i])

			i--;

		}while(i >= 0);

	}


	if(location === "PIOCHE")
	{
		plateau.tabColonnes[indexCarteArr].unshift(plateau.getCartePiocheSelectionne())
		plateau.tabColonnes[indexCarteArr][0].setEstRetournee(true);
		plateau.setCartePiocheSelectionne(plateau.cartes.shift());
		plateau.setCartePiocheEstSelectionne(false);

		return true;
	}


	if(plateau.tabColonnes[indexCarteDep] !== undefined && plateau.tabColonnes[indexCarteDep][0] !== undefined)
	{
		plateau.tabColonnes[indexCarteDep][0].setEstRetournee(true);
	}

	plateau.setCarteColonneSelectionne(null);

	return true;
}


const estSurCaseVide = (carte, carteArr, plateau) => {
	return plateau.tabFin[carteArr][0] === undefined && carte.getNombre() === 1;
}


export default handleDeplacerCarte;