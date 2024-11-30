const W = 1653, H = 796;
let quarto;
let menu;
let intro;

function preload() {
    quarto = new Quarto()
    intro = new Cutscene("cutscenes/intro.mp4", () => {
        intro.active = false
    });
    menu = new Menu(intro)
}

function setup() {
    createCanvas(W, H);
}

function draw() {
    if (menu.active) {
        menu.show()
        return
    }
    if (intro.active) {
        intro.show()
        return
    }
    if (quarto.light) {
        background(255)
    } else {
        background(0)
    }
    quarto.show()
}

function mousePressed() {
    console.log(mouseX, mouseY)
    if (menu.active) {
        menu.update()
        return
    }
    quarto.update()
}

function mouseReleased() {
    if (menu.active) {
        return
    }
    if (quarto.facing == "computador" && quarto.light) {
        quarto.interactions.computador.release()
    }
}