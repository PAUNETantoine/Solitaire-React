/*
@author : Antoine PAUNET
Version : 1.5
Date    : 10/02/25
--------------------
Fichier permettant de se connecter sur le serveur
*/


import { useState } from "react";
import { Plateau } from "./Plateau";


//IP du serveur
const ip = "https://serveur-solitaire-react-production.up.railway.app";
//const ip = "http://localhost:5000";

const serveurEstOn = async () => {
	try{
		const response = await fetch(ip + "/api/estOn", {
			method: "POST"
		})

		if(await response.json())
		{
			return true;
		}

	}catch(error)
	{
		return false;
	}
}


const autoConnect = async() => {
	try {
		const response = await fetch(ip + '/api/autoConnect', {
		  method: 'POST'
		});
  
		const data = await response.json();

		if (response.status === 200) {

		  alert(data.message);

		  const res = [true, data.stats.nbVictoires, data.stats.nbDefaites, data.stats.meilleurTemps, data.stats.nomUtilisateur];

		  return res;
		} else {
		  	console.log(data.error);
			return [false];
		}

	} catch (err) {
		alert('Erreur serveur');
		return [false];
	}
}


const recevoirData = async (nomUtilisateur) => {
	const servOn = await serveurEstOn();

	if(!servOn)
	{
		alert("Le serveur est hors ligne, veuillez ressayer plus tard...")
		return [false];
	}

	try {
		const response = await fetch(ip + '/api/recevoirData', {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify({ nomUtilisateur }),
		});
  
		const data = await response.json();

		if (response.status === 200) {

		  console.log(data.message);

		  const res = [true, data.stats.nbVictoires, data.stats.nbDefaites, data.stats.meilleurTemps];

		  return res;
		} else {
		  	alert(data.error);
			return [false];
		}

	} catch (err) {
		alert('Erreur serveur');
		return [false];
	}

}


const connexionCompte = async (nomUtilisateur, mdp) => {
	const servOn = await serveurEstOn();

	if(!servOn)
	{
		alert("Le serveur est hors ligne, veuillez ressayer plus tard...")
		return [false];
	}


	try {
		const response = await fetch(ip + '/api/connexion', {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify({ nomUtilisateur, mdp }),
		});
  
		const data = await response.json();

		if (response.status === 200) {

		  console.log(data.message);

		  const res = [true, data.stats.nbVictoires, data.stats.nbDefaites, data.stats.meilleurTemps];

		  return res;
		} else {
		  	alert(data.error);
			return [false];
		}

	} catch (err) {
		alert('Erreur serveur');
		return [false];
	}
}

const deconnexionServeur = async (nomUtilisateur) => {
	const servOn = await serveurEstOn();

	if(!servOn)
	{
		alert("Le serveur est hors ligne, veuillez ressayer plus tard...")
		return false;
	}

	try {
		const response = await fetch(ip + '/api/deconnexion', {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify({ nomUtilisateur : nomUtilisateur}),
		});
  
		const data = await response.json();

		if (response.status === 201) {
		  alert('Vous êtes déconnecté avec succès');
		  return true;
		} else {
		  	alert(data.error);
			return false;
		}

	} catch (err) {
		alert('Erreur serveur');
		return false;
	}
}

const creerCompte = async (nomUtilisateur, mdp) => {

	const servOn = await serveurEstOn();

	if(!servOn)
	{
		alert("Le serveur est hors ligne, veuillez ressayer plus tard...")
		return false;
	}

    try {
		const response = await fetch(ip + '/api/registerUser', {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify({ nomUtilisateur, mdp }),
		});
  
		const data = await response.json();
		if (response.status === 201) {
		  alert('Utilisateur créé avec succès !');
		  return true;
		} else {
		  	alert(data.error);
			return false;
		}

	} catch (err) {
		alert('Erreur serveur');
		return false;
	}
}


const ajouterVictoire = async (nomUtilisateurFinal) => {
	const servOn = await serveurEstOn();

	if(!servOn)
	{
		return false;
	}

	try {
		const response = await fetch(ip + "/api/ajouterVictoire", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ nomUtilisateur: nomUtilisateurFinal })
		});
	}catch (error)
	{
		console.error("Erreur lors de l'envoi des données :", error);
	}
}


const ajouterDefaite = async (nomUtilisateurFinal) => {

	const servOn = await serveurEstOn();

	if(!servOn)
	{
		return false;
	}

	try {
		const response = await fetch(ip + "/api/ajouterDefaite", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ nomUtilisateur: nomUtilisateurFinal })
		});

		const data = await response.json();
        console.log("Réponse du serveur :", data);
	}catch (error)
	{
		console.error("Erreur lors de l'envoi des données :", error);
	}
}



const envoyerPlateauGagnant = async (plateau) => {

	const servOn = await serveurEstOn();

	if(!servOn)
	{
		return false;
	}

	try {
		const response = await fetch(ip + "/api/data", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(plateau)
		});
	} catch (error) {
		console.error("Erreur lors de l'envoi des données :", error);
	}
}


const recevoirPlateauGagnant = async () => {

	const servOn = await serveurEstOn();

	if(!servOn)
	{
		return null;
	}

    try {
        const response = await fetch(ip + "/api/random-data");
        const data = await response.json();

		if(data === null || data === undefined)
		{
			return null;
		}

        return new Plateau(data.data);
    } catch (error) {
        console.error("Erreur :", error);
        return null;
    }
}


export {envoyerPlateauGagnant, recevoirPlateauGagnant, serveurEstOn, creerCompte, connexionCompte, ajouterDefaite, ajouterVictoire, autoConnect, deconnexionServeur, recevoirData}