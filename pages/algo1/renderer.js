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

// var moyenne2 = moyenne +1;

// while(moyenne2 > moyenne){
// for(let i = 0;i<(taches.length-1);i++){

//   var R2_1 = (taches[i+1].duree - taches[i+1].delai)  - (taches[i].duree - taches[i].delai);
//   var R1_2 = results[i] - results[i+1];

//   if(R2_1 < R1_2){
//     console.log('R2_1 > R1_2');
//     console.log(R2_1,R1_2);
//     var A = taches[i];
//     taches[i] = taches[i+1];
//     taches[i+1] = A;
  


//     Pi = taches[i].duree;
//     Fi += Pi;
//     Di = taches[i].delai;
//     // R = Fi - Di;


//     if (R < 0) {
//       R += Fi - Di;
//     } else {
//       R = Fi - Di;
//     }
//     results[i] = R;

//     Pi = taches[i+1].duree;
//     Fi += Pi;
//     Di = taches[i+1].delai;
//     // R = Fi - Di;


//     if (R < 0) {
//       R += Fi - Di;
//     } else {
//       R = Fi - Di;
//     }
//     results[i+1] = R;
//   }
  
//   for(i = 0;i<results.length;i++){
//     moyenne2 += results[i];
//   }
//   moyenne2 = moyenne2/results.length;
//   console.log(moyenne2);  


// }



// }

//test
var tabOrder = [];
 
