/* ------------------------------------------------------------------------------------

Author    : Antoine Delétoille

Date      : 24/12/2021

------------------------------------------------------------------------------------ */

// _G Variables //
let inProgress = false

let g_Cercles = []

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
let outputRectangles = document.getElementById("outputRectangles");
let coordinateBox = document.getElementById('box-coordinates');

// Classes //
class Cercle {
    constructor(x, y, r, id, origin) {
        this.x = x;
        this.y = y;
        this.r =r;
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
        tailleCanvas = getRandomIntInclusive(100, 500)
        // Check Width //
        if (tailleCanvas === 0) {
            inProgress = false

            return setTimeout(() => { if (!inProgress) { Reset() } }, 2000)
        }
        //

        // Check Format + Format Box Coords //
        let boxes = processCoords(coordinateBox.value)
        if (!boxes.success) {
            state.attributes.style.value = "color:rgb(255, 0, 0)"
            state.innerHTML = "Failed: Wrong Format"
            inProgress = false

            return setTimeout(() => { if (!inProgress) { Reset() } }, 2000)
        }
        // -------------------------------- //


        // Current Sort/Session Info //
        let sessionInfo = {


            StartTime: 0,
            EndTime: 0,
            RunTime: 0
        }
        // ---------------- //


        // Set Global Arrays //
        g_Rectangles = sortByArea(boxes.coords) // Iterate over the biggest rectangles first
        // ----------------- //


        g_Rectangles = [] // Reset both global arrays back to empty
        g_Holes = []      //

        inProgress = false // End of Sort
        state.attributes.style.value = "color:rgb(0, 255, 0)"
        state.innerHTML = "Done!"
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
    if (inputCoords === "" || inputCoords.length < 4) return { success: false, message: "c1" }

    let coords = []
    let current = new Cercle(0, 0, 0, 0, 0)

    for (let i = 0; i < inputCoords.length; i++) {
        const n = inputCoords[i]

       if (n === "\n") {
            if (!parseInt(current.r)) return { success: false, message: "c3" }

            current.id = coords.length + 1

            current.r = parseInt(current.r);
            coords[coords.length] = current
            current = new Cercle(0, 0, 0, 0, 0)

        } else if (n !== " ") {
            if (!parseInt(n) && n !== "0") return { success: false, message: "c6" }

        }

        if (i === inputCoords.length - 1 && parseInt(current.r)) {
            current.r = parseInt(current.r);

            current.id = coords.length + 1

            coords[coords.length] = current
        }
    }

    return { success: true, coords: coords }
}

function clearCanvas() {
    canvasCTX.clearRect(0, 0, canvas.width, canvas.height);
}