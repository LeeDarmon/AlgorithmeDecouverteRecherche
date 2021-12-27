/* ------------------------------------------------------------------------------------

Author    : Antoine Delétoille

Date      : 24/12/2021

------------------------------------------------------------------------------------ */

// _G Variables //
let inProgress = false

let g_Cercles = []
let maxX = 0;
let maxY = 0;
let minX = 0;
let minY = 0;
let matrice = []
let nbCerclePlace = 0;

// _G Elements //
let main = document.querySelector("main");
let state = document.getElementById("status");

let canvas = document.getElementById("output-canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let canvasCTX = canvas.getContext('2d');
let gridWidth = document.getElementById("width-value");
let gridHeight = document.getElementById("height-value");

let outputBox = document.getElementById("output-box");
let outputRectanglesBox = document.getElementById("output-boxes");
let outputCercle = document.getElementById("outputRectangles");
let coordinateBox = document.getElementById('box-coordinates');

const INFINITY = 10 ** 10

// Classes //
class Cercle {
    constructor(x, y, r, id, origin) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.id = id;
        this.origin = origin;
    }
}

class Hole {
    constructor(x1, y1, x2, y2, id, origin) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.id = id;
        this.origin = origin;
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeCoords() {
    let coords = ""
    // let nbCercle = getRandomIntInclusive(10,100)
    let nbCercle = 5
    for (let i = 0; i < nbCercle; i++) {
        coords = `${coords + Random(100)}`
        if (i !== nbCercle - 1) coords = `${coords}\n`
    }
    coordinateBox.value = coords
}

function Main() {
    if (!inProgress) {
        clearCanvas() // Reset Canvas of Rectangles & Text
        inProgress = true // Stop user from Stopping Current Sort or Starting a New Sort, etc ...

        // -------------------------------------------- //
        tailleCanvas = getRandomIntInclusive(200, 1000)

        // Check Width //
        if (tailleCanvas === 0) {
            inProgress = false

            return setTimeout(() => {
                if (!inProgress) {
                    Reset()
                }
            }, 2000)
        }
        // Check Format + Format Box Coords //
        let boxes = processCoords(coordinateBox.value)

        // Set Global Arrays //
        g_Cercles = boxes.coords
        matrice = creerMatrice(g_Cercles.length, tailleCanvas)
        // g_Holes = [new Hole(0, 0, tailleCanvas, INFINITY, 1, 0)] // First hole the size of the Infinity with origin Zero as break Case Origin
        // ----------------- //

        let test = 0
        // Start Main Iteration over Rectangles //
        for (let rid = 0; rid < g_Cercles.length; rid++) {

            // Place Current Cercle in Best Hole //
            const r = g_Cercles[rid].r

            if (rid === 0) {
                g_Cercles[rid].x = r
                g_Cercles[rid].y = r
                // maxX += r * 2
                // maxY += r * 2
                circle(r, 1, g_Cercles[rid].x, g_Cercles[rid].y)
                drawCircle(g_Cercles[rid])
                matrice = remplirMatrice(g_Cercles[rid].x, g_Cercles[rid].y, g_Cercles[rid].r, rid)
            } else {
                // if (tailleCanvas * 2 > maxY + (r * 2)) {
                    g_Cercles = meilleurEmplacement(rid)
                    // g_Cercles[rid].y = r
                    // g_Cercles[rid].x = maxX + r
                    // g_Cercles[rid] = placerCercle(rid)
                    matrice = remplirMatrice(g_Cercles[rid].x, g_Cercles[rid].y, g_Cercles[rid].r, rid)
                    // test = (Math.sqrt(Math.pow((g_Cercles[rid].x - g_Cercles[rid-1].x),2)+Math.pow((g_Cercles[rid].y - g_Cercles[rid-1].y),2)) - (g_Cercles[rid].r - g_Cercles[rid-1].r))
                    // if (test > 0) {
                    //     g_Cercles[rid].x = (maxX + r) - ((maxX + r) - (test/2))
                    // } else {
                    //     g_Cercles[rid].x = (maxX + r)
                    // }
                // } else {
                //     g_Cercles = meilleurEmplacement(rid)
                // }
                //
                //
                //
                // maxX += g_Cercles[rid].x + r
                // maxY += (r * 2)
            }


            // ----------------------------------- //


            g_Cercles[rid].origin = 0 // Debugging purposes to test cases that are most redundant, or faulty
            console.log(g_Cercles)
            nbCerclePlace++;
        }
        let endRectArea = 0
        let shortestHeight = 0
        g_Cercles.forEach(cercle => {
            let r = cercle.r

            endRectArea = endRectArea + r * 2

            if ((cercle.r) > shortestHeight) {
                shortestHeight = cercle.r
            }
        })
        // ------------------------------ //


        // (Show + Scale) Height On Canvas //
        canvas.style.height = shortestHeight * 2 + "px"
        canvas.height = canvas.clientHeight

        gridHeight.style.marginTop = shortestHeight * 2 + 18 + "px"

        gridHeight.innerHTML = shortestHeight
        const newHeight = (2 - Math.round(gridHeight.getBoundingClientRect().width) / 2).toString()
        gridHeight.style.marginLeft = Math.floor(newHeight) + "px"
        // ------------------------------ //


        // (Show + Scale) Width On Canvas //
        canvas.style.width = tailleCanvas + "px"
        canvas.width = canvas.clientWidth

        gridWidth.innerHTML = tailleCanvas
        const newWidth = (tailleCanvas - Math.round(gridWidth.getBoundingClientRect().width) / 2).toString()
        gridWidth.style.marginLeft = Math.floor(newWidth) + "px"

        // ------------------------------ //
        // Draw + Show Rectangles //
        g_Cercles.forEach(cercle => {
            let nCercle = new Cercle(cercle.x, cercle.y, cercle.r, cercle.id, cercle.origin)
            drawCircle(nCercle)
        })

        g_Cercles = []
        g_Holes = []
    }
}

function Reset() {

}

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max)
}

