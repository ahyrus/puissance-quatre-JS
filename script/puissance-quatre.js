var setupListeners = function(){
  var listeJetons = document.getElementsByClassName("case");
  for (var i=0; i<listeJetons.length; i++){
    listeJetons[i].addEventListener('click', clique);
    listeJetons[i].innerHTML = i;
  }
};
window.addEventListener('load',setupListeners);

var tour = "rouge";

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
  verifLigne(this);
  verifColonne(this);
};

var verifLigne = function(jeton){
  let listeJetons = document.getElementsByClassName("case");
  let sousListe = Array.from(listeJetons);
  let indice = sousListe.indexOf(jeton)
  sousListe = sousListe.slice(~~(indice/7)*7,~~(indice/7)*7+7)

  let compteur = [];
  for (let i = 0; i<sousListe.length; i++){
    if (sousListe[i].getAttribute("jeton") == "jaune"){
      compteur.push('j');
    }
    else if (sousListe[i].getAttribute("jeton") == "rouge"){
      compteur.push('r');
    }
  }
  compteur = compteur.join('');
  if (compteur.indexOf('jjjj') != -1) {
    alert("ROUGE gagne, c'est fini !");
  }
  else if (compteur.indexOf('rrrr') != -1) {
    alert("ROUGE gagne, c'est fini !");
  }
};




var verifColonne = function(jeton){
  let listeJetons = document.getElementsByClassName("case");
  let sousListe = Array.from(listeJetons);
  let indice = sousListe.indexOf(jeton)

  let numeroColonne = indice - ~~(indice/7)*7;

  let colonne = []
  for(i = numeroColonne; i <= sousListe.length; i += 7){
    colonne.push(sousListe[i]);
  };

  let compteur = [];
  for (let i = 0; i<colonne.length; i++){
    if (colonne[i].getAttribute("jeton") == "jaune"){
      compteur.push('j');
    }
    else if (colonne[i].getAttribute("jeton") == "rouge"){
      compteur.push('r');
    }
  }
  compteur = compteur.join('');
  if (compteur.indexOf('jjjj') != -1) {
    alert("ROUGE gagne, c'est fini !");
  }
  else if (compteur.indexOf('rrrr') != -1) {
    alert("ROUGE gagne, c'est fini !");
  }
};
