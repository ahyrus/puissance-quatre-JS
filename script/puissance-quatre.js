var setupListeners = function(){
  var listeJetons = document.getElementsByClassName("case");
  for (var i=0; i<listeJetons.length; i++){
    listeJetons[i].addEventListener('click', clique);
    listeJetons[i].innerHTML = i;
  }
  listeJetons = document.getElementsByClassName("case");
  sousListe = Array.from(listeJetons);
};
window.addEventListener('load',setupListeners);

var tour = "rouge";
var listeJetons;
var sousListe;


var clique = function(){
  if (tour == "rouge"){
    this.setAttribute("jeton", "rouge");
    tour = "jaune";
  }
  else {
    this.setAttribute("jeton", "jaune");
    tour = "rouge";
  }
  this.removeEventListener('click', clique);

  if (placementPossible(this)){

    /*verifDiagonaleGauche(this);
    verifDiagonaleDroite(this);*/
  }
  verifLigne(this);
  verifColonne(this);
};


var verifLigne = function(jeton){
  let indice = sousListe.indexOf(jeton);
  sousListeJetons = sousListe.slice(~~(indice/7)*7,~~(indice/7)*7+7);

  let compteur = calculCompteur(sousListeJetons);
  verifVictoire(compteur);
};
var verifColonne = function(jeton){
  let indice = sousListe.indexOf(jeton);
  let numeroColonne = indice - ~~(indice/7)*7;

  let colonne = []
  for(let i=numeroColonne; i<=sousListe.length; i+=7){
    colonne.push(sousListe[i]);
  };

  let compteur = calculCompteur(colonne);
  verifVictoire(compteur);
};
var verifDiagonaleDroite = function(jeton){
  // si modulo 6 = 0, alors c'est à la fin d'une ligne ?
  // nombre = 6-indice%6 ?
  let indice = sousListe.indexOf(jeton);
  let numeroLigne = ~~(indice/7);
  let numeroColonne = indice - ~~(indice/7)*7;;
  numeroDiagonale = numeroLigne + numeroColonne;

  let debutDiagonale = 0; //??
  if (numeroDiagonale < 6){ //??
    debutDiagonale = numeroDiagonale + 1; //??
  }
  else {
    debutDiagonale = numeroDiagonale + 6*(numeroDiagonale%6) //??
  }
  //boucle MAIS IL FAUT TROUVER CONDITION D'ARRET || trouver comment obtenir le fait que (38-20)/6 = nombre lignes à faire
  //0 1 2 3 4 5 5 4 3 2 1 0
};





var placementPossible = function(jeton){

}



var calculCompteur = function(liste){
  let compteur = []
  for (let i = 0; i<liste.length-1; i++){
    if (liste[i].getAttribute("jeton") == "jaune"){
      compteur.push('j');
    }
    else if (liste[i].getAttribute("jeton") == "rouge"){
      compteur.push('r');
    }
  }
  return compteur;
}
var verifVictoire = function(compteur){
  compteur = compteur.join('');
  if (compteur.indexOf('jjjj') != -1) {
    alert("JAUNE gagne, c'est fini !");
  }
  else if (compteur.indexOf('rrrr') != -1) {
    alert("ROUGE gagne, c'est fini !");
  }
}
