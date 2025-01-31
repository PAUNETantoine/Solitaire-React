/*
@author : Antoine PAUNET
Version : 0.9.5 Beta
Date    : 29/01/25
--------------------
File : main file
*/

import React, { useEffect, useState } from "react";
import "./styles/style.css";
import { Plateau } from "./scripts/Plateau"

/*Import dans scripts principaux*/
import handleRechargerPage from "./scripts/rechargerPage";
import rechargerJeu        from "./scripts/rechargerJeu";
import Chronometre         from "./scripts/Chronometre";
import triAutomatique      from "./scripts/triAutomatique";
import clicDroit           from "./scripts/ClicDroit";

/*Importation des composants */
import CanvaFrame       from "./composants/CanvaFrame";
import ChargementPage   from "./composants/ChargementPage";
import BoutonsDiv       from "./composants/BoutonsDiv";
import StartGame        from "./composants/StartGame";
import AffichageGagner  from "./composants/AffichageGagner";


/*Import des scripts utiles*/
import gestionClick from "./scripts/ClicGauche";


function App()
{
    //Les états
    const [plateau,  setPlateau ] = useState(null);
    const [jeuLance, setJeuLance] = useState(false);
    const [gagner,   setGagner  ] = useState(false);


    //Les comportements
    useEffect(() => {
        const nouveauPlateau = new Plateau();
        setPlateau(nouveauPlateau);
    }, []);


    useEffect(() => {
        if(gagner && jeuLance)
        {
            document.getElementById("rangementAuto").classList.remove("cacher");
            document.getElementById("rangementAuto").classList.add("boutons");
        }else{
            document.getElementById("zoneGagner").classList.remove("zoneGagner");
            document.getElementById("rangementAuto").classList.remove("boutons");
            document.getElementById("rangementAuto").classList.add("cacher");
        }
    }, [gagner])



    //Gestion des clics
    useEffect(() => {

        if (!plateau) return;

        const canvaFrame = document.getElementById("canvaFrame");


        canvaFrame.addEventListener("mousedown", (event) => {
            const x = event.offsetX;
            const y = event.offsetY;

            plateau.sourisClic = true;
            
            gestionClick(x, y, plateau, false);

            handleRechargerPage(plateau, jeuLance, setGagner);
        });




        canvaFrame.addEventListener("mousemove", (event) => {
            const x = event.offsetX;
            const y = event.offsetY;

            if(plateau.sourisClic)
            {
                if(plateau.getCarteColonneSelectionne() !== null)
                {
                    if(plateau.getIndexLigneCarte(plateau.getCarteColonneSelectionne()) !== 0) //Si on prends un paquet de cartes
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

            handleRechargerPage(plateau, jeuLance, setGagner);
        });
        

        
        // Écouteur pour `mouseup`
        canvaFrame.addEventListener("mouseup", (event) => {
            const x = event.offsetX;
            const y = event.offsetY;

            plateau.sourisClic = false;

            

            //Vérifications

            gestionClick(x, y, plateau, true);


            if(plateau.getCarteColonneSelectionne() !== null && plateau.getCarteColonneSelectionne() !== undefined)
            {
                plateau.getCarteColonneSelectionne().setEstMouvement(false);
            }else if(plateau.getCartePiocheEstSelectionne())
            {
                plateau.getCartePiocheSelectionne().setEstMouvement(false);
            }else if(plateau.getCarteFinSelectionne())
            {
                plateau.getCarteFinSelectionne().setEstMouvement(false);
            }

            checkEstMouvement(); //enlève estMouvement

            plateau.setCarteColonneSelectionne(null);
            plateau.setCarteFinSelectionne(null);
            plateau.setCartePiocheEstSelectionne(false);

            let ctx = canvaFrame.getContext("2d");

            ctx.clearRect(0, 0, canvaFrame.width, canvaFrame.height);

            handleRechargerPage(plateau, jeuLance, setGagner);
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
        document.getElementById('zoneLancementJeu').classList.add('cacher');;
        if(!jeuLance)
        {
            handleRechargerPage(plateau, jeuLance, setGagner);
            setJeuLance(true);
        }
    }


    const handleGameRefresh = () => {
        document.getElementById("zoneGagner").classList.remove("zoneGagner")
        document.getElementById("chargementPage").classList.add("chargementPage");
        document.getElementById("rangementAuto").classList.add("cacher");

        setJeuLance(false);
        setGagner(false);
        rechargerJeu(plateau);

        setTimeout(() => {
            handleRechargerPage(plateau, false, setGagner);
            document.getElementById("chargementPage").classList.remove("chargementPage");
            setJeuLance(true);
        }, 1000)
    }

    const handleAutoStore = () => {
        triAutomatique(plateau, setGagner)
    }


    const handleClicDroit = (event) => {
        clicDroit(event, plateau, jeuLance, setGagner);
        handleRechargerPage(plateau, jeuLance, setGagner);
    }


    //Mise en place de l'icon
    let icon = document.getElementById("icon");
    icon.href = process.env.PUBLIC_URL + '/images/logo.png';
    
    
    //Le rendu
    return (
        <div className="BackGround">
            <CanvaFrame handleClicDroit={handleClicDroit}></CanvaFrame>
            <BoutonsDiv handleGameRefresh={handleGameRefresh} handleAutoStore={handleAutoStore}></BoutonsDiv>
            <StartGame handleGameStart={handleGameStart}></StartGame>
            <Chronometre jeuLance={jeuLance} gagner={gagner}></Chronometre>
            <ChargementPage></ChargementPage>
            <AffichageGagner handleGameRefresh={handleGameRefresh}></AffichageGagner>
        </div>
    )
}


export default App;