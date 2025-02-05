import { useState } from "react";
import { Plateau } from "./Plateau";


//IP du serveur
const ip = "https://serveur-solitaire-react-production.up.railway.app";

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


export {envoyerPlateauGagnant, recevoirPlateauGagnant, serveurEstOn}