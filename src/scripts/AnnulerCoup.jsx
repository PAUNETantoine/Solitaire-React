/*@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
Classe annulerCoup permettant de sauvegarder les anciens plateaux pour revenir en arrière
*/

import { copierTableauColonnes, copierCartes, copierTableauFin } from "./Utile";
import Carte from "./Carte";

class AnnulerCoup 
{
	constructor()
	{
		this.indexCoup = -1;
		this.tabColonnesCoup = [];
		this.tabFinCoup = [];
		this.cartesCoup = [];
		this.cartePiocheSelectionneCoup = [];

		this.autoSort = false;
	}


	enArriere(plateau)
	{
		if(this.autoSort)
		{
			return;
		}


		this.indexCoup--;

		if(this.indexCoup < 0)
		{
			this.indexCoup = 0;
			return;
		}

		plateau.tabColonnes = copierTableauColonnes(this.tabColonnesCoup[this.indexCoup]);
		plateau.tabFin = copierTableauFin(this.tabFinCoup[this.indexCoup]);
		plateau.cartes = copierCartes(this.cartesCoup[this.indexCoup]);

		if(this.cartePiocheSelectionneCoup[this.indexCoup] !== null && this.cartePiocheSelectionneCoup[this.indexCoup] !== undefined)
		{
			plateau.setCartePiocheSelectionne(new Carte(this.cartePiocheSelectionneCoup[this.indexCoup]));
		}else{
			plateau.setCartePiocheSelectionne(null);
		}

		this.afficherNbCoups()
	}


	ajouterCoup(plateau)
	{
		if(this.autoSort)
		{
			return;
		}

		this.indexCoup++;
		this.tabColonnesCoup[this.indexCoup] = copierTableauColonnes(plateau.tabColonnes);
		this.tabFinCoup[this.indexCoup] = copierTableauFin(plateau.tabFin);
		this.cartesCoup[this.indexCoup] = copierCartes(plateau.cartes);

		if(plateau.getCartePiocheSelectionne() !== null && plateau.getCartePiocheSelectionne() !== undefined)
		{
			this.cartePiocheSelectionneCoup[this.indexCoup] = new Carte(plateau.getCartePiocheSelectionne())
		}else{
			this.cartePiocheSelectionneCoup[this.indexCoup] = null;
		}

		this.afficherNbCoups()
	}

	rechargerJeu()
	{
		this.indexCoup = -1;
		this.tabColonnesCoup = [];
		this.tabFinCoup = [];
		this.cartesCoup = [];
		this.cartePiocheSelectionneCoup = [];
		this.autoSort = false;

		this.afficherNbCoups()
	}


	afficherNbCoups()
	{
		let txtNbCoups = this.indexCoup;

		if(this.indexCoup < 0)
		{
			txtNbCoups = 0;
		}

		document.getElementById("nbClicsTxt").innerText = "Nombre de coups : " + txtNbCoups;
	}
}


export default AnnulerCoup;