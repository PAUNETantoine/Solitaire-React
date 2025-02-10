/*
@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
Fichier qui mutualise tout le code et permet de générer la page web.
*/

import React, { useEffect, useState } from "react";
import "./styles/style.css";

/*Import dans scripts principaux*/
import { Plateau }         from "./scripts/Plateau";
import handleRechargerPage from "./scripts/rechargerPage";
import rechargerJeu        from "./scripts/rechargerJeu";
import Chronometre         from "./composants/Chronometre";
import triAutomatique      from "./scripts/triAutomatique";
import clicDroit           from "./scripts/ClicDroit";
import AnnulerCoup         from "./scripts/AnnulerCoup";

/*Importation des composants */
import CanvaFrame       from "./composants/CanvaFrame";
import ChargementPage   from "./composants/ChargementPage";
import BoutonsDiv       from "./composants/BoutonsDiv";
import StartGame        from "./composants/StartGame";
import AffichageGagner  from "./composants/AffichageGagner";
import NombreDeClics    from "./composants/NombreDeClics";

/*Import des scripts utiles*/
import gestionClick from "./scripts/ClicGauche";
import { envoyerPlateauGagnant, recevoirPlateauGagnant, serveurEstOn, ajouterVictoire, ajouterDefaite, autoConnect } from "./scripts/connexionServeur";


