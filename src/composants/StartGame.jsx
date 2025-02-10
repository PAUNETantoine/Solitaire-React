/*@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
Composant permettant de lancer la partie au lancement de la page
*/
import React from "react";
import { useState, useEffect } from "react";
import { creerCompte, connexionCompte, serveurEstOn, autoConnect, deconnexionServeur } from "../scripts/connexionServeur";


function StartGame({ handleGameStart, setEstConnecter, setNomUtilisateurFinal, setNbVictoires, setNbDefaites, setMeilleurTemps, nbVictoires, nbDefaites, meilleurTemps }) {

    const [menuVisible, setMenuVisible] = useState(false);
    const [menuCompteVisible, setMenuCompteVisible] = useState(false);


    const [menuText, setMenuText] = useState("Mode : Jeu Aléatoire ▼");
    const [estAleatoire, setEstAleatoire] = useState(true);
    const [creationCompte, setCreationCompte] = useState(false);
    const [connexion, setConnexion] = useState(false);
    
    const [estConnecterMenu, setEstConnecterMenu] = useState(false);


    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [mdp, setMdp] = useState('');

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

    const handleCreerCompte = async (event) => {
        event.preventDefault();

        if(await creerCompte(nomUtilisateur, mdp))
        {
            setCreationCompte(false);
        }
    }

    const handleConnexion = async (event) => {
        event.preventDefault();

        const resultatConnexion = await connexionCompte(nomUtilisateur, mdp);

        setMdp('');

        if(resultatConnexion !== undefined && resultatConnexion[0])
        {
            setConnexion(false);
            setEstConnecter(resultatConnexion[0]);
            setNomUtilisateurFinal(nomUtilisateur);
            setNbDefaites(resultatConnexion[2])
            setNbVictoires(resultatConnexion[1])
            setMeilleurTemps(resultatConnexion[3]);

            setEstConnecterMenu(resultatConnexion[0]);
        }
    }


    useEffect(() => {
        const recevoirDonnees = async () => {
            if (await serveurEstOn() && !estConnecterMenu) {

                const resultatConnexion = await autoConnect();

                console.log(resultatConnexion)
    
                if (resultatConnexion !== undefined) 
                {
                    setEstConnecter(resultatConnexion[0]);
                    setNomUtilisateurFinal(resultatConnexion[4]);
                    setNomUtilisateur(resultatConnexion[4]);
                    setNbDefaites(resultatConnexion[2]);
                    setNbVictoires(resultatConnexion[1]);
                    setMeilleurTemps(resultatConnexion[3]);

                    setEstConnecterMenu(resultatConnexion[0]);
                }
            }
        };
    
        recevoirDonnees();
    
    }, []);



    const handleMenuCompteVisible = () => {
        setMenuCompteVisible(!menuCompteVisible);
    }


    const deconnexion = async () => {

        await deconnexionServeur(nomUtilisateur);

        setEstConnecter(false);
        setNomUtilisateurFinal("");
        setNbDefaites(null)
        setNbVictoires(null)
        setMeilleurTemps(null);

        setEstConnecterMenu(false);
    }

    return (
        <div id="zoneLancementJeu">
            {estConnecterMenu &&(
                <div id="compte">
                    <p id="iconCompte" onClick={handleMenuCompteVisible}>
                        <img src={process.env.PUBLIC_URL + "/images/logoCompte.png"} height={75} width={75}></img>
                    </p>
                    {menuCompteVisible && (
                        <div id="menuCompte">
                            <p>Nombre de victoires : {nbVictoires}</p>
                            <p>Nombre de défaites : {nbDefaites}</p>
                            <p>Pourcentage de réussite : {nbDefaites > 0 ? Math.floor((nbVictoires / nbDefaites) * 100) : 100}%</p>
                            <p>Meilleur temps : {meilleurTemps ||= "Non défini"}</p>
                        </div>
                    )}
                    <h2 id="txtNomUtilisateur">{nomUtilisateur}</h2>
                </div>
            )}

            {!creationCompte && !connexion && (
            <div className="zoneLancementJeu">
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

                <h2 className="creerCompte" id="btnCreerCompte" onClick={() => setCreationCompte(true)}>Créer un compte</h2>

                {!estConnecterMenu && (
                    <h2 className="creerCompte" id="btnCreerCompte" onClick={() => setConnexion(true)}>Se Connecter</h2>
                )}

                {estConnecterMenu && (
                    <h2 className="creerCompte" id="btnCreerCompte" onClick={deconnexion}>Se Déconnecter</h2>
                )}
            </div>
            )}

            {creationCompte && (
                <div className="zoneLancementJeu">

                    <h1 className="creerCompte">Création d'un compte : </h1>


                    <form onSubmit={handleCreerCompte} className="creerCompte">
                        <div>
                        <label>Nom d'utilisateur : </label>
                        <input
                            type="text"
                            value={nomUtilisateur}
                            onChange={(e) => setNomUtilisateur(e.target.value)}
                            required
                        />
                        </div>
                        <div>
                        <label>Mot de passe : </label>
                        <input
                            type="password"
                            value={mdp}
                            onChange={(e) => setMdp(e.target.value)}
                            required
                        />
                        </div>
                        <button type="submit" >S'inscrire</button>
                    </form>

                    <h2 className="creerCompte" id="annuler" onClick={() => setCreationCompte(false)}>Annuler</h2>
                </div>
            )}

            {connexion && (
                <div className="zoneLancementJeu">

                <h1 className="creerCompte">Connexion : </h1>


                <form onSubmit={handleConnexion} className="creerCompte">
                    <div>
                    <label>Nom d'utilisateur : </label>
                    <input
                        type="text"
                        value={nomUtilisateur}
                        onChange={(e) => setNomUtilisateur(e.target.value)}
                        required
                    />
                    </div>
                    <div>
                    <label>Mot de passe : </label>
                    <input
                        type="password"
                        value={mdp}
                        onChange={(e) => setMdp(e.target.value)}
                        required
                    />
                    </div>
                    <button type="submit" >Se connecter</button>
                </form>

                <h2 className="creerCompte" id="annuler" onClick={() => setConnexion(false)}>Annuler</h2>
            </div>
            )}
        </div>
    );
}

export default StartGame;