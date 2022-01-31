/* ------------------------------------------------------------------------------------

Author    : Antoine Delétoille

Date      : 31/01/2022

------------------------------------------------------------------------------------ */

// _G Variables //
let inProgress = false

let g_Cercles = []
let matrice = []
let nbCerclePlace = 0;
let meilleurX = 0;
let meilleurY = 0;
let largeurUtilise = 0;

let canvas = document.getElementById("output-canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

let canvasCTX = canvas.getContext('2d');
let gridWidth = document.getElementById("width-value");
let gridHeight = document.getElementById("height-value");
let coordinateBox = document.getElementById('box-coordinates');

// Classes //
class Cercle {
    constructor(x, y, r, id) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.id = id;
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeCoords() {
    let coords = ""
    let nbCercle = getRandomIntInclusive(10, 100)
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
        }
        // Check Format + Format Box Coords //
        let boxes = processCoords(coordinateBox.value)

        // Set Global Arrays //
        g_Cercles = boxes.coords
        matrice = creerMatrice(g_Cercles.length, tailleCanvas)
        // ----------------- //
        let shortestHeight = 0
        for (let rid = 0; rid < g_Cercles.length; rid++) {

            const r = g_Cercles[rid].r

            if (rid === 0) {
                g_Cercles[rid].x = r
                g_Cercles[rid].y = r
                matrice = remplirMatrice(g_Cercles[rid].y, g_Cercles[rid].x, g_Cercles[rid].r, rid)
            } else {
                g_Cercles = meilleurEmplacement(rid)
            }

            if (g_Cercles[rid].x + g_Cercles[rid].r > shortestHeight) {
                shortestHeight = g_Cercles[rid].x + g_Cercles[rid].r
            }

            // ----------------------------------- //

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
            let nCercle = new Cercle(cercle.y, cercle.x, cercle.r, cercle.id)
            dessinerCercle(nCercle)
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
    let current = new Cercle(0, 0, 0, 0)
    let switcher = 'r'

    for (let i = 0; i < inputCoords.length; i++) {
        const n = inputCoords[i]

        if (n === "\n") {
            if (!parseInt(current.r)) return {success: false, message: "c3"}

            current.id = coords.length + 1

            current.r = parseInt(current.r);
            coords[coords.length] = current
            current = new Cercle(0, 0, 0, 0)

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
    color = Math.floor(Math.random() * 16777215).toString(16);
    return color;
}

function dessinerCercle(shape) {
    const x = shape.x
    const y = shape.y
    const r = shape.r
    const id = shape.id

    _dessinerCercle(x, y, r, id, getRandomColor(), "rgb(50, 50, 50)") // Draw Rectangle

}

function _dessinerCercle(x, y, r, id, fill, stroke) {
    if ((x != r) || (y != r)) {
        canvasCTX.moveTo(x, y)
    }
    canvasCTX.beginPath()
    canvasCTX.fillStyle = "#" + getRandomColor();
    canvasCTX.strokeStyle = stroke;
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
    return matrice;
}

function remplirMatrice(x, y, r, id) {
    let i;
    let j;
    let cercleMatrice = algo_Bresenham(r, id)
    let debutX = Math.round(x - r)
    let finX = Math.round(x + r)
    let debutY = Math.round(y - r)
    let finY = Math.round(y + r)

    for (i = debutX; i < finX; i++) {
        for (j = debutY; j < finY; j++) {
            if (matrice[i][j] === "X" || matrice[i][j].includes("coin") === true) {
                matrice[i][j] = cercleMatrice[i - debutX][j - debutY]
            }
        }
    }

    largeurUtilise += r * 2;
    console.log("Cercle " + id + " dans la matrice");
    console.log(matrice);
    return matrice;
}

function meilleurEmplacement(rid) {
    let k;
    let valSolution;
    let meilleurSolution = 10 ** 10;
    let meilleurSolutionID;
    let meilleurTrouX;
    let meilleurTrouY;
    let echange;
    let minLigne = 10 ** 10;
    let boolPremiereLigne = false

    for (k = rid; k < g_Cercles.length; k++) {
        valSolution = remplirMatriceTest(g_Cercles[k].r, k)
        if ((valSolution < meilleurSolution && valSolution > -1) || (valSolution === meilleurSolution)) {
            if (largeurUtilise < tailleCanvas - 20 && boolPremiereLigne === false) {
                meilleurSolution = valSolution
                meilleurSolutionID = k
                meilleurTrouX = meilleurX
                meilleurTrouY = meilleurY
            } else if (largeurUtilise >= tailleCanvas - 50) {
                boolPremiereLigne = true
                minLigne = meilleurX
                meilleurSolution = valSolution
                meilleurSolutionID = k
                meilleurTrouX = meilleurX
                meilleurTrouY = meilleurY
            }
        }
    }

    echange = g_Cercles[rid]
    g_Cercles[rid] = g_Cercles[meilleurSolutionID];
    g_Cercles[meilleurSolutionID] = echange;
    g_Cercles[rid].x += (meilleurTrouX + g_Cercles[rid].r)
    g_Cercles[rid].y += (meilleurTrouY + g_Cercles[rid].r)
    matrice = remplirMatrice(g_Cercles[rid].x, g_Cercles[rid].y, g_Cercles[rid].r, rid)

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

function remplirMatriceTest(r, id) {
    let i;
    let j;
    let cercleMatrice = algo_Bresenham(r, id)
    let erreur = true;
    let debutX = 0
    let debutY = 0
    let finX = r * 2
    let finY = r * 2
    let OldDebutY = debutY;
    let OldFinY = finY
    let compteurTrou;
    let tailleCercle;

    while (erreur === true) {
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