/*
@author : Antoine PAUNET
Version : 0.6 Beta
Date    : 24/01/25
--------------------
File : main file
*/

import { Plateau } from "./composants/Plateau"
import React, { useEffect, useState } from "react";
import "./styles/style.css";
import handleRechargerPage from "./scripts/rechargerPage";
import handleDeplacerCarte from "./scripts/deplacerCarte";


/*Ce composant contient tous le canva dans app et permet de dispatcher correctement les différents éléments*/
function CanvaFrame({handleClicDroit})
{
    return (
        <div onContextMenu={handleClicDroit}>
             <canvas className="Piles" id="canvaFrame" width={window.innerWidth - 20} height={window.innerHeight - 50}/>
        </div>
    )
}



function App()
{
    //Les états
    const [plateau,  setPlateau ] = useState(null);
    const [jeuLance, setJeuLance] = useState(false);



    //Les comportements
    useEffect(() => {
        const nouveauPlateau = new Plateau();
        setPlateau(nouveauPlateau);
    }, []);



    //Gestion des clics
    useEffect(() => {

        if (!plateau) return;

        const canvaFrame = document.getElementById("canvaFrame");
 


        const handlePilesClick = (x, y) => {


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

            handleRechargerPage(plateau, jeuLance);
        };



        const handleColonnesClick = (x, y) => {

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



        const handlePiocheClick = (x, y) => {

            if(x > 130)
            {
                if(plateau.getCartePiocheSelectionne() !== null)
                {
                    plateau.cartes.unshift(plateau.getCartePiocheSelectionne());
                }

                plateau.setCartePiocheSelectionne(plateau.cartes.pop());

                plateau.getCartePiocheSelectionne().setX((canvaFrame.width - 250));
                plateau.getCartePiocheSelectionne().setY(0);

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


        canvaFrame.addEventListener("mousedown", (event) => {
            const x = event.offsetX;
            const y = event.offsetY;

            plateau.sourisClic = true;

            
            if(x > (canvaFrame.width / 2 - 235) && x < (canvaFrame.width / 2 + 235) && y > 0 && y < 200) //Si on clic sur les piles
            {
                handlePilesClick((x-(canvaFrame.width / 2 - 235)), y);
                return;
            }

            if(x > (canvaFrame.width / 2 - 450) && x < (canvaFrame.width / 2 + 450) && y > 250 && y < 850) //Si on clic sur les colonnes
            {
                handleColonnesClick((x-(canvaFrame.width / 2 - 450)), y - 250);
                return;
            }

            if(x > (canvaFrame.width - 250) && x < (canvaFrame.width) && y > 0 && y < 200) //Si on clic sur la pioche
            {
                handlePiocheClick((x-(canvaFrame.width - 250)), y);
            }
        });


        canvaFrame.addEventListener("mousemove", (event) => {
            const rect = canvaFrame.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            if(plateau.sourisClic)
            {
                if(plateau.getCarteColonneSelectionne() !== null)
                {
                    if(plateau.getIndexLigneCarte(plateau.getCarteColonneSelectionne()) !== 0)
                    {
                        for(let i = plateau.getIndexLigneCarte(plateau.getCarteColonneSelectionne()) ; i >= 0 ; i--)
                        {
                            plateau.tabColonnes[plateau.getIndexColonneCarte(plateau.getCarteColonneSelectionne())][i].setX(x - 60);
                            plateau.tabColonnes[plateau.getIndexColonneCarte(plateau.getCarteColonneSelectionne())][i].setY((y - 100) - (i*30));
                            plateau.tabColonnes[plateau.getIndexColonneCarte(plateau.getCarteColonneSelectionne())][i].setEstMouvement(true);
                        }
                    }else{
                        plateau.getCarteColonneSelectionne().setEstMouvement(true);
                        plateau.getCarteColonneSelectionne().setX(x - 60)
                        plateau.getCarteColonneSelectionne().setY(y - 100)
                    }
                }else if(plateau.getCartePiocheSelectionne() !== null && plateau.getCartePiocheEstSelectionne())
                {
                    plateau.getCartePiocheSelectionne().setEstMouvement(true);
                    plateau.getCartePiocheSelectionne().setX(x - 60)
                    plateau.getCartePiocheSelectionne().setY(y - 100)                
                }else if(plateau.getCarteFinSelectionne() !== null && plateau.getCarteFinSelectionne() !== undefined)
                {
                    plateau.getCarteFinSelectionne().setEstMouvement(true);
                    plateau.getCarteFinSelectionne().setX(x - 60)
                    plateau.getCarteFinSelectionne().setY(y - 100)       
                }
            }else{
                return;
            }

            let ctx = canvaFrame.getContext("2d");

            ctx.clearRect(0, 0, canvaFrame.width, canvaFrame.height);

            handleRechargerPage(plateau, jeuLance);
        });
        
        // Écouteur pour `mouseup`
        canvaFrame.addEventListener("mouseup", (event) => {
            const x = event.offsetX;
            const y = event.offsetY;

            plateau.sourisClic = false;

            

            //Vérifications

            if(x > (canvaFrame.width / 2 - 235) && x < (canvaFrame.width / 2 + 235) && y > 0 && y < 200) //Si on clic sur les piles
            {
                handlePilesClick((x-(canvaFrame.width / 2 - 235)), y);
            }

            if(x > (canvaFrame.width / 2 - 450) && x < (canvaFrame.width / 2 + 450) && y > 250 && y < 850) //Si on clic sur les colonnes
            {
                handleColonnesClick((x-(canvaFrame.width / 2 - 450)), y - 250);
            }

            if(x > (canvaFrame.width - 250) && x < (canvaFrame.width - 130) && y > 0 && y < 200)//si on clic sur la carte à selectionner de la pioche
            {
                handlePiocheClick((x-(canvaFrame.width - 250)), y);
            }


            if(plateau.getCarteColonneSelectionne() !== null)
            {
                plateau.getCarteColonneSelectionne().setEstMouvement(false);
            }else if(plateau.getCartePiocheEstSelectionne())
            {
                plateau.getCartePiocheSelectionne().setEstMouvement(false);
            }else if(plateau.getCarteFinSelectionne())
            {
                plateau.getCarteFinSelectionne().setEstMouvement(false);
            }

            checkEstMouvement(); //enlève est mouvement
            

            plateau.setCarteColonneSelectionne(null);
            plateau.setCarteFinSelectionne(null);
            plateau.setCartePiocheEstSelectionne(false);


            let ctx = canvaFrame.getContext("2d");

            ctx.clearRect(0, 0, canvaFrame.width, canvaFrame.height);

            handleRechargerPage(plateau, jeuLance);
        });

      
    }, [plateau]);


    const checkEstMouvement = () => {
        for(let i = 0 ; i < plateau.tabColonnes.length ; i++)
        {
            for(let j = 0 ; j < plateau.tabColonnes[i].length; j++)
            {
                if(plateau.tabColonnes[i][j].getEstMouvement())
                {
                    plateau.tabColonnes[i][j].setEstMouvement(false);
                }
            }
        }

        for(let i = 0 ; i < plateau.cartes.length ; i++)
        {
            if(plateau.cartes[i].getEstMouvement())
            {
                plateau.cartes[i].setEstMouvement(false);
            }
        }
    }


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
        const x = event.clientX;
        const y = event.clientY;

        const canvaFrame = document.getElementById("canvaFrame");

        if(plateau.getCarteColonneSelectionne() !== null && plateau.getIndexLigneCarte(plateau.getCarteColonneSelectionne()) !== 0)
        {
            return;
        }
    
        if(x > (canvaFrame.width / 2 - 450) && x < (canvaFrame.width / 2 + 450) && y > 250 && y < 850)
        {
            let indexX = Math.floor((x - (canvaFrame.width / 2 - 450))/130);
            let indexY = Math.floor((y - 250)/30);

            indexY = plateau.tabColonnes[indexX].length-1 - indexY;

            if(indexY < 0)
            {
                indexY = 0;
            }

            plateau.setCarteColonneSelectionne(plateau.tabColonnes[indexX][indexY]);

            if(plateau.getCarteColonneSelectionne === null)
            {
                return;
            }

            handleDeplacerCarte(plateau.getCarteColonneSelectionne(), null, "FIN-COLONNE", plateau, jeuLance); //Transfert de colonnes vers FIN

            plateau.setCarteColonneSelectionne(null);

        }else if(plateau.getCartePiocheSelectionne() !== null && plateau.getCartePiocheSelectionne() !== undefined && x > (canvaFrame.width - 250) && x < (canvaFrame.width - 130) && y > 0 && y < 200)
        {
            handleDeplacerCarte(plateau.getCartePiocheSelectionne(), null, "FIN-PIOCHE", plateau, jeuLance); //Transfert de pioche vers FIN
        }else{
            console.log("ok 2")
            return;
        }
      };
    
    
    //Le rendu
    return (
        <div className="BackGround">
            <CanvaFrame handleClicDroit={handleClicDroit}></CanvaFrame>
            <button onClick={handleGameStart}>Lancer le jeu</button>

        </div>
    )
}


export default App;