
  class tache {
    constructor(id,duree, delai) {
      this.id = id;
        this.duree = duree;
        this.delai = delai;
    }
  }

  min = 1;
  max = 10;

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var taches = [];
  var divTache = [];

  for (var i = 0; i < 5; i++) {
    taches.push(new tache(i+1,getRandomIntInclusive(min, max), getRandomIntInclusive(min, max)));
    divTache.push({
        tache : document.getElementById(`tache${i+1}`),
        delai : document.getElementById(`Delaitache${i+1}`)
    });
    divTache[i].tache.innerHTML = taches[i].duree;
    divTache[i].delai.innerHTML = taches[i].delai;
  }

  var Pi = 0;
  var Fi = 0;
  var Di = 0;
  var R = 0;

  var total_retard = 0;
  var somme_retard_initial = 0;

  results = [];

  
  for (var t of taches) {
    Pi = t.duree;
    Fi += Pi;
    Di = t.delai;
    // R = Fi - Di;

    if (R < 0) {
      R += Fi - Di;
    } else {
      R = Fi - Di;
    }

    results.push(R);
  }

  console.log(results)


  for (var c of results) {
    somme_retard_initial += c

  }

  for (var chiffre of results) {
    if(chiffre > total_retard){
      greater_retard_initial = chiffre
    }
  }

  var moyenne = somme_retard_initial / results.length

  var div_somme_retard_initial = document.getElementById("somme_retard_initial");
  div_somme_retard_initial.innerHTML = somme_retard_initial;

  var div_greater_retard_initial = document.getElementById("greater_retard_initial");
  div_greater_retard_initial.innerHTML = greater_retard_initial;

  var div_moyenne_retard_initial = document.getElementById("moyenne_retard_initial");
  div_moyenne_retard_initial.innerHTML = moyenne;

  //critère 1 minimiser le plus grand retard
  function Critere1(){
    let tachesDuree = taches.sort((a, b) => {
      return a.duree - b.duree;
    });
  
    let tachesSorted = tachesDuree.sort((a, b) => {
      return a.delai - b.delai;
    });
  
    console.log(tachesDuree);
  
    console.log(tachesSorted)
  
    var Pi = 0;
    var Fi = 0;
    var Di = 0;
    var R = 0;
  
    results = [];
  
    
    for (var t of tachesSorted) {
      Pi = t.duree;
      Fi += Pi;
      Di = t.delai;
      // R = Fi - Di;
  
      if (R < 0) {
        R += Fi - Di;
      } else {
        R = Fi - Di;
      }
  
      results.push(R);
    }
  
  
  
    console.log(results);
  
    var total_retard = 0;
  
    for (var chiffre of results) {
      if(chiffre > total_retard){
        total_retard = chiffre
      }
    }
  
    console.log(total_retard);
  
    var divretard = document.getElementById("retard_final");
    divretard.innerHTML = total_retard;
  }
 

//critère 2 minimiser le retard moyen

function critere2(){
  let tachesDuree = taches.sort((a, b) => {
    return a.duree - b.duree;
  });
  
  let tachesSorted = tachesDuree.sort((a, b) => {
    return a.delai - b.delai;
  });
  
  console.log(tachesDuree);
  
  console.log(tachesSorted)
  
  var Pi = 0;
  var Fi = 0;
  var Di = 0;
  var R = 0;
  
  results = [];
  
  
  for (var t of tachesSorted) {
    Pi = t.duree;
    Fi += Pi;
    Di = t.delai;
    // R = Fi - Di;
  
    if (R < 0) {
      R += Fi - Di;
    } else {
      R = Fi - Di;
    }
  
    results.push(R);
  }
  
  
  
  console.log(results);
  
  var total_retard = 0;
  
  for (var chiffre of results) {
      total_retard += chiffre
  
  }
  
  var moyenne_c2 = total_retard / results.length
  
  
  console.log(moyenne_c2);

  var divretard = document.getElementById("retard_final");
divretard.innerHTML = moyenne_c2;
}




  //critère 3 minimiser la somme des retards
function critere3(){
  let tachesDuree = taches.sort((a, b) => {
    return a.duree - b.duree;
  });

console.log(tachesDuree)


  var Pi = 0;
  var Fi = 0;
  var Di = 0;
  var R = 0;

  results = [];

  
  for (var t of tachesDuree) {
    Pi = t.duree;
    Fi += Pi;
    Di = t.delai;
    // R = Fi - Di;

    if (R < 0) {
      R += Fi - Di;
    } else {
      R = Fi - Di;
    }

    results.push(R);
  }



  console.log(results);

  var total_retard = 0;

  for (var chiffre of results) {
      total_retard += chiffre

  }

  console.log(total_retard);

  var divretard = document.getElementById("retard_final");
  divretard.innerHTML = total_retard;
}



 

    





  
  



