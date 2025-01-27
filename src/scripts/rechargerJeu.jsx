/*
@author : Antoine PAUNET
Version : 0.9 Beta
Date    : 27/01/25
--------------------
File : rechargerJeu
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