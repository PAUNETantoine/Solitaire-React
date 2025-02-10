/*
@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
Script permetant de gérer le tri automatique en fin de partie
*/



import handleDeplacerCarte from "./deplacerCarte";
import handleRechargerPage from "./rechargerPage";
import { getIndexColCouleur } from "./Utile";


const triAutomatique = async (plateau, setGagner) => 
{
	while(plateau.tabFin[0].length !== 13 || plateau.tabFin[1].length !== 13 || plateau.tabFin[2].length !== 13 || plateau.tabFin[3].length !== 13)
	{
		for(let i = 0 ; i < plateau.tabColonnes.length ; i++)
		{
			for(let j = 0 ; j < plateau.tabFin.length ; j++)
			{
				if(plateau.tabFin[j].length !== 13)
				{
					if(plateau.cartes.length > 0 || plateau.getCartePiocheSelectionne() !== null)
					{
						if(await handleDeplacerCarte(plateau.getCartePiocheSelectionne(), getIndexColCouleur(plateau.getCartePiocheSelectionne(), plateau), "FIN-PIOCHE", plateau))
						{
							await new Promise(resolve => {
								setTimeout(() => {
									resolve();
								}, 100);
							});
						}else{
							plateau.cartes.push(plateau.getCartePiocheSelectionne());
							plateau.setCartePiocheSelectionne(plateau.cartes.shift());
						}
					}
	
	
					if(plateau.tabColonnes[i][0] !== undefined && plateau.tabFin[j][0] !== undefined)
					{
						await handleDeplacerCarte(plateau.tabColonnes[i][0], getIndexColCouleur(plateau.tabColonnes[i][0], plateau), "FIN-COLONNE", plateau);
						await new Promise(resolve => {
							setTimeout(() => {
								  resolve();
							}, 100);
						})
					}else{
						if(plateau.tabFin[j][0] === undefined)
						{
							let v = 0;
		
							while(plateau.tabFin[j][0] === undefined)
							{
								if(plateau.tabColonnes[v][0].getNombre() === 1)
								{
									await handleDeplacerCarte(plateau.tabColonnes[i][0], getIndexColCouleur(plateau.tabColonnes[i][0], plateau), "FIN-COLONNE", plateau);
									await new Promise(resolve => {
										setTimeout(() => {
											  resolve();
										}, 100);
									});
								}else{
									if(plateau.cartes.length > 0 || plateau.getCartePiocheSelectionne() !== null)
									{
										if(plateau.getCartePiocheSelectionne() !== null && plateau.getCartePiocheSelectionne() !== undefined && plateau.getCartePiocheSelectionne().getNombre() === 1)
										{
											await handleDeplacerCarte(plateau.getCartePiocheSelectionne(), getIndexColCouleur(plateau.getCartePiocheSelectionne(), plateau), "FIN-PIOCHE", plateau);
											await new Promise(resolve => {
												setTimeout(() => {
													resolve();
												}, 100);
											});
										}else{
											plateau.cartes.push(plateau.getCartePiocheSelectionne());
											plateau.setCartePiocheSelectionne(plateau.cartes.shift());
											await new Promise(resolve => {
												setTimeout(() => {
													resolve();
												}, 100);
											});
										}
									}
								}
								v++;
							}
						}
					}
					await handleRechargerPage(plateau, true, setGagner);
				}
			}
		}
	}

	handleRechargerPage(plateau, true, setGagner);

	document.getElementById("zoneGagner").classList.add("zoneGagner");
	document.getElementById("tpsFin").innerText = document.getElementById("temps").textContent;
	document.getElementById("nbCoups").innerText = document.getElementById("nbClicsTxt").textContent;
}

export default triAutomatique;