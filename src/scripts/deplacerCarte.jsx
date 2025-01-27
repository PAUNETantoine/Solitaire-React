/*
@author : Antoine PAUNET
Version : 0.9 Beta
Date    : 27/01/25
--------------------
File : deplacerCartes
*/

const handleDeplacerCarte = (carteDep, carteArr, location, plateau, jeuLance) => {
	
	if(carteDep === null || carteDep === undefined) //Si on essaye de deplacer une case vide
	{
		return;
	}


	let indexCarteDep  = plateau.getIndexColonneCarte(carteDep);
	let indexYCarteDep = plateau.getIndexLigneCarte(carteDep);

	carteDep.setEstMouvement(false);

	if(location === "FIN-COLONNE")
	{

		if(plateau.tabFin[carteArr][0] === undefined && plateau.getCarteColonneSelectionne().getNombre() === 1) //On ne place qu'un AS sur une case vide
		{
			plateau.tabFin[carteArr].unshift(plateau.tabColonnes[plateau.getIndexColonneCarte(carteDep)].shift());
			plateau.setCarteColonneSelectionne(null);

			if(plateau.tabColonnes[indexCarteDep][0] !== undefined)
			{
				plateau.tabColonnes[indexCarteDep][0].setEstRetournee(true);
			}
			return;

		}else if(plateau.tabFin[carteArr][0] === undefined && plateau.getCarteColonneSelectionne().getNombre() !== 1) //Si on essaye de placer autre chose qu'un AS alors on retourne
		{
			return;
		}

		if(plateau.tabFin[carteArr][0].getNombre() !== plateau.getCarteColonneSelectionne().getNombre() - 1) //Si la carte qu'on met est bien le nombre au dessus de l'ancien
		{
			return;
		}

		plateau.tabFin[carteArr].unshift(plateau.tabColonnes[plateau.getIndexColonneCarte(carteDep)].shift());
		plateau.setCarteColonneSelectionne(null);

		if(plateau.tabColonnes[indexCarteDep][0] !== undefined)
		{
			plateau.tabColonnes[indexCarteDep][0].setEstRetournee(true);
		}
		return;
	}

	if(location === "FIN-PIOCHE")
	{

		if(plateau.tabFin[carteArr][0] === undefined && plateau.getCartePiocheSelectionne().getNombre() === 1) //On ne place qu'un AS sur une case vide
		{
			plateau.tabFin[carteArr].unshift(carteDep);

			plateau.tabFin[carteArr][0].setEstRetournee(true);
			plateau.setCartePiocheSelectionne(null); 
			plateau.setCartePiocheEstSelectionne(false);
			return;

		}else if(plateau.tabFin[carteArr][0] === undefined && plateau.getCartePiocheSelectionne().getNombre() !== 1) //Si on essaye de placer autre chose qu'un AS alors on retourne
		{
			return;
		}

		if(plateau.tabFin[carteArr][0].getNombre() !== plateau.getCartePiocheSelectionne().getNombre() - 1) //Si la carte qu'on met est bien le nombre au dessus de l'ancien
		{
			return;
		}


		plateau.tabFin[carteArr].unshift(carteDep); 
		plateau.tabFin[carteArr][0].setEstRetournee(true);

		plateau.setCartePiocheSelectionne(plateau.cartes.shift());

		plateau.setCartePiocheEstSelectionne(false);
		return;
	}
	
	

	if(carteArr >= 0) //Si case où placement libre authorisé
	{
		if(carteDep !== null && carteDep !== undefined && carteDep.getNombre() !== 13) //Seulement les rois peuvent être sur les cases vides
		{
			return;
		}

		if(location === "PIOCHE")
		{
			plateau.tabColonnes[carteArr].unshift(plateau.getCartePiocheSelectionne());
			plateau.setCartePiocheSelectionne(plateau.cartes.shift());
			plateau.setCartePiocheEstSelectionne(false);
			plateau.tabColonnes[carteArr][0].setEstRetournee(true);
			return;
		}

		if(location === "FINversCOLONNES")
		{
			plateau.tabColonnes[carteArr].unshift(plateau.tabFin[plateau.getIndexFinCarte(carteDep)].shift());
			plateau.setCarteFinSelectionne(null);
			return;
		}

		if(plateau.tabColonnes[indexCarteDep] === undefined)
		{
			return;
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
		return;
	}

	let indexCarteArr = plateau.getIndexColonneCarte(carteArr);


	if(carteDep.getNombre() !== 1 && carteArr === undefined && location === "FIN") //Si c'est pas un AS et qu'on le pose sur la case vide de la pile
	{
		return;
	}



	if(carteDep.getCouleur() === carteArr.getCouleur())
	{
		return;
	}

	if(carteDep.getNombre() !== carteArr.getNombre() - 1)
	{
		return;
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
		return;
	}

	if(location === "FINversCOLONNES")
	{
		plateau.tabColonnes[indexCarteArr].unshift(plateau.tabFin[plateau.getIndexFinCarte(carteDep)].shift())
		plateau.setCarteFinSelectionne(null);
		return;
	}


	if(plateau.tabColonnes[indexCarteDep][0] !== undefined)
	{
		plateau.tabColonnes[indexCarteDep][0].setEstRetournee(true);
	}

	plateau.setCarteColonneSelectionne(null);
}

export default handleDeplacerCarte;