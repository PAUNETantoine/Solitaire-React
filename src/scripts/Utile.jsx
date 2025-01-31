//Cette fonction permet de savoir si on clic dans les colonnes
const clicEstDansColonnes = (x,y) => {
	const canvaFrame = document.getElementById("canvaFrame");

	return (x > (canvaFrame.width / 2 - 450) && x < (canvaFrame.width / 2 + 450) && y > 250 && y < 850);
}

//Cette fonction permet de savoir si on clic dans la pioche
const clicEstDansPioche = (x,y, mouseUp) => {
	const canvaFrame = document.getElementById("canvaFrame");

	if(mouseUp)
	{
		return (x > (canvaFrame.width - 250) && x < (canvaFrame.width - 130) && y > 0 && y < 200);
	}else{
		return (x > (canvaFrame.width - 250) && x < (canvaFrame.width) && y > 0 && y < 200);
	}

}

const clicEstDansPile = (x,y) => {
	const canvaFrame = document.getElementById("canvaFrame");

	return (x > (canvaFrame.width / 2 - 235) && x < (canvaFrame.width / 2 + 270) && y > 0 && y < 200);
}

export {clicEstDansColonnes, clicEstDansPioche, clicEstDansPile}
