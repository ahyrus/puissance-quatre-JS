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
  verification(this);
}

var verification = function(jeton){
  //verifie si le joueur gagne

  var listeJetons = document.getElementsByClassName("case");
  var sousListe = Array.from(listeJetons);
  var indice = sousListe.indexOf(jeton) //permet de faire division euclidienne et trouver la sous liste qu'est la ligne où est le jeton
              //explorer ligne à la recherche de puissance4
              //FAIRE PAREIL POUR LE HAUT ET LE BAS
  console.log(indice);
  /*sousListe = sousListe.slice()
  var ligne = listeJetons.slice()*/

}
