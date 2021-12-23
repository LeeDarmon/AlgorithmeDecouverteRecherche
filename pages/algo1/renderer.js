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


  console.log(taches);

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

  console.log(results);

var moyenne = 0

for(i = 0;i<results.length;i++){
  moyenne += results[i];
}

moyenne = moyenne/results.length;

console.log(moyenne);

    
// var R2_1 = (taches[1].duree - taches[1].delai)  - (taches[0].duree - taches[0].delai);
// var R1_2 = results[0] - results[1];

var moyenne2 = moyenne +1;

while(moyenne2 > moyenne){
for(let i = 0;i<(taches.length-1);i++){

  var R2_1 = (taches[i+1].duree - taches[i+1].delai)  - (taches[i].duree - taches[i].delai);
  var R1_2 = results[i] - results[i+1];

  if(R2_1 < R1_2){
    console.log('R2_1 > R1_2');
    console.log(R2_1,R1_2);
    var A = taches[i];
    taches[i] = taches[i+1];
    taches[i+1] = A;
  


    Pi = taches[i].duree;
    Fi += Pi;
    Di = taches[i].delai;
    // R = Fi - Di;


    if (R < 0) {
      R += Fi - Di;
    } else {
      R = Fi - Di;
    }
    results[i] = R;

    Pi = taches[i+1].duree;
    Fi += Pi;
    Di = taches[i+1].delai;
    // R = Fi - Di;


    if (R < 0) {
      R += Fi - Di;
    } else {
      R = Fi - Di;
    }
    results[i+1] = R;
  }
  
  for(i = 0;i<results.length;i++){
    moyenne2 += results[i];
  }
  moyenne2 = moyenne2/results.length;
  console.log(moyenne2);  


}



}

 



  
  


});
