//images
const imgCarte = new Image();
imgCarte.src   = '/images/Carte.png';

const imgDosCarte = new Image();
imgDosCarte.src   = '/images/dosCarte.png';

const imgCarteSelect = new Image();
imgCarteSelect.src   = '/images/CarteSelection.png'


const handleDessinerCartesPilesFin = (plateau) => {

	//Initialisation du canva
	let canva = document.getElementById("Piles");
	let ctx = canva.getContext("2d");
	ctx.font = '25px Arial';

	for(let i = 0 ; i < 4 ; i++)
	{
		if(plateau.tabFin[i][0] !== undefined)
		{
			if(plateau.tabFin[i][0].getEstRetournee())
			{
				if(plateau.getCarteFinSelectionne() === plateau.tabFin[i][0])
				{
					ctx.drawImage(imgCarteSelect, (i*120) + (i*10), 0, 120, 200);
				}
				else{
					ctx.drawImage(imgCarte, (i*120) + (i*10), 0, 120, 200);
				}


				ctx.drawImage(plateau.tabFin[i][0].imgSymbole,(i*130) + 18, 75, 92, 49);

				ctx.fillStyle = plateau.tabFin[i][0].couleur;
				ctx.fillText(plateau.tabFin[i][0].getNom(), (i*130) + 5, 25);

				if(plateau.tabFin[i][0].getNombre() !== 10)
				{
					ctx.fillText(plateau.tabFin[i][0].getNom(), (i*130) + 100, 195);
				}else{
					ctx.fillText(plateau.tabFin[i][0].getNom(), (i*130) + 90, 195);
				}
			}else
			{
				ctx.drawImage(imgDosCarte, (i*120) + (i*10), 0, 120, 200);
			}

		}else{
			ctx.drawImage(imgCarte, (i*120) + (i*10), 0, 120, 200);
		}
	}
}

const handleDessinerCarteColonnes = (plateau, jeuLance) => {
	//Initialisation du canva
	let canva = document.getElementById("Colonnes");
	let ctx = canva.getContext("2d");
	ctx.font = '25px Arial';

	ctx.clearRect(0, 0, canva.width, canva.height)


	for(let i = 0 ; i < plateau.tabColonnes.length ; i++)
	{
		for(let j = plateau.tabColonnes[i].length ; j > -1 ; j--)
		{

			if(plateau.tabColonnes[i][j] != undefined)
			{
				if(!jeuLance)
				{
					plateau.tabColonnes[i][j].setX((i*120) + (i*10));
					plateau.tabColonnes[i][j].setY((plateau.tabColonnes[i].length-1-j)*30);
				}

				if(plateau.tabColonnes[i][j].getEstRetournee())
				{
					if(plateau.tabColonnes[i][j] === plateau.getCarteColonneSelectionne())
					{
						ctx.drawImage(imgCarteSelect, plateau.tabColonnes[i][j].getX(), plateau.tabColonnes[i][j].getY(), 120, 200);
					}else
					{
						ctx.drawImage(imgCarte,plateau.tabColonnes[i][j].getX(), plateau.tabColonnes[i][j].getY(), 120, 200);
					}
					
					ctx.drawImage(plateau.tabColonnes[i][j].imgSymbole,(i*130) + 18, 75 + ((plateau.tabColonnes[i].length-1-j)*30), 92, 49);
				

					if(plateau.tabColonnes[i][j] !== undefined)
					{
						ctx.fillStyle = plateau.tabColonnes[i][j].couleur;
						ctx.fillText(plateau.tabColonnes[i][j].getNom(), (i*130) + 5, 25 + ((plateau.tabColonnes[i].length-1-j)*30));
	
						if(plateau.tabColonnes[i][j].getNombre() !== 10)
						{
							ctx.fillText(plateau.tabColonnes[i][j].getNom(), (i*130) + 100, 195 + ((plateau.tabColonnes[i].length-1-j)*30));
						}else{
							ctx.fillText(plateau.tabColonnes[i][j].getNom(), (i*130) + 90, 195 + ((plateau.tabColonnes[i].length-1-j)*30));
						}
					}
				}else
				{
					ctx.drawImage(imgDosCarte, plateau.tabColonnes[i][j].getX(), plateau.tabColonnes[i][j].getY(), 120, 200);
				}
			}
		}
	}
}


const handleDessinerCartesPioche = (plateau) => {
	//Initialisation du canva
	let canva = document.getElementById("Pioche");
	let ctx = canva.getContext("2d");
	ctx.font = '25px Arial';

	if(plateau.getCartePiocheSelectionne() !== null && plateau.getCartePiocheSelectionne() !== undefined)
	{

		if(plateau.getCartePiocheEstSelectionne())
		{
			ctx.drawImage(imgCarteSelect, 0, 0, 120, 200);
		}else
		{
			ctx.drawImage(imgCarte, 0, 0, 120, 200);
		}

		ctx.drawImage(plateau.getCartePiocheSelectionne().imgSymbole, 18, 75, 92, 49);
		ctx.fillStyle = plateau.getCartePiocheSelectionne().couleur;
		ctx.fillText(plateau.getCartePiocheSelectionne().getNom(), 5, 25);


		if(plateau.getCartePiocheSelectionne().getNombre() !== 10)
		{
			ctx.fillText(plateau.getCartePiocheSelectionne().getNom(), 100, 195);
		}else{
			ctx.fillText(plateau.getCartePiocheSelectionne().getNom(), 90, 195);
		}
	}else{
		ctx.clearRect(0, 0, canva.width, canva.height); //Sinon on enlève l'affichage de la carte
	}

	if(plateau.cartes.length === 0)
	{
		return;
	}

	if(plateau.cartes[plateau.cartes.length-1] === undefined)
	{
		return;
	}

	
	if(plateau.cartes[plateau.cartes.length-1].getEstRetournee())
	{
		ctx.drawImage(imgCarte, 130, 0, 120, 200);
		ctx.drawImage(plateau.cartes[plateau.cartes.length-1].imgSymbole, 148, 75, 92, 49);
		ctx.fillStyle = plateau.cartes[plateau.cartes.length-1].couleur;
		ctx.fillText(plateau.cartes[plateau.cartes.length-1].getNom(), 135, 25);


		if(plateau.cartes[plateau.cartes.length-1].getNombre() !== 10)
		{
			ctx.fillText(plateau.cartes[plateau.cartes.length-1].getNom(), 150, 195);
		}else{
			ctx.fillText(plateau.cartes[plateau.cartes.length-1].getNom(), 210, 195);
		}

	}else
	{
		ctx.drawImage(imgDosCarte, 130, 0, 120, 200);
	}
}


export {handleDessinerCarteColonnes, handleDessinerCartesPioche, handleDessinerCartesPilesFin};