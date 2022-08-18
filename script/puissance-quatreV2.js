var setupListeners = function(){
  listeJetons = document.getElementsByClassName("case");
  listeJetons = Array.from(listeJetons);

  for (let i=0; i<nbLignes; i++){
    plateauJeu.push(listeJetons.slice(i*7,i*7+7));
  }

  let numLigne = -1;
  for (var i=0; i<listeJetons.length; i++){
    listeJetons[i].innerHTML = i;
    if (i%7 == 0){
      numLigne ++;
    }
    listeJetons[i].setAttribute('colonne', i%7);
    listeJetons[i].setAttribute('ligne', numLigne);
    listeJetons[i].addEventListener('click', ajout);
  }
};
window.addEventListener('load',setupListeners);

var tour = "rouge";
var plateauJeu = [];
const nbLignes = 6;
const nbColonnes = 7;

var listeJetons;
var listeColonnesPleines = Array(7).fill(false);


var ajout = function(){
  let numLigne = parseInt(this.getAttribute('ligne'));
  let numColonne = parseInt(this.getAttribute('colonne'));
  let debutColonne = plateauJeu[0][numColonne].getAttribute('jeton');

  //retourne en haut colonne et descend au fur et à mesure
  if (['jaune','rouge'].includes(debutColonne)){
    alert("Colonne pleine ! Essaie en une autre");
    return;
  }
  let i = 0;
  while ((i<5) && !(['jaune','rouge'].includes(plateauJeu[i+1][numColonne].getAttribute('jeton')))){
    i++;
  }
  plateauJeu[i][numColonne].setAttribute('jeton',tour);

  if (!listeColonnesPleines[numColonne]){ //change le tour que si la colonne est pas déjà remplie
    if (tour == 'jaune'){
      tour = 'rouge';
    }
    else{
      tour = 'jaune';
    }
  }
  if (i == 0){                    //met true car la colonne est remplie
    listeColonnesPleines[numColonne] = true;
  }
  verifiPlateauRempli();
  let coordonnees = [i,numColonne];
  verifColonne(numColonne);
  verifLigne(i);
  verifDiagonaleDroite(coordonnees);
  verifDiagonaleGauche(coordonnees);
} //REFAIRE AVEC lastIndexOf() ???



var verifColonne = function(numColonne){
  let jetonsColonne = [];

  for (let i=0; i<nbLignes; i++){
    jetonsColonne.push(plateauJeu[i][numColonne].getAttribute('jeton'));
  }

  verifGagne(jetonsColonne);
}
var verifLigne = function(numLigne){
  let jetonsLigne = [];

  for (let i=0; i<nbColonnes; i++){
    jetonsLigne.push(plateauJeu[numLigne][i].getAttribute('jeton'));
  }

  verifGagne(jetonsLigne);
}

var verifDiagonaleDroite = function(co){
  let debutDiagonale = 0;    //cherche le début de la diagonale
  if ((co[0] + co[1]) < 6){
    debutDiagonale = co[0] + co[1];
  }
  else {
    debutDiagonale = co[0] + co[1] + 6*((co[0] + co[1])%6)
  }

  let numLigne = ~~(debutDiagonale/7);
  let numColonne = debutDiagonale%7;
  let diagonale = [];

  while ((numLigne<6) && (numColonne>-1)){  //explore en diagonale d'en haut à droite vers en bas à gauche
    diagonale.push(plateauJeu[numLigne][numColonne].getAttribute('jeton'));
    numLigne++;
    numColonne--;
  }
  verifGagne(diagonale);
}

//numLigne *7
//41-x = 7*(diag%6)
var verifDiagonaleGauche = function(co){
  co[0] = 5 - co[0];
  let debutDiagonale = 0;    //cherche le début de la diagonale
  if ((co[0] + co[1]) < 7){
    debutDiagonale = co[0] + co[1] + 35;
  }
  else {
    debutDiagonale = 41 - 7*((co[0] + co[1])%6);
  }
  console.log(co[0], co[1], co[0]+co[1], debutDiagonale);

  let numLigne = ~~(debutDiagonale/7);
  let numColonne = debutDiagonale%7;
  let diagonale = [];
  while ((numLigne>-1) && (numColonne>-1)){  //explore en diagonale d'en bas à droite vers en haut à gauche
    diagonale.push(plateauJeu[numLigne][numColonne].getAttribute('jeton'));
    numLigne--;
    numColonne--;
  }
  verifGagne(diagonale);
}








var verifGagne = function(liste){
  liste = liste.join('');
  if (liste.includes(['jaunejaunejaunejaune'])){
    alert('JAUNE gagne !');
    document.location.reload();
  }
  else if (liste.includes(['rougerougerougerouge'])){
    alert('Rouge gagne !');
    document.location.reload();
  }
}
var verifiPlateauRempli = function(){
  if (listeColonnesPleines.every(v => v === true)){
    alert("Plateau rempli ! Il y a égalité !")
    document.location.reload();
  }
}

//POUR COLONNES : faire for avec plateau[numColonne][i]

//ajout jeton : en bas d'une colonne, donc vérifie si c'est possible
//verifier si tout plateauJeu rempli => alert() + recharger page
//verifi s'il y a un puisance4 dans 8 directions, annonce le gagnant si oui
//sinon passe au joueur suivant
