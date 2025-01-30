/*
@author : Antoine PAUNET
Version : 0.9.5 Beta
Date    : 29/01/25
--------------------
File : Tri Automatique
*/



import handleDeplacerCarte from "./deplacerCarte";
import handleRechargerPage from "./rechargerPage";


const triAutomatique = async (plateau, setGagner) => 
{

	let i = 0;

	while(plateau.tabFin[0].length !== 13 || plateau.tabFin[1].length !== 13 || plateau.tabFin[2].length !== 13 || plateau.tabFin[3].length !== 13)
	{
		console.log(i + " i")
		for(let j = 0 ; j < plateau.tabFin.length ; j++)
		{
			console.log(j + " j")
			if(plateau.tabFin[j].length !== 13)
			{
				if(plateau.cartes.length > 0 || plateau.getCartePiocheSelectionne() !== null)
				{
					if(plateau.getCartePiocheSelectionne() !== null && plateau.getCartePiocheSelectionne() !== undefined && plateau.getCartePiocheSelectionne().getForme() === plateau.tabFin[j][0].getForme() && plateau.getCartePiocheSelectionne().getNombre() === plateau.tabFin[j][0].getNombre() + 1)
					{
						await new Promise(resolve => {
							setTimeout(() => {
								handleDeplacerCarte(plateau.getCartePiocheSelectionne(), j, "FIN-PIOCHE", plateau);
								resolve();
							}, 300);
						});
					}else{
						plateau.cartes.push(plateau.getCartePiocheSelectionne());
						plateau.setCartePiocheSelectionne(plateau.cartes.shift());
					}
				}

				if(plateau.tabColonnes[i][0] !== undefined && plateau.tabFin[j][0] !== undefined && plateau.tabColonnes[i][0].getForme() === plateau.tabFin[j][0].getForme() && plateau.tabColonnes[i][0].getNombre() === plateau.tabFin[j][0].getNombre() + 1)
				{
					await new Promise(resolve => {
						setTimeout(() => {
							  handleDeplacerCarte(plateau.tabColonnes[i][0], j, "FIN-COLONNE", plateau);
							  resolve();
						}, 300);
					})
				}else{
					if(plateau.tabFin[j][0] === undefined)
					{
						let v = 0;
	
						while(plateau.tabFin[j][0] === undefined)
						{
							if(plateau.tabColonnes[v][0].getNombre() === 1)
							{
								await new Promise(resolve => {
									setTimeout(() => {
										  handleDeplacerCarte(plateau.tabColonnes[i][0], j, "FIN-COLONNE", plateau);
										  resolve();
									}, 300);
								});
							}else{
								if(plateau.cartes.length > 0 || plateau.getCartePiocheSelectionne() !== null)
								{
									if(plateau.getCartePiocheSelectionne() !== null && plateau.getCartePiocheSelectionne() !== undefined && plateau.getCartePiocheSelectionne().getForme() === plateau.tabFin[j][0].getForme() && plateau.getCartePiocheSelectionne().getNombre() === plateau.tabFin[j][0].getNombre() + 1)
									{
										await new Promise(resolve => {
											setTimeout(() => {
												handleDeplacerCarte(plateau.getCartePiocheSelectionne(), j, "FIN-PIOCHE", plateau);
												resolve();
											}, 300);
										});
									}else{
										plateau.cartes.push(plateau.getCartePiocheSelectionne());
										plateau.setCartePiocheSelectionne(plateau.cartes.shift());
									}
								}
							}
							v++;
						}
					}
				}
				handleRechargerPage(plateau, true, setGagner);
			}

			i++;

			if(i === plateau.tabColonnes.length)
			{
				i = 0;
			}
		}
	}

	handleRechargerPage(plateau, true, setGagner);

	document.getElementById("zoneGagner").classList.add("zoneGagner");
	document.getElementById("tpsFin").innerText = document.getElementById("temps").textContent
}

export default triAutomatique;