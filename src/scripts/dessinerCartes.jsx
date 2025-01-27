/*
@author : Antoine PAUNET
Version : 0.9 Beta
Date    : 27/01/25
--------------------
File : dessinerCartes
*/


//images
const imgCarte = new Image();
imgCarte.src = process.env.PUBLIC_URL + '/images/Carte.png';

const imgDosCarte = new Image();
imgDosCarte.src = process.env.PUBLIC_URL + '/images/dosCarte.png';

const imgCarteSelect = new Image();
imgCarteSelect.src = process.env.PUBLIC_URL + '/images/CarteSelection.png'



const handleDessinerCartesPilesFin = (plateau) => {
	let canva = document.getElementById("canvaFrame");
	let ctx = canva.getContext("2d");
	ctx.font = '25px Arial';


	const xDebutPiles = canva.width / 2 - 235; //On place la pile en haut au mileu

	for(let i = 0 ; i < 4 ; i++)
	{
		if(plateau.tabFin[i][0] !== undefined)
		{
			if(!plateau.sourisClic)
			{
				plateau.tabFin[i][0].setX(xDebutPiles + (i*130));
				plateau.tabFin[i][0].setY(0);
			}
			if(plateau.tabFin[i][0].getEstRetournee())
			{
				if(plateau.getCarteFinSelectionne() === plateau.tabFin[i][0])
				{
					ctx.drawImage(imgCarteSelect, plateau.tabFin[i][0].getX(), plateau.tabFin[i][0].getY(), 120, 200);
				}
				else{
					ctx.drawImage(imgCarte, plateau.tabFin[i][0].getX(), plateau.tabFin[i][0].getY(), 120, 200);
				}


				ctx.drawImage(plateau.tabFin[i][0].imgSymbole, plateau.tabFin[i][0].getX() + 18, plateau.tabFin[i][0].getY() + 75, 92, 49);

				ctx.fillStyle = plateau.tabFin[i][0].couleur;

				ctx.fillText(plateau.tabFin[i][0].getNom(), plateau.tabFin[i][0].getX() + 5, plateau.tabFin[i][0].getY() + 25);

				if(plateau.tabFin[i][0].getNombre() !== 10)
				{
					ctx.fillText(plateau.tabFin[i][0].getNom(), plateau.tabFin[i][0].getX() + 100, plateau.tabFin[i][0].getY() + 195);
				}else{
					ctx.fillText(plateau.tabFin[i][0].getNom(), plateau.tabFin[i][0].getX() + 90, plateau.tabFin[i][0].getY() + 195);
				}
			}else
			{
				ctx.drawImage(imgDosCarte, plateau.tabFin[i][0].getX(), plateau.tabFin[i][0].getY(), 120, 200);
			}

		}else if(plateau.tabFin[i][0] === undefined || plateau.tabFin[i][0].getEstMouvement())
		{
			ctx.drawImage(imgCarte, xDebutPiles + (i*130), 0, 120, 200);
		}
	}
}

const handleDessinerCarteColonnes = (plateau, jeuLance) => {	
	let canva = document.getElementById("canvaFrame");
	let ctx = canva.getContext("2d");
	ctx.font = '25px Arial';

	const xDebutColonnes = canva.width / 2 - 450; //On place la pile au centre
	const yDebutColonnes = 250;


	ctx.clearRect(xDebutColonnes, yDebutColonnes, canva.width/2 + 450, canva.height)


	for(let i = 0 ; i < plateau.tabColonnes.length ; i++)
	{
		for(let j = plateau.tabColonnes[i].length ; j > -1 ; j--)
		{

			if(plateau.tabColonnes[i][j] !== undefined)
			{
				if(!jeuLance && !plateau.sourisClic)
				{
					plateau.tabColonnes[i][j].setX(xDebutColonnes + (i*130));
					plateau.tabColonnes[i][j].setY(yDebutColonnes + (plateau.tabColonnes[i].length-1-j)*30);
				}

				if(plateau.tabColonnes[i][j].getEstRetournee() && !plateau.tabColonnes[i][j].getEstMouvement())
				{
					dessinerUneCarte(plateau.tabColonnes[i][j], plateau, ctx);
				}
				else
				{
					if(!plateau.tabColonnes[i][j].getEstMouvement())
					{
						ctx.drawImage(imgDosCarte, plateau.tabColonnes[i][j].getX(), plateau.tabColonnes[i][j].getY(), 120, 200);
					}
				}
			}else{
				ctx.drawImage(imgCarte, xDebutColonnes + (i*120) + (i*10), yDebutColonnes + (plateau.tabColonnes[i].length-j)*30, 120, 200);
			}
		}

	}

	let estPaquet = false;
	let nbCartesPaquet = 0;
	
	for(let i = 0 ; i < plateau.tabColonnes.length ; i++)
	{
		for(let j = plateau.tabColonnes[i].length ; j > -1 ; j--)
		{
			if(plateau.tabColonnes[i][j] !== undefined && plateau.tabColonnes[i][j].getEstMouvement())
			{
				if(plateau.getIndexLigneCarte(plateau.tabColonnes[i][j]) > 0 && !estPaquet)
				{
					estPaquet = true;
					nbCartesPaquet = plateau.getIndexLigneCarte(plateau.tabColonnes[i][j]) + 1
				}


				if(estPaquet)
				{
					if(plateau.getIndexLigneCarte(plateau.tabColonnes[i][j]) === 0)
					{
						plateau.tabColonnes[i][j].setY(plateau.tabColonnes[i][j].getY() + (nbCartesPaquet*30) + 60);
					}else{
						plateau.tabColonnes[i][j].setY(plateau.tabColonnes[i][j].getY() + ((plateau.getIndexLigneCarte(plateau.tabColonnes[i][j]))*30) + (nbCartesPaquet * 30) - (30 * (j-1)) + 30)
					}
				}

				dessinerUneCarte(plateau.tabColonnes[i][j], plateau, ctx)
			}
		}
	}
}




