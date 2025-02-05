/*
@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
Script qui permet de relancer une partie et de régénérer le plateau.
*/

import { recevoirPlateauGagnant, serveurEstOn } from "./connexionServeur";

const rechargerJeu = async (plateau, estAleatoire) => {
	if(estAleatoire)
	{
		plateau.cartes                    = plateau.initCartes();
		plateau.tabColonnes               = [];
		plateau.tabFin                    = [[],[],[],[]]
		plateau.cartePiocheSelectionne    = null;
		plateau.carteColonnesSelectionne  = null;
		plateau.carteFinSelectionne       = null;
		plateau.cartePiocheEstSelectionne = false;
		plateau.sourisClic 				  = false;
		plateau.melangerCartes();
	}else{
		document.getElementById("chargementPage").classList.add("chargementPage");
		if(await serveurEstOn())
		{
			document.getElementById("chargementPage").classList.remove("chargementPage");
			const tmpPlateau = await recevoirPlateauGagnant();
			plateau.cartes                    = tmpPlateau.cartes;
			plateau.tabColonnes               = tmpPlateau.tabColonnes;
			plateau.tabFin                    = tmpPlateau.tabFin;
			plateau.cartePiocheSelectionne    = null;
			plateau.carteColonnesSelectionne  = null;
			plateau.carteFinSelectionne       = null;
			plateau.cartePiocheEstSelectionne = false;
			plateau.sourisClic 				  = false;
		}else{
			document.getElementById("chargementPage").classList.remove("chargementPage");
			alert("Serveur déconnecté, lancement de la partie en mode aléatoire.")
			rechargerJeu(plateau, true);
		}
	}
}


export default rechargerJeu;