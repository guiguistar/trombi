
/* TODO:
 - restructurer la fonction creerBouton
 - mettre le code complètement en anglais
 - revoir la fonction qui désactive aléatoirement certains boutons
*/
/*
  Trombinoscope dynamique

  -balises img contenant les photos doivent être dotée de la classe photo
  -les boutons sont créés dans une div dont l'id est conteneur_boutons
  -le compteur est placé dans une div dont l'id est conteneur_compteur
*/

// Met en majuscule le premier caractère de la chaîne.
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Transforme une_chaine_de_caractères en Une Chaine De Caractères.
function underscore_delimiter_toCamelCase(chaine) {
    let tab = chaine.split("_");
    for(let i = 0; i < tab.length; i++) { tab[i] = capitalizeFirstLetter(tab[i]); }
    return tab.join(" ");
};

// Met en majuscule la lettre qui pourrait se trouver après un trait
// d'union.
function majusculeTraitUnion(chaine) {
	let index = chaine.indexOf('-');
	if ( index != -1 ) {
		index += 1;
		let c = chaine[index];
		return chaine.substr(0, index) + c.toUpperCase() + chaine.substr(index + 1)
	}
	else {
		return chaine;
	}
}

// Génère un entier aléatoire: 0 <= n < max.
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

class JeuTrombi {
    constructor() {
		this.photos = document.getElementsByClassName("photo");
		this.spanScore = document.getElementById("span_score");
		this.nombreVies = document.getElementById("nombre_vies");
		this.conteneurBoutons = document.getElementById("conteneur_boutons");
		
		this.indice = 0; // Indice aléatoire pour la photo à venir
		this.nombreTotalVies = 5;
		this.score = this.photos.length * (this.nombreTotalVies + 1) * this.nombreTotalVies / 2;
		this.nombreBoutonsADesactiver = 14;

		this.vies = this.nombreTotalVies;

		// Création du tableau de photos
		this.table = document.createElement("table");
		this.tbody = document.createElement("tbody");

		// Ligne courante à laquelle les boutons boutons seront ajoutés
		// par la fonction creerBoutons
		this.tr = document.createElement("tr");

		this.largeur = 5; // Nombre de boutons par ligne

		this.tbody.appendChild(this.tr)
		this.table.appendChild(this.tbody);
		this.conteneurBoutons.appendChild(this.table);

		this.creerBoutons();

		// Premier tirage
		this.spanScore.innerHTML = "" + this.score;
		this.nombreVies.innerHTML = "" + this.vies;
		this.indice = Math.floor(Math.random() * this.photos.length);
		this.photos[this.indice].classList.toggle("visible");
		this.majVies();
    }

	majVies() {
		let vies = [];
		let i;
		
		for (i = 0; i < this.nombreTotalVies; i++) {
			vies.push(document.getElementById("vie"+(i+1)));
		}
		// Affiche le bon nombre de coeurs.
		for (let j = 0; j < this.nombreTotalVies; j++) {
			if ( j < this.vies ) { vies[j].classList.add('visible'); }
			else                 { vies[j].classList.remove('visible'); }
		}
	}
	
    creerBoutons() {
		this.boutons = [];
		for(var i = 0; i < this.photos.length; i++) {
			//console.log(photos[i])
			var td = document.createElement("td");
			var bouton = document.createElement("input");

			var prenom_nom = this.photos[i].getAttribute("alt");
			var valeur = underscore_delimiter_toCamelCase(prenom_nom);
			valeur = majusculeTraitUnion(valeur);
				
			var that = this;
			
			bouton.setAttribute("type", "button");
			bouton.setAttribute("id", prenom_nom);
			bouton.setAttribute("value", valeur);

			this.boutons.push(bouton);
			
			bouton.addEventListener("click", function() {
				console.log("Nombre de boutons: " + that.boutons.length);
				console.log("Nombre de photos: " + that.photos.length);
				
				// Teste si le bouton cliqué correspond à la photo affichée (identifiée par
				// that.indice), auquel cas on enlève cette dernière.
				if( this.getAttribute("id") == that.photos[that.indice].getAttribute("alt") ) {
					that.photos[that.indice].remove();
					that.boutons.splice(that.indice,1); // Enleve le bouton de la liste
					this.remove(); // Enleve le bouton du DOM
					
					console.log("Il reste " + that.photos.length + " photo(s).");

					// On remet le nombre de vies à this.nombreTotalVies.
					that.vies = that.nombreTotalVies;
					
					// Teste s'il reste des photos à afficher.
					if( that.photos.length > 0 ) {
						that.indice = getRandomInt(that.photos.length);
						that.photos[that.indice].classList.toggle("visible");

						that.activerBoutons();
					}
					else {
						alert("C'est gagné!");
					}
				}
				else {
					that.vies -= 1;

					that.score -= (that.nombreTotalVies - that.vies);
					that.spanScore.innerHTML = "" + that.score;

					console.log("Il reste " + that.vies + " vies.");
					
					// Si on a plus de vie(s), on retire une nouvelle photo et
					// on remet le nombre de vies à this.nombreTotalVies.
					if ( that.vies == 0 ) {
						that.photos[that.indice].classList.toggle("visible");
						
						that.indice = getRandomInt(that.photos.length);
						that.photos[that.indice].classList.toggle("visible");

						that.vies = that.nombreTotalVies;

						that.activerBoutons();
					}
					else {
						if ( that.nombreBoutonActifs() > 2) {
							that.desactiverBoutons(that.nombreBoutonsADesactiver);
						}
					}
				}
				that.nombreVies.innerHTML = "" + that.vies;
				that.majVies();
			});
			
			td.appendChild(bouton);

			// On crée une nouvelle ligne si la ligne courante est pleine.
			if(i > 0 && i % this.largeur == 0) {
				this.tr = document.createElement("tr");
				this.tbody.appendChild(this.tr);
			}
			
			this.tr.appendChild(td);
		};		
    }
	// Active tous les boutons.
	activerBoutons() {
		this.boutons.forEach(function(b) { b.removeAttribute('disabled'); });
	}
	nombreBoutonActifs() {
		let n = 0;
		this.boutons.forEach(function(b) { if(!b.hasAttribute('disabled')) { n += 1; } });
		return n;
	}
	// Retourne le nombre de boutons actifs.
	nombreBoutonsActifs() {
		let n = 0;
		this.boutons.forEach(function(bouton) {
			if ( !bouton.hasAttribute('disabled') ) {
				n += 1;
			}
		});
		
		return n;					
	}
	desactiverBouton() {
		let n = this.nombreBoutonsActifs();
		let i = getRandomInt(n);

		while ( n > 0 && this.boutons[i].hasAttribute('disabled') ) {
			i = ( i + 1 ) % this.boutons.length;
		}
		if ( i != this.indice ) {
			console.log("Désactivation du bouton " + i + ", indice de la photo: " + this.indice + ".");
			this.boutons[i].setAttribute('disabled', '');
		}
	}
	// Désactive aléatoirement un certain nombre de boutons.
	desactiverBoutons(nombre) {
		for ( let i = 0; i < nombre; i++ ) { this.desactiverBouton(); }
	}
};

/*
(function() {
    var jeu = new JeuTrombi();
	jeu.desactiverBoutons(10);
})();
*/

var jeu = new JeuTrombi();
