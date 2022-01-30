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
let matriceEssai = [];
let meilleurX = 0;
let meilleurY = 0;
let tailleMaxCanvas = 0;
let largeurUtilise = 0;
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

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeCoords() {
    let coords = ""
    let nbCercle = getRandomIntInclusive(10,100)
    for (let i = 0; i < nbCercle; i++) {
        coords = `${coords + Random(50)}`
        if (i !== nbCercle - 1) coords = `${coords}\n`
    }
    coordinateBox.value = coords
}

function Main() {
    if (!inProgress) {
        clearCanvas() // Reset Canvas of Rectangles & Text
        inProgress = true // Stop user from Stopping Current Sort or Starting a New Sort, etc ...

        // -------------------------------------------- //
        tailleCanvas = getRandomIntInclusive(200, 500)

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
        // ----------------- //
        let shortestHeight = 0
        let test = 0
        for (let rid = 0; rid < g_Cercles.length; rid++) {

            const r = g_Cercles[rid].r

            if (rid === 0) {
                g_Cercles[rid].x = r
                g_Cercles[rid].y = r
                matrice = remplirMatrice(g_Cercles[rid].y, g_Cercles[rid].x, g_Cercles[rid].r, rid)
                // tailleMaxCanvas = g_Cercles[rid].r
            } else {
                // if (tailleCanvas * 2 > maxY + (r * 2)) {
                g_Cercles = meilleurEmplacement(rid)
                if (g_Cercles[rid].y + g_Cercles[rid].r > shortestHeight) {
                    shortestHeight = g_Cercles[rid].y + g_Cercles[rid].r
                }
            }

            // ----------------------------------- //

            g_Cercles[rid].origin = 0 // Debugging purposes to test cases that are most redundant, or faulty
            console.log(g_Cercles)
            nbCerclePlace++;
        }

        // (Show + Scale) Height On Canvas //
        canvas.style.height = shortestHeight + "px"
        canvas.height = canvas.clientHeight

        gridHeight.style.marginTop = shortestHeight + 18 + "px"

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
            let nCercle = new Cercle(cercle.y, cercle.x, cercle.r, cercle.id, cercle.origin)
            drawCircle(nCercle)
        })

        g_Cercles = []
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
    // color = "hsl(" + Math.random() * 360 + ", 100%, 70%)";
    color = Math.floor(Math.random()*16777215).toString(16);
    return color;
}

function drawCircle(shape) {
    const x = shape.x
    const y = shape.y
    const r = shape.r
    const id = shape.id

    _drawCircle(x, y, r, id, getRandomColor(), "rgb(50, 50, 50)") // Draw Rectangle

}

function _drawCircle(x, y, r, id, fill, stroke) {
    if ((x != r) || (y != r)) {
        canvasCTX.moveTo(x, y)
    }
    canvasCTX.beginPath()
    canvasCTX.fillStyle = "#" + getRandomColor();
    canvasCTX.strokeStyle = stroke;
    canvasCTX.font = '12px serif';
    canvasCTX.fillText(id, x, y);
    canvasCTX.lineWidth = 1
    canvasCTX.arc(x, y, r, 0, Math.PI * 2, false);
    canvasCTX.stroke()
    canvasCTX.fill()
}

function creerMatrice(tailleCvsX, tailleCvsY) {
    var i;
    var j;

    for (i = 0; i < tailleCvsX; i++) {
        matrice.length += g_Cercles[i].r * 2
    }

    for (i = 0; i < matrice.length; i++) {
        matrice[i] = new Array(tailleCvsY)
        for (j = 0; j < matrice[0].length; j++) {
            matrice[i][j] = "X"
        }
    }
    // console.log(matrice)
    return matrice;
}

function remplirMatrice(x, y, r, id) {
    let i;
    let j;
    let valId = id;
    let cercleMatrice = algo_Bresenham(r, id)
    let debutX;
    let finX;
    let debutY;
    let finY;

    debutX = x - r
    debutY = y - r
    finX = x + r
    finY = y + r

    debutX = Math.round(debutX)
    debutY = Math.round(debutY)
    finX = Math.round(finX)
    finY = Math.round(finY)

    for (i = debutX; i < finX; i++) {
        for (j = debutY; j < finY; j++) {
            if (matrice[i][j] === "X" || matrice[i][j].includes("coin") === true) {
                matrice[i][j] = cercleMatrice[i - debutX][j - debutY]
            } else {
                if (cercleMatrice[i - debutX][j - debutY] !== "X") {
                    console.log("ALERTE !")
                }
            }
            //           matrice[i][j] = cercleMatrice[i - debutX][j - debutY]
        }
    }

    if (matrice[finX + 1][debutY] === "X") {
        matrice[finX + 1][debutY] = "coiny" + valId;
    } else {
        while (matrice[finX + 1][debutY] !== "X") {
            debutY++
        }
        matrice[finX + 1][debutY] = "coiny" + valId;
    }
    if (matrice[debutX][finY + 1] === "X") {
        matrice[debutX][finY + 1] = "coinx" + valId;
    } else {
        while (matrice[debutX][finY + 1] !== "X" && debutX < matrice.length - 1) {
            debutX++
        }
    }

    largeurUtilise += r * 2;
    console.log("Cercle " + id + " dans la matrice");
    console.log(matrice);
    return matrice;

}