const handleDessinerCartesPioche = (plateau) => {
	let canva = document.getElementById("canvaFrame");
	let ctx = canva.getContext("2d");
	ctx.font = '25px Arial';
	

	const xDebutPioche = canva.width - 250; //On place la pile au centre
	

	if(plateau.getCartePiocheSelectionne() !== null && plateau.getCartePiocheSelectionne() !== undefined)
	{
		if(!plateau.sourisClic)
		{
			plateau.getCartePiocheSelectionne().setX(xDebutPioche);
			plateau.getCartePiocheSelectionne().setY(0);
		}

		if(plateau.getCartePiocheEstSelectionne())
		{
			ctx.drawImage(imgCarteSelect, plateau.getCartePiocheSelectionne().getX(),  plateau.getCartePiocheSelectionne().getY(), 120, 200);
		}else
		{
			ctx.drawImage(imgCarte, plateau.getCartePiocheSelectionne().getX(), plateau.getCartePiocheSelectionne().getY(), 120, 200);
		}

		ctx.drawImage(plateau.getCartePiocheSelectionne().imgSymbole, plateau.getCartePiocheSelectionne().getX() + 18, plateau.getCartePiocheSelectionne().getY() + 75, 92, 49);
		ctx.fillStyle = plateau.getCartePiocheSelectionne().couleur;
		ctx.fillText(plateau.getCartePiocheSelectionne().getNom(), plateau.getCartePiocheSelectionne().getX() + 5, plateau.getCartePiocheSelectionne().getY() + 25);
		
		
		if(plateau.getCartePiocheSelectionne().getNombre() !== 10)
		{
			ctx.fillText(plateau.getCartePiocheSelectionne().getNom(), plateau.getCartePiocheSelectionne().getX() + 100, plateau.getCartePiocheSelectionne().getY() + 195);
		}else{
			ctx.fillText(plateau.getCartePiocheSelectionne().getNom(), plateau.getCartePiocheSelectionne().getX() + 90, plateau.getCartePiocheSelectionne().getY() + 195);
		}
	}else{
		ctx.clearRect(xDebutPioche, 0, canva.width, 200); //Sinon on enlève l'affichage de la carte
	}

	if(plateau.cartes.length === 0)
	{
		return;
	}
		
	if(plateau.cartes[plateau.cartes.length-1] === undefined)
	{
		return;
	}


	ctx.drawImage(imgDosCarte, xDebutPioche + 130, 0, 120, 200);
}

const dessinerUneCarte = (carte, plateau, ctx) => {
	
	if(carte === plateau.getCarteColonneSelectionne())
	{
		ctx.drawImage(imgCarteSelect, carte.getX(), carte.getY(), 120, 200);
	}else
	{
		ctx.drawImage(imgCarte, carte.getX(), carte.getY(), 120, 200);
	}

	ctx.drawImage(carte.imgSymbole, carte.getX() + 18, carte.getY() + 75, 92, 49);

	if(carte !== undefined)
	{
		ctx.fillStyle = carte.couleur;
		ctx.fillText(carte.getNom(), carte.getX() + 5,carte.getY() + 25);

		if(carte.getNombre() !== 10)
		{
			ctx.fillText(carte.getNom(),carte.getX() + 100, carte.getY() + 195);
		}else{
			ctx.fillText(carte.getNom(), carte.getX() + 90, carte.getY() + 195);
		}
	}
}

export {handleDessinerCarteColonnes, handleDessinerCartesPioche, handleDessinerCartesPilesFin};