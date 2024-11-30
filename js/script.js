const W = 1653, H = 796;
let quarto;

function preload() {
    quarto = new Quarto()
}

function setup() {
    createCanvas(W, H);
}

function draw() {
    if (quarto.light) {
        background(255)
    } else {
        background(0)
    }
    quarto.show()
}

function mousePressed() {
    quarto.update()
}

function mouseReleased() {
    if (quarto.facing == "computador" && quarto.light) {
        quarto.interactions.computador.release()
    }
}