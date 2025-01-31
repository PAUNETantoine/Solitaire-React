import handleDeplacerCarte 						    from "./deplacerCarte";
import { clicEstDansColonnes, clicEstDansPioche } 	from "./Utile";

const clicDroit = (event, plateau) => {
	event.preventDefault();
	const x = event.clientX;
	const y = event.clientY;

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

		handleDeplacerCarte(plateau.getCarteColonneSelectionne(), indexColCouleur, "FIN-COLONNE", plateau); //Transfert de colonnes vers FIN

		plateau.setCarteColonneSelectionne(null);

	}else if(plateau.getCartePiocheSelectionne() !== null && plateau.getCartePiocheSelectionne() !== undefined && clicEstDansPioche(x,y))
	{
		let indexColCouleur = getIndexColCouleur(plateau.getCartePiocheSelectionne(), plateau);

		handleDeplacerCarte(plateau.getCartePiocheSelectionne(), indexColCouleur, "FIN-PIOCHE", plateau); //Transfert de pioche vers FIN
	}
};


//On chercher quelle colonne est utilisée pour la couleur selon l'AS
const getIndexColCouleur = (carte, plateau) => {
	let indexColoCouleur;

	for(let i = 0 ; i < plateau.tabFin.length ; i++)
	{
		if((plateau.tabFin[i][0] === undefined && carte.getNombre() === 1) || (carte !== undefined && plateau.tabFin[i][0] && plateau.tabFin[i][0].getForme() === carte.getForme()))
		{
			indexColoCouleur = i;
		}
	}

	return indexColoCouleur;
} 


export default clicDroit;