function Random(max) {
    return clamp(Math.floor(Math.random() * max), 10, Infinity);
}

// Essentials //
function processCoords(inputCoords) {

    let coords = []
    let current = new Cercle(0, 0, 0, 0, 0)
    let switcher = 'r'

    for (let i = 0; i < inputCoords.length; i++) {
        const n = inputCoords[i]

        if (n === "\n") {
            if (!parseInt(current.r)) return {success: false, message: "c3"}

            current.id = coords.length + 1

            current.r = parseInt(current.r);
            coords[coords.length] = current
            current = new Cercle(0, 0, 0, 0, 0)

        } else if (n !== " ") {
            if (!parseInt(n) && n !== "0") return {success: false, message: "c6"}

            if (!current[switcher]) current[switcher] = ""
            current[switcher] = current[switcher] + n

        }

        if (i === inputCoords.length - 1 && parseInt(current.r)) {
            current.r = parseInt(current.r);

            current.id = coords.length + 1

            coords[coords.length] = current
        }
    }

    return {success: true, coords: coords}
}

function clearCanvas() {
    canvasCTX.clearRect(0, 0, canvas.width, canvas.height);
}

function getRandomColor() {
    color = "hsl(" + Math.random() * 360 + ", 100%, 70%)";
    return color;
}

function drawCircle(shape) {
    const x = shape.x
    const y = shape.y
    const r = shape.r

    _drawCircle(x, y, r, getRandomColor(), "rgb(50, 50, 50)") // Draw Rectangle

}

function _drawCircle(x, y, r, fill, stroke) {
    if ((x != r) || (y != r)) {
        canvasCTX.moveTo(x,y)
    }

    canvasCTX.fillStyle = fill || "rgb(255,255,255)";
    canvasCTX.strokeStyle = stroke || "rgb(0, 0, 0)"
    canvasCTX.lineWidth = 1
    canvasCTX.arc(x, y, r, 0, Math.PI * 2, false);
    canvasCTX.stroke()

    // Initiate a Circle instance
    var circle = new fabric.Circle({
        radius: r,
        fill: canvasCTX.fillStyle,
        stroke: canvasCTX.stroke(),
        strokeWidth: canvasCTX.lineWidth = 1,
        angle : 0
    });

    console.log(circle.calcOwnMatrix())
}

function creerMatrice(tailleCvsX, tailleCvsY) {
    var i;
    var j;
    matrice.length = tailleCvsX * 100;

    for(i=0;i<matrice.length;i++){
        matrice[i] = new Array(tailleCvsY)
        for(j=0;j<matrice[0].length;j++) {
            matrice[i][j] = "X"
        }
    }
    console.log(matrice)
    return matrice;
}
function remplirMatrice(x, y, r, id) {
    let debutX = x - r
    debutX = Math.floor(debutX)
    let debutY = y - r
    debutY = Math.floor(debutY)
    let finX = x + r
    finX = Math.floor(finX)
    let finY = y + r
    finY = Math.floor(finY)
    let i;
    let j;
    let valId = id;

    for(i=debutX;i<finX;i++){
        for(j=debutY;j<finY;j++){
            matrice[j][i] = valId.toString()
        }
    }

    // if(matrice[debutX][finY] === "0") {
    //     matrice[debutX][finY] = "coinx" + valId;
    // }
    if(matrice[finY][debutX] === "X") {
        matrice[finY][debutX] = "coiny" + valId;
    }
    if(matrice[debutY][finX] === "X") {
        matrice[debutY][finX] = "coinx" + valId;
    }

    console.log(matrice);
    return matrice;

}

