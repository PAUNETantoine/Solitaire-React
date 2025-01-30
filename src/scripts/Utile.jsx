
const clicEstDansColonnes = (x,y) => {
	const canvaFrame = document.getElementById("canvaFrame");

	return (x > (canvaFrame.width / 2 - 450) && x < (canvaFrame.width / 2 + 450) && y > 250 && y < 850);
}

const clicEstDansPioche = (x,y) => {
	const canvaFrame = document.getElementById("canvaFrame");

	return (x > (canvaFrame.width - 250) && x < (canvaFrame.width - 130) && y > 0 && y < 200);
}

export {clicEstDansColonnes, clicEstDansPioche}
