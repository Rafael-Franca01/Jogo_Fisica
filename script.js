const quarto_imgs = [
    "cama_LIGHT.png",
    "aquario_LIGHT.png",
    "porta_LIGHT.png",
    "porta_aberta_LIGHT.png",
    "computador_LIGHT.png"
]

const zoom_imgs = [
    "mesa_LIGHT.png",
]

const quarto = []
const W = 1653, H = 796;
let face = 0;
let prev_face = 0;
let luz = 0;

function preload() {
    for (let i = 0; i < quarto_imgs.length; i++) {
        if (quarto_imgs[i].includes("aberta")) {
            continue;
        }
        quarto.push(loadImage("quarto/" + quarto_imgs[i].replace("LIGHT", "SEMLUZ")));
    }
    for (let i = 0; i < quarto_imgs.length; i++) {
        quarto.push(loadImage("quarto/" + quarto_imgs[i].replace("LIGHT", "LUZ")));
    }
    for (let i = 0; i < zoom_imgs.length; i++) {
        quarto.push(loadImage("zoom/" + zoom_imgs[i].replace("LIGHT", "SEMLUZ")));
    }
    for (let i = 0; i < zoom_imgs.length; i++) {
        quarto.push(loadImage("zoom/" + zoom_imgs[i].replace("LIGHT", "LUZ")));
    }
    quarto.push(loadImage("zoom/computador.png"));
    quarto.push(loadImage("zoom/energia_FECHADO.png"));
    quarto.push(loadImage("espelho/aquario.png"));
}

function setup() {
    trigger_left = new Trigger(0, 0, 100, H, () => {
        face = ((face + 1) % 4) + luz;
    });
    trigger_right = new Trigger(W - 100, 0, 100, H, () => {
        face = ((face + 3) % 4) + luz;
    });

    trigger_mesa = new Trigger(816, 393, 305, 193, () => {
        prev_face = face;
        face = 10;
    });
    trigger_computador = new Trigger(737, 412, 174, 189, () => {
        prev_face = face;
        face = 11;
    });
    trigger_energia = new Trigger(1102, 342, 68, 51, () => {
        prev_face = face;
        face = 12;
    });
    trigger_aquario = new Trigger(563, 101, 515, 296, () => {
        prev_face = face;
        face = 13;
    });
    trigger_back = new Trigger(0, H - 200, W, H, () => {
        face = prev_face;
    });
    createCanvas(W, H);
    image(quarto[0], 0, 0);
}

function draw() {
    image(quarto[face], 0, 0);
    if (face < 10) {
        trigger_left.display();
        trigger_right.display();
    } else {
        trigger_back.display();
    }
    if (face == 0) {
        trigger_mesa.display();
    } else if (face == 3) {
        trigger_computador.display();
        trigger_energia.display();
    } else if (face == 1) {
        trigger_aquario.display();
    }
}

function mousePressed() {
    console.log(mouseX, mouseY);
    if (face < 10) {
        trigger_left.checkClick(mouseX, mouseY);
        trigger_right.checkClick(mouseX, mouseY);
    } else {
        trigger_back.checkClick(mouseX, mouseY);
    }
    if (face == 0) {
        trigger_mesa.checkClick(mouseX, mouseY);
    } else if (face == 3) {
        trigger_computador.checkClick(mouseX, mouseY);
        trigger_energia.checkClick(mouseX, mouseY);
    } else if (face == 1) {
        trigger_aquario.checkClick(mouseX, mouseY);
    }
}