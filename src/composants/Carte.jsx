/*
@author : Antoine PAUNET
Version : 0.9 Beta
Date    : 27/01/25
--------------------
File : Class carte
*/

class Carte{

    constructor(nom, nombre, forme, estRetournee)
    {
        this.nom            = nom;
        this.nombre         = nombre;
        this.forme          = forme;
        this.estRetournee   = estRetournee;
        this.x              = 0;
        this.y              = 0;

        this.imgSymbole       = new Image();

        switch(this.forme)
        {
            case "Trefle" : this.couleur = "black"; this.imgSymbole.src = process.env.PUBLIC_URL + '/images/Trefle.png'; break;
            case "Pique"  : this.couleur = "black"; this.imgSymbole.src = process.env.PUBLIC_URL + '/images/Pique.png';  break;
            case "Coeur"  : this.couleur = "red"  ; this.imgSymbole.src = process.env.PUBLIC_URL + '/images/Coeur.png';  break;
            case "Carreau": this.couleur = "red"  ; this.imgSymbole.src = process.env.PUBLIC_URL + '/images/Carreau.png';break;
        }

        this.estMouvement  = false; //Si jamais on déplace la carte elle devient true ( permet de passer les cartes au dessus dans le dessin de la frame )

    }


    setX(x)
    {
        this.x = x;
    }

    setY(y)
    {
        this.y = y;
    }

    getX()
    {
        return this.x;
    }

    getY()
    {
        return this.y;
    }

    getNom()
    {
        return this.nom;
    }

    getForme()
    {
        return this.forme;
    }

    getNombre()
    {
        return this.nombre;
    }

    getEstRetournee()
    {
        return this.estRetournee;
    }

    setEstRetournee(bool)
    {
        this.estRetournee = bool;
    }

    getCouleur()
    {
        return this.couleur;
    }

    getEstMouvement()
    {
        return this.estMouvement;
    }

    setEstMouvement(bool)
    {
        this.estMouvement = bool;
    }

}

export default Carte