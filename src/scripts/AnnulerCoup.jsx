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
	constructor(parent) //Parent permet de avoir si c'est bien la classe principale et non celle qui permet de save
	{
		this.indexCoup = -1;
		this.tabColonnesCoup = [];
		this.tabFinCoup = [];
		this.cartesCoup = [];
		this.cartePiocheSelectionneCoup = [];

		this.estParent = parent;

		if(this.estParent)
		{
			this.plateauDepart = new AnnulerCoup(false); //Permet de sauvegarder le plateau à l'état 0
		}

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
		console.log(this)

		if(this.autoSort)
		{
			return;
		}

		if(this.indexCoup === -1 && this.estParent)
		{
			this.plateauDepart.ajouterCoup(plateau);
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

	rechargerJeu(plateau)
	{
		this.indexCoup = -1;
		this.tabColonnesCoup = [];
		this.tabFinCoup = [];
		this.cartesCoup = [];
		this.cartePiocheSelectionneCoup = [];
		this.autoSort = false;

		if(this.estParent)
		{
			this.plateauDepart = new AnnulerCoup(false); //Permet de sauvegarder le plateau à l'état 0
		}

		this.afficherNbCoups();
		this.ajouterCoup(plateau)
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