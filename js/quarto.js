class Quarto {
    constructor(lose) {
        this.light = false;
        this.energy = false;
        this.resistors = false;
        this.won = false;
        this.interacting = false;
        this.showPaper = false;
        this.showEnd = false;
        this.facing = "front";
        this.porta = loadImage("quarto/porta_aberta_LUZ.png");
        this.walls = {
            front: new Cena("quarto/porta_LIGHT.png", this, ["left", "right"], false),
            back: new Cena("quarto/cama_LIGHT.png", this, ["right", "left"], false),
            left: new Cena("quarto/aquario_LIGHT.png", this, ["back", "front"], false),
            right: new Cena("quarto/computador_LIGHT.png", this, ["front", "back"], false),
        }
        this.interactions = {
            table: new Cena("zoom/mesa_LIGHT.png", this, "back", true),
            manivela: new Manivela(this, lose),
            aquario: new Aquario(this),
            computador: new Computador(this),
            resistor: new Resistor(this)
        }


        this.walls.back.addTrigger(816 * off.w, 393 * off.h, 305 * off.w, 193 * off.h, () => {
            this.interacting = true;
            this.facing = "table";
        });

        this.walls.left.addTrigger(563 * off.w, 101 * off.h, 515 * off.w, 296 * off.h, () => {
            if (this.light) {
                this.interacting = true;
                this.facing = "aquario";
            }
        })

        this.walls.right.addTrigger(737 * off.w, 412 * off.h, 174 * off.w, 189 * off.h, () => {
            this.interacting = true;
            this.facing = "computador";
        });

        this.walls.right.addTrigger(1102 * off.w, 342 * off.h, 68 * off.w, 51 * off.h, () => {
            if (this.light) {
                this.interacting = true;
                this.facing = "resistor";
            }
        });

        this.interactions.table.addTrigger(839 * off.w, 440 * off.h, 130 * off.w, 64 * off.h, () => {
            this.interactions.table.triggers[0].disable = true; // HORRÍVEL
            this.showPaper = true
        }, () => {
            this.interactions.table.triggers[0].disable = false; // HORRÍVEL
            this.showPaper = false
        })

        this.interactions.table.addTrigger(836 * off.w, 271 * off.h, 175 * off.w, 100 * off.h, () => {
            this.facing = "manivela";
        });
    }

    show() {
        if (!this.interacting) {
            this.walls[this.facing].show(this.light);
        } else {
            if (this.facing == "computador") {
                this.interactions[this.facing].show(this.resistors)
            } else {
                this.interactions[this.facing].show(this.light)
            }
        }

        if (this.showPaper) {
            this.paper();
        } else if (this.showEnd) {
            this.endPaper();
        }

        if (this.light && this.energy && this.resistors && this.won) {
            this.walls.front.img_light = this.porta;
        }
    }

    update() {
        if (!this.interacting) {
            this.walls[this.facing].update();
        } else {
            this.interactions[this.facing].update();
        }
    }

    paper() {
        let paperW = 520 * off.w;
        let paperH = 600 * off.h;
        noStroke();
        fill(255);
        rect(W / 2 - paperW / 2, H / 2 - paperH / 2, paperW, paperH);
        textSize(16)
        textFont("Comic Sans")
        textAlign(LEFT, LEFT)
        fill(0)
        text(`
            Relatório de Conserto – Gerador de Potência

            Data: 04/11/2023
            Técnico Responsável: Artur Antunes Coimbra
            Equipamento: Gerador de Potência Elétrica
            
            Problema:
            O gerador não está fornecendo potência estável.
            A energia gerada está fora da faixa necessária para o
            correto funcionamento dos dispositivos conectados. A 
            caixa de energia também foi danificada, a resistência
            deveria atingir 100Ω
            
            Solução:
            Ajuste do regulador de tensão e estabilização da potência
            gerada dentro da faixa ideal (140000-175000 Miliwatts).
            
            Recomendação:
            Monitorar a potência constantemente. Caso ultrapasse 
            175000 Miliatts ou caia abaixo de 140000 Miliwatts,
            o sistema não suportará a pressão.
            `, W / 2 - (300 * off.w), H / 2 - (270 * off.h))
    }

    endPaper() {
        let paperW = 520 * off.w;
        let paperH = 600 * off.h;
        noStroke();
        fill(255);
        rect(W / 2 - paperW / 2, H / 2 - paperH / 2, paperW, paperH);
        textSize(16)
        textFont("Comic Sans")
        textAlign(LEFT, LEFT)
        fill(0)
        text(`
            Parabéns, humano! Você completou o teste com
            excelência. Você está convidado para o Galardon,
            o encontro dos maiores do universo. 
            
            Sua jornada começa agora. 
            Assinado: Zarn`, W / 2 - (300 * off.w), H / 2 - (270 * off.h))
    }

    getActive() {
        return (!this.interacting) ? this.walls[this.facing] : this.interactions[this.facing]
    }
}