function placerCercle(id, idVoisin) {
    let distance = Math.sqrt(Math.pow((g_Cercles[id].x - g_Cercles[idVoisin].x),2) + Math.pow((g_Cercles[id].y - g_Cercles[idVoisin].y),2))
    let difference = distance - (g_Cercles[id].r + g_Cercles[idVoisin].r)
    if (difference > 0) {
        g_Cercles[id].x -= difference
    } else {
        g_Cercles[id].x += difference
    }


    return g_Cercles
}

function meilleurEmplacement(rid) {
    let i;
    let j;
    let k;
    let l;
    let valSolution;
    let position;
    let longueurChaine;
    let numTrou;
    let meilleurSolution = 10**10;
    let meilleurSolutionID;
    let meilleurTrou;
    let echange;
    let meilleurX;
    let meilleurY;

    for (i=rid;i<matrice.length;i++) {
        for(j=0;j<matrice[0].length;j++) {
            position = matrice[i][j].includes("coin")
            if (position === true) {
                longueurChaine = matrice[i][j].length - 4;
                numTrou = matrice[i][j].substr(5,longueurChaine)
                numTrou = parseInt(numTrou,10)
                for (k=rid; k<g_Cercles.length; k++) {
                    if (j === 0) {
                        if (g_Cercles[rid].r < meilleurSolution) {
                            meilleurSolutionID = rid
                            meilleurSolution = g_Cercles[rid].r
                        }
                    } else {
                        valSolution = calculerTrou(k, numTrou, i, j)
                        if (valSolution < meilleurSolution && valSolution > -1) {
                            meilleurSolution = valSolution
                            meilleurSolutionID = k
                            meilleurTrou = matrice[i][j];
                            meilleurX = i;
                            meilleurY = j;
                        }
                    }
                }
            }
        }
    }
    echange = g_Cercles[rid]
    g_Cercles[rid] = g_Cercles[meilleurSolutionID];
    g_Cercles[meilleurSolutionID] = echange;
    g_Cercles[rid].x += (meilleurX + g_Cercles[rid].r)
    g_Cercles[rid].y += (meilleurY + g_Cercles[rid].r)
    g_Cercles = placerCercle(rid, numTrou)
    return g_Cercles;
}

function calculerTrou(id, numTrou, i, j) {
    // on test si le cercle passe
    let debutX;
    let debutY;
    let largeurCercle = g_Cercles[id].r * 2;
    let bool = true;
    let valSolution;

    for (debutX=i;debutX<i+largeurCercle;debutX++) {
        for (debutY=j;debutY<j+largeurCercle;debutY++) {
            if(matrice[i][j].includes("coin") === false && matrice[i][j] !== "X") {
                bool = false;
            }
        }
    }

    if (bool === true) {
        valSolution = (Math.sqrt(Math.pow((g_Cercles[id].x - g_Cercles[numTrou].x),2)+Math.pow((g_Cercles[id].y - g_Cercles[numTrou].y),2)) - (g_Cercles[id].r - g_Cercles[numTrou].r))
    } else {
        valSolution = -1
    }
    return valSolution;
}

function circle(radius, steps, centerX, centerY){
    var xValues = [centerX];
    var yValues = [centerY];
    var table="<tr><th>Step</th><th>X</th><th>Y</th></tr>";
    // var ctx = document.getElementById("canvas").getContext("2d");
    canvasCTX.fillStyle = "red"
    canvasCTX.beginPath();
    for (var i = 0; i <= steps; i++) {
        var radian = (2*Math.PI) * (i/steps);
        xValues[i+1] = centerX + radius * Math.cos(radian);
        yValues[i+1] = centerY + radius * Math.sin(radian);
        if(0==i){canvasCTX.moveTo(xValues[i+1],yValues[i+1]);}else{canvasCTX.lineTo(xValues[i+1],yValues[i+1]);}
        table += "<tr><td>" + i + "</td><td>" + xValues[i+1] + "</td><td>" + yValues[i+1] + "</td></tr>";
    }
    canvasCTX.fill();
    console.log(table);
    return table;
}
