import { Plateau } from "./composants/Plateau"
import React, { useEffect, useState } from "react";
import "./styles/style.css";
import handleRechargerPage from "./scripts/rechargerPage";
import handleDeplacerCarte from "./scripts/deplacerCarte";


/*Ce composant contient tous les autre composants dans app et permet de dispatcher correcter les différents éléments*/
function PilesVictoire()
{
    return(
        <div id="PilesDiv">
            <canvas id="Piles" className="Piles" width="510" height="200"/>
        </div>
    )
}



function Colonnes({handleClicDroit})
{
    return (
        <div id ="ColonnesDiv" onContextMenu={handleClicDroit}>
            <canvas className="Piles" id="Colonnes" width="900" height="600"/>
        </div>
    )
}

function Pioche({handleClicDroit})
{
    return (
        <div id="PiocheDiv" onContextMenu={handleClicDroit}>
            <canvas className="Piles" id="Pioche" width="250" height="200"/>
        </div>
    )
}



function App()
{
    //Les états
    const [plateau,          setPlateau         ] = useState(null);
    const [jeuLance,         setJeuLance        ] = useState(false);



    //Les comportements
    useEffect(() => {
        const nouveauPlateau = new Plateau();
        setPlateau(nouveauPlateau);
    }, []);



    //Gestion des clics
    useEffect(() => {

        if (!plateau) return;

        const pilesCanvas = document.getElementById("Piles");
        const colonnesCanvas = document.getElementById("Colonnes");
        const piocheCanvas = document.getElementById("Pioche");


        const handlePilesClick = (event) => {
            const rect = pilesCanvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;


            if(plateau.getCarteColonneSelectionne() !== null)
            {
                handleDeplacerCarte(plateau.getCarteColonneSelectionne(), null, "FIN-COLONNE", plateau, jeuLance);
                return;
            }

            if(plateau.getCartePiocheEstSelectionne() && plateau.getCartePiocheSelectionne() !== null)
            {
                handleDeplacerCarte(plateau.getCartePiocheSelectionne(), null, "FIN-PIOCHE", plateau, jeuLance);
                return;
            }

            if(plateau.getCarteFinSelectionne() === plateau.tabFin[Math.floor(x/130)][0])
            {
                plateau.setCarteFinSelectionne(null);
                handleRechargerPage(plateau, jeuLance);
                return;
            }

            plateau.setCarteFinSelectionne(plateau.tabFin[Math.floor(x/130)][0])
            plateau.setCarteColonneSelectionne(null);
            plateau.setCartePiocheEstSelectionne(false);
            plateau.setCartePiocheSelectionne(null);

            handleRechargerPage(plateau, jeuLance);
        };



        const handleColonnesClick = (event) => {
            const rect = colonnesCanvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            
            let indexX = Math.floor(x/130);
            let indexY = Math.floor(y/30);

            //Permet le calcul de la postion du clic selon la carte ( si une carte sous le paquet est cliquée )
            if(plateau.tabColonnes[indexX].length < indexY)
            {
                indexY = 0;
            }else{
                indexY = plateau.tabColonnes[indexX].length-1 - indexY;

                if(indexY < 0)
                {
                    indexY = 0;
                }
            }

            //Si c'est  de la pioche vers les colonnes
            if(plateau.getCartePiocheSelectionne() !== null && plateau.getCarteColonneSelectionne() === null && plateau.getCartePiocheEstSelectionne() === true)
            {
                const carteDep = plateau.getCartePiocheSelectionne();

                if(plateau.tabColonnes[indexX][indexY] === undefined)
                {
                    handleDeplacerCarte(carteDep, indexX, "PIOCHE", plateau, jeuLance);
                    return;
                }

                const carteArr = plateau.tabColonnes[indexX][indexY];
                handleDeplacerCarte(carteDep, carteArr, "PIOCHE", plateau, jeuLance);
                return;
            }

            //Si c'est de la fin vers les colonnes
            if(plateau.getCarteFinSelectionne() !== null && plateau.getCarteColonneSelectionne() === null)
            {
                const carteDep = plateau.getCarteFinSelectionne();

                if(plateau.tabColonnes[indexX][indexY] === undefined)
                {
                    handleDeplacerCarte(carteDep, indexX, "FINversCOLONNES", plateau, jeuLance);
                    return;
                }

                const carteArr = plateau.tabColonnes[indexX][indexY];
                handleDeplacerCarte(carteDep, carteArr, "FINversCOLONNES", plateau, jeuLance);
                return;
            }



            //Si c'est de colonne vers colonne

            plateau.setCartePiocheEstSelectionne(false); //On déselectionne les autres éléments

            if(plateau.tabColonnes[indexX][indexY] === undefined) //Si clic sur une colonne vide
            {
                const carteDep = plateau.getCarteColonneSelectionne();
                handleDeplacerCarte(carteDep, indexX, "COLONNES", plateau, jeuLance);
                handleRechargerPage(plateau, jeuLance);
                return;
            }

            if(plateau.getCarteColonneSelectionne() === plateau.tabColonnes[indexX][indexY] || !plateau.tabColonnes[indexX][indexY].getEstRetournee()) //Si déjà selectionné alors on déselectionne
            {
                plateau.setCarteColonneSelectionne(null);
            }else{
                if(plateau.getCarteColonneSelectionne() !== null)
                {
                    const carteDep = plateau.getCarteColonneSelectionne();
                    const carteArr = plateau.tabColonnes[indexX][indexY];

                    if(carteArr === undefined) //Si clic sur colonne vide
                    {
                        handleDeplacerCarte(carteDep, indexX, "COLONNES", plateau, jeuLance);
                    }else{
                        handleDeplacerCarte(carteDep, carteArr, "COLONNES", plateau, jeuLance);
                    }

                }else{
                    plateau.setCarteColonneSelectionne(plateau.tabColonnes[indexX][indexY]);
                }
            }

            handleRechargerPage(plateau, jeuLance);
        };



        const handlePiocheClick = (event) => {
            const rect = piocheCanvas.getBoundingClientRect();
            const x = event.clientX - rect.left;


            if(x > 130)
            {
                if(plateau.getCartePiocheSelectionne() !== null)
                {
                    plateau.cartes.unshift(plateau.getCartePiocheSelectionne());
                }

                plateau.setCartePiocheSelectionne(plateau.cartes.pop());

                plateau.setCartePiocheEstSelectionne(false);

            }else if(x < 121)
            {
                if(plateau.getCartePiocheEstSelectionne())
                {
                    plateau.setCartePiocheEstSelectionne(false);
                }else
                {
                    plateau.setCartePiocheEstSelectionne(true);
                }
            }

            plateau.setCarteColonneSelectionne(null);

            handleRechargerPage(plateau, jeuLance);
        };



        pilesCanvas.addEventListener("click", handlePilesClick);
        colonnesCanvas.addEventListener("click", handleColonnesClick);
        piocheCanvas.addEventListener("click", handlePiocheClick);

        return () => {
            pilesCanvas.removeEventListener("click", handlePilesClick);
            colonnesCanvas.removeEventListener("click", handleColonnesClick);
            piocheCanvas.removeEventListener("click", handlePiocheClick);
        };
    }, [plateau]);


    const handleGameStart = () => {

        if(!jeuLance)
        {
            handleMelangerCartes();
            handleRechargerPage(plateau, jeuLance);
            setJeuLance(true);
        }
    }


    const handleMelangerCartes = () => {
        plateau.melangerCartes();
    }



    const handleClicDroit = (event) => {
        event.preventDefault();

        if(plateau.getCarteColonneSelectionne() !== null && plateau.getIndexLigneCarte(plateau.getCarteColonneSelectionne()) !== 0)
        {
            return;
        }
    
        if(plateau.getCarteColonneSelectionne() !== null && plateau.getCarteColonneSelectionne() !== undefined)
        {
            handleDeplacerCarte(plateau.getCarteColonneSelectionne(), null, "FIN-COLONNE", plateau, jeuLance); //Transfert de colonnes vers FIN
        }else if(plateau.getCartePiocheSelectionne() !== null && plateau.getCartePiocheEstSelectionne() !== undefined && plateau.getCartePiocheEstSelectionne())
        {
            handleDeplacerCarte(plateau.getCartePiocheSelectionne(), null, "FIN-PIOCHE", plateau, jeuLance); //Transfert de pioche vers FIN
        }else{
            return;
        }
      };
    
    
    //Le rendu
    return (
        <div className="BackGround">
            <PilesVictoire></PilesVictoire>
            <Colonnes handleClicDroit={handleClicDroit}></Colonnes>
            <Pioche handleClicDroit={handleClicDroit}></Pioche>
            <button onClick={handleGameStart}>Lancer le jeu</button>

        </div>
    )
}


export default App;