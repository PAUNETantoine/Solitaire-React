import Carte from "./Carte"

class Plateau 
{

    constructor()
    {
        this.cartes                     = this.initCartes();
        this.tabColonnes                = [];
        this.tabFin                     = [[],[],[],[]]
        this.cartePiocheSelectionne     = null;
        this.carteColonnesSelectionne   = null;
        this.carteFinSelectionne        = null;
        this.cartePiocheEstSelectionne  = false;
    }

    /*Méthode permettant d'initialiser les cartes du deck*/
    initCartes()
    {
        let tempTabCartes = [];

        for(let j = 1 ; j < 14 ; j++)
        {
            let nom;

            switch(j)
            {
                case 1      : nom = "A";    break
                case 11     : nom = "J"; break;
                case 12     : nom = "Q"; break;
                case 13     : nom = "K";   break;
                default     : nom = j;       break;

            }

            tempTabCartes.push(new Carte(nom, j, "Coeur",   false));
            tempTabCartes.push(new Carte(nom, j, "Trefle",  false));
            tempTabCartes.push(new Carte(nom, j, "Pique",   false));
            tempTabCartes.push(new Carte(nom, j, "Carreau", false));
        }

        return tempTabCartes;
    }


    /*Méthode permettant de mélanger les cartes du deck et de les placer dans la pioche et dans les colonnes*/
    melangerCartes()
    {
        for (let i = this.cartes.length - 1; i > 0; i--) 
        {
            // Générer un index aléatoire entre 0 et i
            const j = Math.floor(Math.random() * (i + 1));
    
            // Échanger les éléments tableau[i] et tableau[j]
            [this.cartes[i], this.cartes[j]] = [this.cartes[j], this.cartes[i]];
        }
        
        // Initialiser les sous-tableaux pour chaque colonne
        for (let i = 0; i < 7; i++) 
        {
            this.tabColonnes[i] = [];
        }


        //Mise en place des colonnes
        let index = 0;
        for(let i = 0 ; i < 7 ; i++)
        {
            for(let j = 0 ; j < i+1 ; j++)
            {
                if(index < 28)
                {
                    this.tabColonnes[i].push(this.cartes.pop());
                    index++;
                }                
            }
            this.tabColonnes[i][0].setEstRetournee(true);
        }

    }


    ajouterCartePile(carte)
    {
        switch(carte.getNom())
        {
            case "Coeur" : 
            {
                if(this.tabFin[0].length === 0)
                {
                    if(carte.getNombre() === 1)
                    {
                        this.tabFin[0][0] = carte;
                        return;
                    }
                }else{
                    if(carte.getNombre() === this.tabFin[0][carte.getNombre()-1] + 1)
                    {
                        this.tabFin[0][carte.getNombre()] = carte;
                        return;
                    }
                }
                break;
            }

            case "Carreau" : 
            {
                if(this.tabFin[1].length === 0)
                {
                    if(carte.getNombre() === 1)
                    {
                        this.tabFin[1][0] = carte;
                        return;
                    }
                }else{
                    if(carte.getNombre() === this.tabFin[1][carte.getNombre()-1] + 1)
                    {
                        this.tabFin[1][carte.getNombre()] = carte;
                        return;
                    }
                }
                break;
            }

            case "Trefle" : 
            {
                if(this.tabFin[2].length === 0)
                {
                    if(carte.getNombre() === 1)
                    {
                        this.tabFin[2][0] = carte;
                        return;
                    }
                }else{
                    if(carte.getNombre() === this.tabFin[2][carte.getNombre()-1] + 1)
                    {
                        this.tabFin[2][carte.getNombre()] = carte;
                        return;
                    }
                }
                break;
            }

            case "Pique" : 
            {
                if(this.tabFin[3].length === 0)
                {
                    if(carte.getNombre() === 1)
                    {
                        this.tabFin[3][0] = carte;
                        return;
                    }
                }else{
                    if(carte.getNombre() === this.tabFin[3][carte.getNombre()-1] + 1)
                    {
                        this.tabFin[3][carte.getNombre()] = carte;
                        return;
                    }
                }
                break;
            }
        }
    }

    getIndexColonneCarte(carte)
    {
        for(let i = 0 ; i < this.tabColonnes.length ; i++)
        {
            for(let j = 0 ; j < this.tabColonnes[i].length ; j++)
            {
                if(carte === this.tabColonnes[i][j])
                {
                    return i;
                }
            }
        }
    }

    getIndexLigneCarte(carte)
    {
        for(let i = 0 ; i < this.tabColonnes.length ; i++)
        {
            for(let j = 0 ; j < this.tabColonnes[i].length ; j++)
            {
                if(carte === this.tabColonnes[i][j])
                {
                    return j;
                }
            }
        }
    }

    getIndexFinCarte(carte)
    {
        for(let i = 0 ; i < this.tabFin.length ; i++)
        {
            for(let j = 0 ; j < this.tabFin[i].length ; j++)
            {
                if(carte === this.tabFin[i][j])
                {
                    return i;
                }
            }
        }
    }


    setCarteColonneSelectionne(carte)
    {
        this.carteColonnesSelectionne = carte;
    }

    setCartePiocheSelectionne(carte)
    {
        this.cartePiocheSelectionne = carte;
    }

    setCarteFinSelectionne(carte)
    {
        this.carteFinSelectionne = carte;
    }

    setCartePiocheEstSelectionne(bool)
    {
        this.cartePiocheEstSelectionne = bool;
    }

    getCarteColonneSelectionne()
    {
        return this.carteColonnesSelectionne;
    }

    getCartePiocheSelectionne()
    {
        return this.cartePiocheSelectionne;
    }

    getCarteFinSelectionne()
    {
        return this.carteFinSelectionne;
    }

    getCartePiocheEstSelectionne()
    {
        return this.cartePiocheEstSelectionne;
    }


}

export { Plateau };