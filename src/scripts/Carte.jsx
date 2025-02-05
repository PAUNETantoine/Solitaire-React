/*
@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
File : Class carte
*/

class Carte{

    constructor(nom, nombre, forme, estRetournee)
    {
        if(nom instanceof Carte || nom instanceof Object) //Constructeur par recopie
        {
            this.nom            = nom.nom;
            this.nombre         = nom.nombre;
            this.forme          = nom.forme;
            this.estRetournee   = nom.estRetournee;
            this.x              = nom.x;
            this.y              = nom.y;
        
            switch(this.forme)
            {
                case "Trefle" : this.couleur = "black"; break;
                case "Pique"  : this.couleur = "black"; break;
                case "Coeur"  : this.couleur = "red"  ; break;
                case "Carreau": this.couleur = "red"  ; break;
            }
    
            this.estMouvement  = false; //Si jamais on déplace la carte elle devient true ( permet de passer les cartes au dessus dans le dessin de la frame )

            return;
        }

        this.nom            = nom;
        this.nombre         = nombre;
        this.forme          = forme;
        this.estRetournee   = estRetournee;
        this.x              = 0;
        this.y              = 0;

        switch(this.forme)
        {
            case "Trefle" : this.couleur = "black"; break;
            case "Pique"  : this.couleur = "black"; break;
            case "Coeur"  : this.couleur = "red"  ; break;
            case "Carreau": this.couleur = "red"  ; break;
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