class Quarto {
    constructor() {
        this.light = false;
        this.interacting = false;
        this.facing = "front";
        this.walls = {
            front: new Cena("quarto/porta_LIGHT.png", this, ["left", "right"], false, true),
            back: new Cena("quarto/cama_LIGHT.png", this, ["right", "left"], false, true),
            left: new Cena("quarto/aquario_LIGHT.png", this, ["back", "front"], false, true),
            right: new Cena("quarto/computador_LIGHT.png", this, ["front", "back"], false, true),
        }
        this.interactions = {
            table: new Cena("zoom/mesa_LIGHT.png", this, "back", true, true),
            manivela: new Manivela(this)
        }

        this.walls.back.addTrigger(816, 393, 305, 193, () => {
            this.interacting = true;
            this.facing = "table";
        });

        this.interactions.table.addTrigger(836, 271, 175, 100, () => {
            this.facing = "manivela";
        });
    }

    show() {
        if (!this.interacting) {
            this.walls[this.facing].show(this.light);
        } else {
            this.interactions[this.facing].show(this.light)
        }
    }

    update() {
        if (!this.interacting) {
            this.walls[this.facing].update();
        } else {
            this.interactions[this.facing].update();
        }
    }
}