import React, {Component} from 'react';

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
            case "Trefle" : this.couleur = "black"; this.imgSymbole.src = '/images/Trefle.png'; break;
            case "Pique"  : this.couleur = "black"; this.imgSymbole.src = '/images/Pique.png';  break;
            case "Coeur"  : this.couleur = "red"  ; this.imgSymbole.src = '/images/Coeur.png';  break;
            case "Carreau": this.couleur = "red"  ; this.imgSymbole.src = '/images/Carreau.png';break;
        }

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

}

export default Carte