window.addEventListener("DOMContentLoaded", (event) => {
    
    min = 1;
    max = 10;

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
      }


    var dureeTache1 = getRandomIntInclusive(min,max);
    var dureeTache2 = getRandomIntInclusive(min,max);
    var dureeTache3 = getRandomIntInclusive(min,max);
    var dureeTache4 = getRandomIntInclusive(min,max);
    var dureeTache5 = getRandomIntInclusive(min,max);


    var delaiTache1 =  getRandomIntInclusive(min,max);
    var delaiTache2 =  getRandomIntInclusive(min,max);
    var delaiTache3 =  getRandomIntInclusive(min,max);
    var delaiTache4 =  getRandomIntInclusive(min,max);
    var delaiTache5 =  getRandomIntInclusive(min,max);

    // var dureeTache1 = 4;
    // var dureeTache2 = 3;
    // var dureeTache3 = 7;
    // var dureeTache4 = 2;
    // var dureeTache5 = 2;

    // var delaiTache1 = 5;
    // var delaiTache2 = 6;
    // var delaiTache3 = 6;
    // var delaiTache4 = 8;
    // var delaiTache5 = 17;

    var tache1 = { 
      duree : dureeTache1,
      delai : delaiTache1
    }
   

    var tache2 = { 
     duree : dureeTache2,
      delai : delaiTache2
    }
    

    var tache3 = { 
      duree : dureeTache3,
      delai : delaiTache3
    }
    

    var tache4 = { 
      duree : dureeTache4,
      delai : delaiTache4
    }
    

    var tache5 = { 
      duree : dureeTache5,
      delai : delaiTache5
    }
  


    var taches = [];

    taches.push(tache1,tache2,tache3,tache4,tache5);

    taches = taches.sort((a,b)=> {return a.delai - b.delai});

    console.log(taches)

    var divtache1 = document.getElementById('tache1');
    var divtache2 = document.getElementById('tache2');
    var divtache3 = document.getElementById('tache3');
    var divtache4 = document.getElementById('tache4');
    var divtache5 = document.getElementById('tache5');


    divtache1.innerHTML = dureeTache1;
    divtache2.innerHTML = dureeTache2;
    divtache3.innerHTML = dureeTache3;
    divtache4.innerHTML = dureeTache4;
    divtache5.innerHTML = dureeTache5;

    var Delaitache1 = document.getElementById('Delaitache1');
    var Delaitache2 = document.getElementById('Delaitache2');
    var Delaitache3 = document.getElementById('Delaitache3');
    var Delaitache4 = document.getElementById('Delaitache4');
    var Delaitache5 = document.getElementById('Delaitache5');

    Delaitache1.innerHTML = delaiTache1;
    Delaitache2.innerHTML = delaiTache2;
    Delaitache3.innerHTML = delaiTache3;
    Delaitache4.innerHTML = delaiTache4;
    Delaitache5.innerHTML = delaiTache5;

    var Pi = 0
    var Fi = 0
    var Di = 0
    var R = 0;

    results = [];

    for (var tache of taches) {

      Pi = tache['duree']
      Fi += Pi;
      Di = tache['delai']
      // R = Fi - Di;

      if(R < 0 ){
        R += Fi - Di;
      }
      else{
        R = Fi - Di;
      }

      results.push(R);


   }

   console.log(results);

   var total_retard = 0;

    for (var chiffre of results) {

      total_retard += chiffre;

      }

      

      console.log(total_retard)


   
var divretard = document.getElementById('retard');
divretard.innerHTML = total_retard




  });