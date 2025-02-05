/*@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
Composant permettant de lancer la partie au lancement de la page
*/
import React from "react";
import { useState } from "react";


function StartGame({ handleGameStart }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuText, setMenuText] = useState("Mode : Jeu Aléatoire ▼");
    const [estAleatoire, setEstAleatoire] = useState(true);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleJeuAleatoireClick = () => {
        setMenuText("Mode : Jeu Aléatoire ▼");
        setEstAleatoire(true);
    };

    const handleJeuGagnantClick = () => {
        setMenuText("Mode : Jeu Gagnant ▼");
        setEstAleatoire(false);
    };

    const lancerLeJeu = () => {
        handleGameStart(estAleatoire);
    }

    return (
        <div id="zoneLancementJeu" className="zoneLancementJeu">
            <h1>Solitaire-React</h1>

            <div className="liste-deroulante-container" onClick={toggleMenu}>
                <p id="menuChoix">{menuText}</p>
                {menuVisible && (
                    <div className="liste-deroulante">
                        <p onClick={handleJeuAleatoireClick}>Jeu Aléatoire</p>
                        <p onClick={handleJeuGagnantClick}>Jeu Gagnant</p>
                    </div>
                )}
            </div>

            <button onClick={lancerLeJeu}>
                <img src={process.env.PUBLIC_URL + '/images/play.png'} alt="Play" />
            </button>
            <h3>Par Antoine PAUNET</h3>
        </div>
    );
}

export default StartGame;