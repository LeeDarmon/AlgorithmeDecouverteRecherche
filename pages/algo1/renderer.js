class tache {
    constructor(id, duree, delai) {
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
    taches.push(new tache(i + 1, getRandomIntInclusive(min, max), getRandomIntInclusive(min, max)));
    divTache.push({
        tache: document.getElementById(`tache${i + 1}`),
        delai: document.getElementById(`Delaitache${i + 1}`)
    });
    divTache[i].tache.innerHTML = taches[i].duree;
    divTache[i].delai.innerHTML = taches[i].delai;
}

var Pi = 0;
var Fi = 0;
var Di = 0;
var R = 0;

<<<<<<< Updated upstream
var total_retard = 0;
var somme_retard_initial = 0;

results = [];


for (var t of taches) {
=======
  var total_retard = 0;
  var somme_retard_initial = 0;
  var greater_retard_initial = 0;

  results = [];
  
  
  for (var t of taches) {

>>>>>>> Stashed changes
    Pi = t.duree;
    Di = t.delai;

<<<<<<< Updated upstream
    if (R < 0) {
        R += Fi - Di;
    } else {
        R = Fi - Di;
=======
    if(t.id == 1){
      Fi = 0
    }
    if(t.id == 2){
      Fi = taches[0].delai
    }
    if(t.id == 3){
      Fi = taches[1].delai
    }
    if(t.id == 4){
      Fi = taches[2].delai
    }
    if(t.id == 5){
      Fi = taches[3].delai
>>>>>>> Stashed changes
    }

    R = Fi + Pi - Di

    results.push(R);
}

console.log(results)


for (var c of results) {
    somme_retard_initial += c
<<<<<<< Updated upstream

}

for (var chiffre of results) {
    if (chiffre > total_retard) {
        greater_retard_initial = chiffre
=======
  }

  for (var chiffre of results) {
    if(chiffre > greater_retard_initial){
      greater_retard_initial = chiffre
>>>>>>> Stashed changes
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
function Critere1() {
    let tachesDuree = taches.sort((a, b) => {
        return a.duree - b.duree;
    });
<<<<<<< Updated upstream

    let tachesSorted = tachesDuree.sort((a, b) => {
        return a.delai - b.delai;
    });

    console.log(tachesDuree);

    console.log(tachesSorted)

=======
  
    // let tachesSorted = tachesDuree.sort((a, b) => {
    //   return a.delai - b.delai;
    // });
  
  
    console.log(tachesDuree)
  
>>>>>>> Stashed changes
    var Pi = 0;
    var Fi = 0;
    var Di = 0;
    var R = 0;

    results = [];
<<<<<<< Updated upstream


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
        if (chiffre > total_retard) {
            total_retard = chiffre
        }
    }

    console.log(total_retard);

    var divretard = document.getElementById("retard_final");
    divretard.innerHTML = total_retard;
}


//critère 2 minimiser le retard moyen

function critere2() {
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
=======
  
    
    for (var t of tachesDuree) {

      Pi = t.duree;
      Di = t.delai;
  
      if(t.id == 1){
        Fi = 0
      }
      if(t.id == 2){
        Fi = taches[0].delai
      }
      if(t.id == 3){
        Fi = taches[1].delai
      }
      if(t.id == 4){
        Fi = taches[2].delai
      }
      if(t.id == 5){
        Fi = taches[3].delai
      }
  
      R = Fi + Pi - Di
  
      results.push(R);
    }
  
  
    console.log(results);
  
    var g_r = 0
  
    for (var chiffre of results) {
      if(chiffre > g_r){
        g_r = chiffre
      }
    }
  
  
    console.log(g_r);
  
    var divretard = document.getElementById("retard_final");
    divretard.innerHTML = g_r;
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
  
  
  for (var t of taches) {

    Pi = t.duree;
    Di = t.delai;

    if(t.id == 1){
      Fi = 0
    }
    if(t.id == 2){
      Fi = taches[0].delai
    }
    if(t.id == 3){
      Fi = taches[1].delai
    }
    if(t.id == 4){
      Fi = taches[2].delai
    }
    if(t.id == 5){
      Fi = taches[3].delai
    }

    R = Fi + Pi - Di

    results.push(R);
  }
  
  
  console.log(results);
  
  var total_retard = 0;
  
  for (var chiffre of results) {
      total_retard += chiffre
  }

  console.log(total_retard)
  
  var moyenne_c2 = total_retard / results.length
  
  
  console.log(moyenne_c2);
>>>>>>> Stashed changes


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
function critere3() {
    let tachesDuree = taches.sort((a, b) => {
        return a.duree - b.duree;
    });

    console.log(tachesDuree)

<<<<<<< Updated upstream

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
=======
  //critère 3 minimiser la somme des retards
function critere3(){
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
  
  
  for (var t of taches) {

    Pi = t.duree;
    Di = t.delai;

    if(t.id == 1){
      Fi = 0
    }
    if(t.id == 2){
      Fi = taches[0].delai
    }
    if(t.id == 3){
      Fi = taches[1].delai
    }
    if(t.id == 4){
      Fi = taches[2].delai
>>>>>>> Stashed changes
    }
    if(t.id == 5){
      Fi = taches[3].delai
    }

    R = Fi + Pi - Di

<<<<<<< Updated upstream

    console.log(results);

    var total_retard = 0;

    for (var chiffre of results) {
        total_retard += chiffre

    }

    console.log(total_retard);

    var divretard = document.getElementById("retard_final");
    divretard.innerHTML = total_retard;
}


function algo_Johnson() {
    // machine 1 m1 et machine 2 m2
    var m1 = [];
    var m2 = [];
    var divMachine1 = []
    var divMachine2 = []

    for (var i = 0; i < 5; i++) {
        m1.push(new tache(i + 1, getRandomIntInclusive(1, 200)));
        divMachine1.push({
            tache: document.getElementById(`tacheM1${i + 1}`),
        });
        divMachine1[i].tache.innerHTML = m1[i].duree;
    }
=======
    results.push(R);
  }
  
  
  console.log(results);
  
  var total_retard = 0;
  
  for (var chiffre of results) {
      total_retard += chiffre
  }

  console.log(total_retard)
>>>>>>> Stashed changes

    for (var i = 0; i < 5; i++) {
        m2.push(new tache(i + 1, getRandomIntInclusive(1, 200)));
        divMachine2.push({
            tache: document.getElementById(`tacheM2${i + 1}`),
        });
        divMachine2[i].tache.innerHTML = m2[i].duree;
    }
    var iteration = 1
    var valTacheMin = 10 ** 10;
    var machineMin;
    var rangValeurMin;
    var minRang = 1
    var maxRang = 5
    var tabRangValidé = []
    var tabRang = [-1, -1, -1, -1, -1]

    while (iteration <= 5) {
        for (var i = 0; i < 5; i++) {
            if (tabRangValidé.includes(i) === false) {
                if (valTacheMin > m1[i].duree) {
                    valTacheMin = m1[i].duree
                    machineMin = 1
                    rangValeurMin = i
                }

                if (valTacheMin > m2[i].duree) {
                    valTacheMin = m2[i].duree
                    machineMin = 2
                    rangValeurMin = i
                }
            }
        }

        if (machineMin === 1) {
            tabRang[rangValeurMin] = minRang
            minRang++
        } else {
            tabRang[rangValeurMin] = maxRang
            maxRang--
        }
        tabRangValidé.push(rangValeurMin)
        valTacheMin = 10 ** 10;
        iteration++
    }
    var divRang = [];
    for (var i = 0; i < 5; i++) {
        divRang.push({
            tache: document.getElementById(`rang${i + 1}`),
        });
        divRang[i].tache.innerHTML = tabRang[i];
    }
}



 

    





  
  



