window.addEventListener("DOMContentLoaded", (event) => {
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


  var total_retard = 0;

  for (var c of results) {
      total_retard += c

  }

  console.log(total_retard);

  //critère 1 minimiser le plus grand retard
  // let tachesDuree = taches.sort((a, b) => {
  //   return a.duree - b.duree;
  // });

  // let tachesSorted = tachesDuree.sort((a, b) => {
  //   return a.delai - b.delai;
  // });

  // console.log(tachesDuree);

  // console.log(tachesSorted)

  // var Pi = 0;
  // var Fi = 0;
  // var Di = 0;
  // var R = 0;

  // results = [];

  
  // for (var t of tachesSorted) {
  //   Pi = t.duree;
  //   Fi += Pi;
  //   Di = t.delai;
  //   // R = Fi - Di;

  //   if (R < 0) {
  //     R += Fi - Di;
  //   } else {
  //     R = Fi - Di;
  //   }

  //   results.push(R);
  // }



  // console.log(results);

  // var total_retard = 0;

  // for (var chiffre of results) {
  //   if(chiffre > total_retard){
  //     total_retard = chiffre
  //   }
  // }

  // console.log(total_retard);

  // var divretard = document.getElementById("retard");
  // divretard.innerHTML = total_retard;

//critère 2 minimiser le retard moyen


// let tachesDuree = taches.sort((a, b) => {
//   return a.duree - b.duree;
// });

// let tachesSorted = tachesDuree.sort((a, b) => {
//   return a.delai - b.delai;
// });

// console.log(tachesDuree);

// console.log(tachesSorted)

// var Pi = 0;
// var Fi = 0;
// var Di = 0;
// var R = 0;

// results = [];


// for (var t of tachesSorted) {
//   Pi = t.duree;
//   Fi += Pi;
//   Di = t.delai;
//   // R = Fi - Di;

//   if (R < 0) {
//     R += Fi - Di;
//   } else {
//     R = Fi - Di;
//   }

//   results.push(R);
// }



// console.log(results);

// var total_retard = 0;

// for (var chiffre of results) {
//     total_retard += chiffre

// }

// var moyenne = total_retard / results.length


// console.log(moyenne);

// var divretard = document.getElementById("retard");
// divretard.innerHTML = total_retard;

  //critère 3 minimiser la somme des retards


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

  console.log(total_retard);

  var divretard = document.getElementById("retard");
  divretard.innerHTML = total_retard;

    





  
  


});
