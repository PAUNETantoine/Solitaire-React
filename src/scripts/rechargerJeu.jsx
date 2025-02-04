/*
@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
Script qui permet de relancer une partie et de régénérer le plateau.
*/

const rechargerJeu = (plateau) => {
	plateau.cartes                    = plateau.initCartes();
	plateau.tabColonnes               = [];
	plateau.tabFin                    = [[],[],[],[]]
	plateau.cartePiocheSelectionne    = null;
	plateau.carteColonnesSelectionne  = null;
	plateau.carteFinSelectionne       = null;
	plateau.cartePiocheEstSelectionne = false;
	plateau.sourisClic 				  = false;
	plateau.melangerCartes();
}


export default rechargerJeu;