function calculRetard(tache){
  index = tache.id;

  var M0 = 0
  var M1 = 0
  var M2 = 0
  var M3 = 0
  var tabMoyenneTache = [];




  if(index == 1){
    M0 = (taches[1].duree - taches[1].delai)  - (taches[0].duree - taches[0].delai);
    M1 = (taches[2].duree - taches[2].delai)  - (taches[0].duree - taches[0].delai);
    M2 = (taches[3].duree - taches[3].delai)  - (taches[0].duree - taches[0].delai);
    M3 = (taches[4].duree - taches[4].delai)  - (taches[0].duree - taches[0].delai);

    tabMoyenneTache.push(M0,M1,M2,M3);

    var min = Math.min.apply(Math, tabMoyenneTache);

    if(min == M0){
      console.log('tache1 avec tache 2')
      ajdtache1 =  {
        tache : 1,
        adj : 2
    }
    }
    else if(min == M1){
      console.log('tache1 avec tache 3')
      ajdtache1 =  {
        tache : 1,
        adj : 3
    }
    }
    else if(min == M2){
      console.log('tache1 avec tache 4')
      ajdtache1 =  {
        tache : 1,
        adj : 4
    }
    }
    else if(min == M3){
      console.log('tache1 avec tache 5')
      ajdtache1 =  {
        tache : 1,
        adj : 5
    }
    }

    
  }

  if(index == 2){
    M0 = (taches[0].duree - taches[0].delai)  - (taches[1].duree - taches[1].delai);
    M1 = (taches[2].duree - taches[2].delai)  - (taches[1].duree - taches[1].delai);
    M2 = (taches[3].duree - taches[3].delai)  - (taches[1].duree - taches[1].delai);
    M3 = (taches[4].duree - taches[4].delai)  - (taches[1].duree - taches[1].delai);

    tabMoyenneTache.push(M0,M1,M2,M3);

    var min = Math.min.apply(Math, tabMoyenneTache);

    if(min == M0){
      console.log('tache2 avec tache 1')
      ajdtache2 =  {
        tache : 2,
        adj : 1
    }
    }
    else if(min == M1){
      console.log('tache2 avec tache 3')
      ajdtache2 =  {
        tache : 2,
        adj : 3
    }
    }
    else if(min == M2){
      console.log('tache2 avec tache 4')
      ajdtache2 =  {
        tache : 2,
        adj : 4
    }
    }
    else if(min == M3){
      console.log('tache2 avec tache 5')
      ajdtache2 =  {
        tache : 2,
        adj : 5
    }
    }

    
  }

  if(index == 3){
    M0 = (taches[1].duree - taches[1].delai)  - (taches[2].duree - taches[2].delai);
    M1 = (taches[0].duree - taches[0].delai)  - (taches[2].duree - taches[2].delai);
    M2 = (taches[3].duree - taches[3].delai)  - (taches[2].duree - taches[2].delai);
    M3 = (taches[4].duree - taches[4].delai)  - (taches[2].duree - taches[2].delai);

    tabMoyenneTache.push(M0,M1,M2,M3);

    var min = Math.min.apply(Math, tabMoyenneTache);

    if(min == M0){
      console.log('tache3 avec tache 1')
      ajdtache3 =  {
        tache : 3,
        adj : 1
    }
    }
    else if(min == M1){
      console.log('tache3 avec tache 2')
      ajdtache3 =  {
        tache : 3,
        adj : 2
    }
    }
    else if(min == M2){
      console.log('tache3 avec tache 4')
      ajdtache3 =  {
        tache : 3,
        adj : 4
    }
    }
    else if(min == M3){
      console.log('tache3 avec tache 5')
      ajdtache3 =  {
        tache : 3,
        adj : 5
    }
    }

    
  }

  if(index == 4){
    M0 = (taches[1].duree - taches[1].delai)  - (taches[3].duree - taches[3].delai);
    M1 = (taches[2].duree - taches[2].delai)  - (taches[3].duree - taches[3].delai);
    M2 = (taches[0].duree - taches[0].delai)  - (taches[3].duree - taches[3].delai);
    M3 = (taches[4].duree - taches[4].delai)  - (taches[3].duree - taches[3].delai);

    tabMoyenneTache.push(M0,M1,M2,M3);

    var min = Math.min.apply(Math, tabMoyenneTache);

    if(min == M0){
      console.log('tache4 avec tache 2')
      ajdtache4 =  {
        tache : 4,
        adj : 2
    }
    }
    else if(min == M1){
      console.log('tache4 avec tache 3')
      ajdtache4 =  {
        tache : 4,
        adj : 3
    } 
    }
    else if(min == M2){
      console.log('tache4 avec tache 1')
      ajdtache4 =  {
        tache : 4,
        adj : 1
    }
    }
    else if(min == M3){
      console.log('tache4 avec tache 5')
      ajdtache4 =  {
        tache : 4,
        adj : 5
    }
    }

    
  }

  if(index == 5){
    M0 = (taches[1].duree - taches[1].delai)  - (taches[4].duree - taches[4].delai);
    M1 = (taches[2].duree - taches[2].delai)  - (taches[4].duree - taches[4].delai);
    M2 = (taches[3].duree - taches[3].delai)  - (taches[4].duree - taches[4].delai);
    M3 = (taches[0].duree - taches[0].delai)  - (taches[4].duree - taches[4].delai);

    tabMoyenneTache.push(M0,M1,M2,M3);

    var min = Math.min.apply(Math, tabMoyenneTache);

    if(min == M0){
      console.log('tache5 avec tache 2')
      ajdtache5 =  {
        tache : 5,
        adj : 2
    }
    }
    else if(min == M1){
      console.log('tache 5 avec tache 3')
      ajdtache5 =  {
        tache : 5,
        adj : 3
    }
    }
    else if(min == M2){
      console.log('tache5 avec tache 4')
      ajdtache5 =  {
        tache : 5,
        adj : 4
    }
    }
    else if(min == M3){
      console.log('tache5 avec tache 1')
      ajdtache5 =  {
        tache : 5,
        adj : 1
    }
      
    }



    tabOrder.push(ajdtache1,ajdtache2,ajdtache3,ajdtache4,ajdtache5);
    console.log(tabOrder)

    for (var o of tabOrder) {
      for (var u of tabOrder) {
        if(o.tache === u.adj && o.adj === u.tache){
          console.log('la tache' + o.tache + 'est adj avec la tache' + u.tache)
        }
      
      }
    }

    
  }







}
for (var t of taches) {
  calculRetard(t);
}





  
  


});
