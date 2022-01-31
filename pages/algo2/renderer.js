class rect {
  constructor(width) {
      this.width = width;
      this.height = width;
  }
}

class circle {
  constructor(rayon) {
      this.rayon = rayon/2;
      this.angleD = 0;
      this.angleF = 3 * Math.PI;
  }
}

//creation tableau avec valeurs aléatoires
for (var a=[],i=0;i<40;++i) a[i]=i;

// http://stackoverflow.com/questions/962802#962890
function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

a = shuffle(a);

console.log(a)

function entierAleatoire(min, max)
{
 return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Utilisation
//La variable contient un nombre aléatoire compris entre 1 et 10
var nb1 = entierAleatoire(400, 600);
var nb2 = entierAleatoire(500, 700);

var canvas = document.getElementById('canvas');



if (canvas.getContext){

  var ctx = canvas.getContext('2d');
  var recipiant = new Path2D();
  recipiant.rect(0, 0, nb1, nb2);
  ctx.stroke(recipiant)

  var width_recipiant = nb1;

  l1_x = 0;
  l1_y = 0;

  // if(width_recipiant - width > 0){

  // }
  // r1 = new rect(l1_x,l1_y,width)
  // c1 = new circle(l1_x+(width)/2,l1_y+(width)/2,width)

  // ctx.rect(r1.x,r1.y,r1.width,r1.width);
  // ctx.arc(c1.x,c1.y,c1.rayon,c1.angleD,c1.angleF);

  // r2 = new rect(l1_x,l1_y,width)
  // c2 = new circle(l1_x+(width)/2,l1_y+(width)/2,width)

  // ctx.rect(r2.x,r2.y,r2.width,r2.width);
  // ctx.arc(c2.x,c2.y,c2.rayon,c2.angleD,c2.angleF);


  for (i=0;i<a.length;i++){
    var r = new rect(i)
    var c = new circle(i)
    console.log(r)
    ctx.rect(l1_x,l1_y,r.width,r.width);
    ctx.arc(l1_x+(i)/2,l1_y+(i)/2,i,c.angleD,c.angleF);
    l1_x = l1_x+r.width
  }


  ctx.stroke();


console.log(width_recipiant);


// ctx.strokeRect(r1.x,r1.y,r1.width,r1.width);
}