function placerCercle(id, idVoisin, axe) {
    let distance = Math.sqrt(Math.pow((g_Cercles[id].x - g_Cercles[idVoisin].x), 2) + Math.pow((g_Cercles[id].y - g_Cercles[idVoisin].y), 2))
    let difference = distance - (g_Cercles[id].r + g_Cercles[idVoisin].r)
    if (axe === "x") {
        if (difference > 0) {
            g_Cercles[id].x -= difference
        } else {
            g_Cercles[id].x += difference
        }
    } else {
        if (difference > 0) {
            g_Cercles[id].y -= difference
        } else {
            g_Cercles[id].y += difference
        }
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
    let meilleurSolution = 10 ** 10;
    let meilleurSolutionID;
    let meilleurTrouX;
    let meilleurTrouY;
    let echange;
    let axe;
    let meilleurCoin;
    let minLigne = 10 ** 10;
    let boolPremiereLigne = false
    for (i = 0; i < matrice.length; i++) {
        for (j = 0; j < matrice[0].length; j++) {
            position = matrice[i][j].includes("coin")
            if (position === true) {
                longueurChaine = matrice[i][j].length - 4;
                numTrou = matrice[i][j].substr(5, longueurChaine)
                axe = matrice[i][j].substr(4, 1)
                numTrou = parseInt(numTrou, 10)
                for (k = rid; k < g_Cercles.length; k++) {
                    if (minLigne >= i && axe === "y") {
                        minLigne = i
                        if (i !== 0) {
                            console.log(i, j)
                        }
                        valSolution = remplirMatriceTest(i, j, g_Cercles[k].r, k, axe, numTrou)
                    } else if (i === 0) {
                        valSolution = remplirMatriceTest(i, j, g_Cercles[k].r, k, axe, numTrou)
                    }
                    // valSolution = remplirMatriceTest(i, j, g_Cercles[k].r, k, axe, numTrou)
                    if ((valSolution < meilleurSolution && valSolution > -1) || (valSolution === meilleurSolution && axe === "x")) {
                        if (largeurUtilise < tailleCanvas - 20 && axe === 'x' && boolPremiereLigne === false) {
                            meilleurSolution = valSolution
                            meilleurSolutionID = k
                            meilleurTrouX = meilleurX
                            meilleurTrouY = meilleurY
                            meilleurCoin = matrice[i][j]
                        } else if (largeurUtilise >= tailleCanvas - 50) {
                            // console.log(minLigne)
                            // if (minLigne > meilleurX) {
                            boolPremiereLigne   = true
                            minLigne = meilleurX
                            meilleurSolution = valSolution
                            meilleurSolutionID = k
                            meilleurTrouX = meilleurX
                            meilleurTrouY = meilleurY
                            meilleurCoin = matrice[i][j]
                            // }

                        }
                    }
                }
            }
        }
    }
    console.log(meilleurCoin)
    echange = g_Cercles[rid]
    g_Cercles[rid] = g_Cercles[meilleurSolutionID];
    g_Cercles[meilleurSolutionID] = echange;
    g_Cercles[rid].x += (meilleurTrouX + g_Cercles[rid].r)
    g_Cercles[rid].y += (meilleurTrouY + g_Cercles[rid].r)
    matrice = remplirMatrice(g_Cercles[rid].x, g_Cercles[rid].y, g_Cercles[rid].r, rid)
    // g_Cercles = placerCercle(rid, numTrou, axe)
    return g_Cercles;
}

function algo_Bresenham(rayon, id) {
    let x = 0;
    let y = rayon;
    let m = 5 - 4 * rayon;
    let tableau = []
    tableau.length = rayon * 2;
    for (i = 0; i < rayon * 2; i++) {
        tableau[i] = new Array(rayon * 2)
    }
    for (i = 0; i < tableau.length; i++) {
        for (j = 0; j < tableau[i].length; j++) {
            tableau[i][j] = "X"
        }
    }

    while (x <= y) {
        y -= 1
        tableau[x + rayon - 1][(y) + rayon - 1] = id.toString()
        tableau[(y) + rayon - 1][x + rayon - 1] = id.toString()
        tableau[-x + rayon - 1][(y) + rayon - 1] = id.toString()
        tableau[-y + rayon - 1][x + rayon - 1] = id.toString()
        tableau[x + rayon - 1][-y + rayon - 1] = id.toString()
        tableau[y + rayon - 1][-x + rayon - 1] = id.toString()
        tableau[-x + rayon - 1][-y + rayon - 1] = id.toString()
        tableau[-y + rayon - 1][-x + rayon - 1] = id.toString()
        y += 1
        if (m > 0) {
            y -= 1;
            m -= 8 * y;
        }
        x += 1;
        m += 8 * x + 4;
    }

    // On ajoute une colonne au milieu
    for (i = rayon * 2; i > rayon; i--) {
        for (j = 0; j < rayon * 2; j++) {
            tableau[j][i - 1] = tableau[j][i - 2]
        }
    }

    // on ajoute une ligne au milieu
    for (i = rayon * 2; i > rayon; i--) {
        for (j = 0; j < rayon * 2; j++) {
            tableau[i - 1][j] = tableau[i - 2][j]
        }
    }

    // On rempli le cercle
    let boolID = false;
    let boolX = false;
    for (i = 1; i + 1 < rayon * 2; i++) {
        boolID = false;
        boolX = false;
        for (j = 0; j + 1 < rayon * 2; j++) {
            if (tableau[i][j] === id.toString()) {
                if (boolX === false) {
                    boolID = true
                } else {
                    boolID = false
                }
            } else if (boolID === true) {
                if (tableau[i][j] === "X") {
                    boolX = true
                    tableau[i][j] = id.toString()
                }
            }
        }
    }
    return tableau
}

function remplirMatriceTest(x, y, r, id, axe, numTrou) {
    let debutX = x
    debutX = Math.floor(debutX)
    let debutY = y
    debutY = Math.floor(debutY)
    let finX = x + r * 2
    finX = Math.floor(finX)
    let finY = y + r * 2
    finY = Math.floor(finY)
    let i;
    let j;
    let valId = id;
    let cercleMatrice;
    let bordureMax;
    cercleMatrice = algo_Bresenham(r, id)
    // if (g_Cercles[id].r > g_Cercles[numTrou].r) {
    //     if (axe === "x") {
    //         debutY = 0
    //         finY = r * 2
    //     } else {
    //         debutX = 0
    //         finX = r * 2
    //     }
    // } else {

    // // On regarde où se termine la bordure gauche du cercle
    for (i = 0; i < cercleMatrice.length; i++) {
        if (cercleMatrice[i][0] !== "X") {
            bordureMax = i + 1;
        }
    }

    if (axe === "x") {
        while (matrice[debutX + bordureMax][debutY] === "X" && debutY !== 0) {
            debutY--
            finY--
        }
    } else {
        while (matrice[debutX][debutY + bordureMax] === "X" && debutX !== 0) {
            debutX--
            finX--
        }
    }
    // }


    let erreur = true;
    let OldDebutX = debutX;
    let OldDebutY = debutY;
    let OldFinX = finX
    let OldFinY = finY
    let compteurTrou;
    let tailleCercle;

    while (erreur === true) {
        // if (axe === "x") {
        //     debutY++
        //     finY++
        // } else {
        //     debutX++
        //     finX++
        // }
        if (finY > matrice[debutX].length) {
            debutY = 0
            finY = OldFinY - OldDebutY
            debutX++
            finX++
        } else {
            debutY++
            finY++
        }
        erreur = false;
        compteurTrou = 0;
        tailleCercle = cercleMatrice.length * cercleMatrice[0].length;

        for (i = debutX; i < finX; i++) {
            for (j = debutY; j < finY; j++) {
                if (matrice[i][j] === "X") {
                    if (cercleMatrice[i - debutX][j - debutY] === "X") {
                        compteurTrou++
                    }
                } else {
                    if (cercleMatrice[i - debutX][j - debutY] !== "X") {
                        erreur = true;
                    }
                }
            }
        }

    }

    if (erreur === true) {
        return -1;
    } else {
        meilleurX = debutX
        meilleurY = debutY

        return compteurTrou / tailleCercle;
    }


}