function App()
{
    //Les états
    const [plateau,          setPlateau ] = useState(null);
    const [annulerCoup,   setAnnulerCoup] = useState(new AnnulerCoup(true));
    const [jeuLance,         setJeuLance] = useState(false);
    const [gagner,           setGagner  ] = useState(false);
    const [estAleatoire, setEstAleatoire] = useState(null);
    const [estPause,         setEstPause] = useState(false);
    const [partieLance,   setPartieLance] = useState(false);


    //Etats permetant de gérer les données de connexion
    const [estConnecter, setEstConnecter] = useState(false);
    const [nomUtilisateurFinal, setNomUtilisateurFinal] = useState(null);
    const [nbDefaites, setNbDefaites] = useState(null);
    const [nbVictoires, setNbVictoires] = useState(null);
    const [meilleurTemps, setMeilleurTemps] = useState(null);
    


    //Les comportements
    useEffect(() => {
        const creerPlateau = async () => 
        {
            if(plateau === null && estAleatoire !== null && !estAleatoire)
            {
                document.getElementById("chargementPage").classList.add("chargementPage");
                if(await serveurEstOn())
                {
                    let tmpP = await recevoirPlateauGagnant();
                    document.getElementById("chargementPage").classList.remove("chargementPage");

                    if(tmpP === null)
                    {
                        alert("Aucune partie gagnante n'a été créée, lancement en mode aléatoire")
                        setEstAleatoire(true);
                        setPlateau(new Plateau());
                    }
                    else{
                        setPlateau(tmpP);
                    }
                }else{
                    document.getElementById("chargementPage").classList.remove("chargementPage");
                    alert("Serveur déconnecté, lancement de la partie en mode aléatoire.")
                    setEstAleatoire(true);
                    setPlateau(new Plateau());
                }
            }
            else{
                if(plateau === null && estAleatoire !== null && estAleatoire)
                {
                    setPlateau(new Plateau());
                }
            }
        }

        creerPlateau();
    }, [jeuLance, estAleatoire]);


    useEffect(() => {

    }, [partieLance])

    useEffect(() => {
        if(gagner && jeuLance)
        {
            document.getElementById("rangementAuto").classList.remove("cacher");
            document.getElementById("rangementAuto").classList.add("boutons");

            if(estAleatoire)
            {
                envoyerPlateauGagnant(annulerCoup.plateauDepart); //Envoyer au serveur un plateau gagnant
            }

            if(estConnecter)
            {
                ajouterVictoire(nomUtilisateurFinal);
            }

        }else{
            document.getElementById("zoneGagner").classList.remove("zoneGagner");
            document.getElementById("rangementAuto").classList.remove("boutons");
            document.getElementById("rangementAuto").classList.add("cacher");
        }
    }, [gagner])


    useEffect(() => {
        if(plateau !== null && jeuLance)
        {
            handleRechargerPage(plateau, true, setGagner); //Jeu lance a true pour bon affichage des coordonnées
            annulerCoup.rechargerJeu(plateau);
        }
    }, [plateau, jeuLance])

    //Gestion des clics
    useEffect(() => {

        if (!plateau) return;

        const canvaFrame = document.getElementById("canvaFrame");

        canvaFrame.addEventListener("mousedown", (event) => {
            pressionClick(event, canvaFrame);
        });

        canvaFrame.addEventListener("mousemove", (event) => {
            mouvementClick(event, canvaFrame);
        });
        
        // Écouteur pour `mouseup`
        canvaFrame.addEventListener("mouseup", (event) => {
            relacherClick(event, canvaFrame);
        });


        //pour les téléphones : 

        canvaFrame.addEventListener("touchStart", (event) => {
            pressionClick(event, canvaFrame);
        })

        canvaFrame.addEventListener("touchMove", (event) => {
            mouvementClick(event, canvaFrame);
        })

        canvaFrame.addEventListener("touchEnd", (event) => {
            relacherClick(event, canvaFrame);
        })
      
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


    const pressionClick = (event, canvaFrame) => {
        const x = event.offsetX;
        const y = event.offsetY;

        plateau.sourisClic = true;

        if(gestionClick(x, y, plateau, false, annulerCoup)) //Permet de recharger la page après la modification des valeurs
        {
            if(!partieLance && jeuLance)
            {
                setPartieLance(true);
            }
            handleRechargerPage(plateau, jeuLance, setGagner);
            annulerCoup.ajouterCoup(plateau);
        }
        handleRechargerPage(plateau, jeuLance, setGagner);
    }


    const mouvementClick = (event, canvaFrame) => {
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
    }


    const relacherClick = (event, canvaFrame) => {
        const x = event.offsetX;
        const y = event.offsetY;

        plateau.sourisClic = false;

        //Vérifications

        let estCoupValide = gestionClick(x, y, plateau, true, annulerCoup)


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

        if(estCoupValide)
        {
            if(!partieLance && jeuLance)
            {
                setPartieLance(true);
            }
            handleRechargerPage(plateau, jeuLance, setGagner);
            annulerCoup.ajouterCoup(plateau)
        }
        handleRechargerPage(plateau, jeuLance, setGagner);
    }


    const handleGameStart = (estAleatoireParam) => {
        document.getElementById('zoneLancementJeu').classList.add('cacher');

        if(!jeuLance)
        {
            setJeuLance(true);
            setEstAleatoire(estAleatoireParam);
        }

        if(jeuLance)
        {
            setEstPause(false)
            if(estAleatoireParam !== estAleatoire)
            {
                setEstAleatoire(estAleatoireParam);
                handleGameRefresh()
            }
        }
    }


    const handlePause = () => {

        document.getElementById('zoneLancementJeu').classList.toggle('cacher');

        setEstPause(true);
    }


    const handleGameRefresh = async () => {
        document.getElementById("zoneGagner").classList.remove("zoneGagner")
        document.getElementById("chargementPage").classList.add("chargementPage");
        document.getElementById("rangementAuto").classList.add("cacher");

        if(!gagner && partieLance && estConnecter)
        {
            ajouterDefaite(nomUtilisateurFinal);
        }

        setPartieLance(false);
        setJeuLance(false);
        setGagner(false);

        rechargerJeu(plateau, estAleatoire);


        setTimeout(() => {
            document.getElementById("chargementPage").classList.remove("chargementPage");
            setJeuLance(true);
            handleRechargerPage(plateau, true, setGagner);
        }, 1000)

        handleRechargerPage(plateau, true, setGagner);
        annulerCoup.rechargerJeu(plateau);
    }

    const handleAutoStore = () => {
        annulerCoup.autoSort = true;
        triAutomatique(plateau, setGagner)
    }


    const handleClicDroit = (event) => {
        if(clicDroit(event, plateau, annulerCoup)) //On change les coordonnées avant
        {
            handleRechargerPage(plateau, jeuLance, setGagner);
            annulerCoup.ajouterCoup(plateau);
        }
        handleRechargerPage(plateau, jeuLance, setGagner);
    }


    const handleRetourArriere = () => {
        annulerCoup.enArriere(plateau);
        handleRechargerPage(plateau, jeuLance, setGagner);
    }

    //Mise en place de l'icon
    let icon = document.getElementById("icon");
    icon.href = process.env.PUBLIC_URL + '/images/logo.png';
    
    
    //Le rendu
    return (
        <div className="BackGround">
            <CanvaFrame handleClicDroit={handleClicDroit}></CanvaFrame>
            <BoutonsDiv handleGameRefresh={handleGameRefresh} handleAutoStore={handleAutoStore} handleRetourArriere={handleRetourArriere} handlePause={handlePause}></BoutonsDiv>

            <StartGame handleGameStart={handleGameStart} 
                setEstConnecter={setEstConnecter}
                setNomUtilisateurFinal={setNomUtilisateurFinal}
                setNbVictoires={setNbVictoires}
                setNbDefaites={setNbDefaites}
                setMeilleurTemps={setMeilleurTemps}
                nbVictoires={nbVictoires}
                nbDefaites={nbDefaites}
                meilleurTemps={meilleurTemps}
                estPause={estPause}
                >
            </StartGame>

            <Chronometre partieLance={partieLance} gagner={gagner}></Chronometre>
            <ChargementPage></ChargementPage>
            <AffichageGagner handleGameRefresh={handleGameRefresh} estConnecte={estConnecter} nbVictoires={nbVictoires} nbDefaites={nbDefaites} meilleurTemps={meilleurTemps}></AffichageGagner>
            <NombreDeClics nbClics={annulerCoup}></NombreDeClics>
        </div>
    )
}


export default App;