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
import { envoyerPlateauGagnant, recevoirPlateauGagnant, serveurEstOn, ajouterVictoire, ajouterDefaite, recevoirData } from "./scripts/connexionServeur";
import { debutChargementPage, finChargementPage } from "./scripts/Utile";


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
    

    const [estMobile, setEstMobile] = useState(false);


    //Etats permetant de gérer les données de connexion
    const [estConnecter, setEstConnecter] = useState(false);
    const [nomUtilisateurFinal, setNomUtilisateurFinal] = useState(null);
    const [nbDefaites, setNbDefaites] = useState(null);
    const [nbVictoires, setNbVictoires] = useState(null);
    const [meilleurTemps, setMeilleurTemps] = useState(null);
    const [victoireAjoutee, setVictoireAjoutee] = useState(false);
    


    //Les comportements
    useEffect(() => {
        const creerPlateau = async () => 
        {
            if(plateau === null && estAleatoire !== null && !estAleatoire)
            {
                debutChargementPage()
                if(await serveurEstOn())
                {
                    let tmpP = await recevoirPlateauGagnant();
                    finChargementPage()

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
                    finChargementPage()
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
        const estSurMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        setEstMobile(estSurMobile);
    
        if (estSurMobile) {
            const meta = document.createElement("meta");
            meta.name = "viewport";
            meta.content = "width=1024"; // Force l'affichage comme un écran de 1024px de large
            document.head.appendChild(meta);

            document.getElementById("zoneBoutons").classList.add("modeTelephoneBtns")
            document.getElementById("zoneBoutons").classList.remove("zoneBoutons")

        } else {
            console.log("L'utilisateur est sur PC");
        }
    }, [estMobile])



    useEffect(() => {

    }, [partieLance])

    useEffect(() => {
        if(gagner && jeuLance && partieLance)
        {
            document.getElementById("rangementAuto").classList.remove("cacher");
            document.getElementById("rangementAuto").classList.add("boutons");

            if(estAleatoire)
            {
                envoyerPlateauGagnant(annulerCoup.plateauDepart); //Envoyer au serveur un plateau gagnant
            }

            if(estConnecter && !victoireAjoutee)
            {
                ajouterVictoire(nomUtilisateurFinal);
                setVictoireAjoutee(true);
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

        canvaFrame.addEventListener("touchstart", (event) => {
            pressionClick(event, canvaFrame, "Telephone");
        })

        canvaFrame.addEventListener("touchmove", (event) => {
            event.preventDefault();
            mouvementClick(event, canvaFrame, "Telephone");
        })

        canvaFrame.addEventListener("touchend", (event) => {
            event.preventDefault();
            relacherClick(event, canvaFrame, "Telephone");
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


    const pressionClick = (event, canvaFrame, typeClient) => {
        let x = event.offsetX;
        let y = event.offsetY;

        if(typeClient === "Telephone")
        {
            let coordonnees = event.touches[0];
            x = Math.floor(coordonnees.clientX);
            y = Math.floor(coordonnees.clientY);
        }

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


    const mouvementClick = (event, canvaFrame, typeClient) => {

        let x = event.offsetX;
        let y = event.offsetY;

        if(typeClient === "Telephone")
        {
            let coordonnees = event.touches[0];
            x = Math.floor(coordonnees.clientX);
            y = Math.floor(coordonnees.clientY);
        }
            

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


    const relacherClick = (event, canvaFrame, typeClient) => {
        let x = event.offsetX;
        let y = event.offsetY;

        if(typeClient === "Telephone")
        {
            let coordonnees = event.changedTouches[0];
            x = Math.floor(coordonnees.clientX);
            y = Math.floor(coordonnees.clientY);
        }

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
        document.getElementById("rangementAuto").classList.add("cacher");
        debutChargementPage()

        if(!gagner && partieLance && estConnecter)
        {
            await ajouterDefaite(nomUtilisateurFinal);
        }

        const donnees = await recevoirData(nomUtilisateurFinal);

        setNbDefaites(donnees[2])
        setNbVictoires(donnees[1])
        setMeilleurTemps(donnees[3]);

        setPartieLance(false);
        setJeuLance(false);
        setGagner(false);


        rechargerJeu(plateau, estAleatoire);


        setTimeout(() => {
            finChargementPage();
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