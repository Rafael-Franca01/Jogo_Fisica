class Quarto {
    constructor() {
        this.light = false;
        this.interacting = false;
        this.showPaper = false;
        this.facing = "front";
        this.walls = {
            front: new Cena("quarto/porta_LIGHT.png", this, ["left", "right"], false, true),
            back: new Cena("quarto/cama_LIGHT.png", this, ["right", "left"], false, true),
            left: new Cena("quarto/aquario_LIGHT.png", this, ["back", "front"], false, true),
            right: new Cena("quarto/computador_LIGHT.png", this, ["front", "back"], false, true),
        }
        this.interactions = {
            table: new Cena("zoom/mesa_LIGHT.png", this, "back", true, true),
            manivela: new Manivela(this),
            aquario: new Aquario(this),
            computador: new Computador(this),
        }

        this.walls.back.addTrigger(816, 393, 305, 193, () => {
            this.interacting = true;
            this.facing = "table";
        });

        this.walls.left.addTrigger(563, 101, 515, 296, () => {
            if (this.light) {
                this.interacting = true;
                this.facing = "aquario";
            }
        })

        this.walls.right.addTrigger(737, 412, 174, 189, () => {
            this.interacting = true;
            this.facing = "computador";
        });
        this.interactions.table.addTrigger(839, 440, 130, 64, () => {
            this.interactions.table.triggers[0].disable = true; // HORRÍVEL
            this.showPaper = true
        }, () => {
            this.interactions.table.triggers[0].disable = false; // HORRÍVEL
            this.showPaper = false
        })

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

        if (this.showPaper) {
            this.paper();
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
        let paperW = 520;
        let paperH = 600
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
            correto funcionamento dos dispositivos conectados.
            
            Causa:
            Segundo relatos é recorrente a visita de um porco que 
            botafogo no aparato.
            
            Solução:
            Ajuste do regulador de tensão e estabilização da potência
            gerada dentro da faixa ideal (1400-1750 watts).
            
            Recomendação:
            Monitorar a potência constantemente. Caso ultrapasse 
            1750 watts ou caia abaixo de 1400 watts, o sistema não
            suportará a pressão.
            
            Status:
            Necessita de reparos.`, W / 2 - 300, H / 2 - 270)
    }
}