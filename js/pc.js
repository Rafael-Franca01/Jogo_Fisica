class Computador {
    constructor(room) {
        this.img = loadImage("zoom/computador.png");
        this.game = new Game(400, 130, 875, 415, room);
        this.room = room;
        this.trigger = new Trigger(0, H - 150, W, H, () => {
            room.interacting = false;
            room.facing = "right";
        });
    }

    show(energy) {
        if (energy) {
            this.game.show();
        }
        image(this.img, 0, 0);
    }

    update() {
        this.trigger.checkClick(mouseX, mouseY);
        this.game.press();

    }

    release() {
        this.game.release();
    }
}

class Wall {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    show() {
        fill(0);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }
}

class Ball {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.yVel = 0;
        this.xVel = 0;
        this.acceleration = 0.1;
        this.GRAVITY = 0.1;
    }

    show() {
        fill(200, 0, 0);
        noStroke();
        circle(this.x, this.y, this.size);
    }

    update() {
        this.yVel += this.GRAVITY;
        this.y += this.yVel;
        this.x += this.xVel;
    }

    moveTowards(x, y, force) {
        this.y -= 1;; // hack
        let dx = x - this.x;
        let dy = y - this.y;
        let distance = dist(this.x, this.y, x, y);

        if (distance > 0) {
            this.xVel = (dx / distance) * force;
            this.yVel = (dy / distance) * (force / 2);
        }
    }

    isOnGround(walls) {
        for (let wall of walls) {
            if (
                this.y + this.size / 2 >= wall.y &&
                this.y - this.size / 2 <= wall.y + wall.h &&
                this.x + this.size / 2 >= wall.x &&
                this.x - this.size / 2 <= wall.x + wall.w
            ) {
                return true;
            }
        }
        return this.y >= this.h - this.size / 2;
    }

}

class Game {
    constructor(x, y, w, h, room) {
        this.room = room
        this.x = x;
        this.y = y;
        this.w = x + w;
        this.h = y + h;
        this.ball = new Ball(x + 85, y + 390, 20);
        this.pressStartTime = 0;
        this.isPressed = false;
        this.calculatedForce = 0;
        this.walls = [
            // ground
            new Wall(x, y + h - 15, w, 30),
            // top
            new Wall(x, y, w, 30),
            // walls
            new Wall(x - 40, y, 90, h),
            new Wall(x + w - 60, y, 90, h),
            // obstacles
            new Wall(x + 170, y + 340, 200, 80),
            new Wall(x + 250, y + 250, 130, 100),
            new Wall(x + 330, y + 180, 50, 240),
            new Wall(x + 330, y + 365, 500, 35),
            new Wall(x + 550, y + 230, 300, 150),
            new Wall(x + 418, y + 280, 60, 20),
            new Wall(x + 418, y, 10, 210)
        ];
    }

    intersects(ball, wall) {
        let nearestX = constrain(ball.x, wall.x, wall.x + wall.w);
        let nearestY = constrain(ball.y, wall.y, wall.y + wall.h);
        let distance = dist(ball.x, ball.y, nearestX, nearestY);

        if (distance < ball.size / 2) {
            let overlap = ball.size / 2 - distance;
            let normalX = (ball.x - nearestX) / distance;
            let normalY = (ball.y - nearestY) / distance;

            ball.x += normalX * overlap;
            ball.y += normalY * overlap;

            // Separate velocity adjustments for vertical and horizontal collisions
            if (abs(normalX) > abs(normalY)) {
                ball.xVel *= -0.8; // Horizontal collision
            } else {
                ball.yVel *= -0.4; // Vertical collision
            }
        }
    }

    crossCursor(showDots) {
        if (this.room.won || mouseX < this.x || mouseX > this.w || mouseY < this.y || mouseY > this.h) {
            cursor();
            return;
        }
        noCursor();
        stroke(0);
        strokeWeight(2);
        line(mouseX - 5, mouseY - 5, mouseX + 5, mouseY + 5);
        line(mouseX - 5, mouseY + 5, mouseX + 5, mouseY - 5);

        if (showDots) {
            let dotSpacing = 10;
            let distance = dist(this.ball.x, this.ball.y, mouseX, mouseY);
            let steps = distance / dotSpacing;
            stroke(0);
            strokeWeight(2);
            for (let i = 0; i < steps; i++) {
                let t = i / steps;
                let x = lerp(this.ball.x, mouseX, t);
                let y = lerp(this.ball.y, mouseY, t);
                point(x, y);
            }
        }
    }

    show() {
        if (this.ball.x >= 1140 && this.ball.y >= 340) {
            this.room.won = true;
        }
        background(220);
        this.crossCursor(this.ball.isOnGround(this.walls));
        this.ball.show();
        fill(0, 200, 0, 100);
        noStroke();
        rect(1120, 300, 80, 80);
        for (let wall of this.walls) {
            wall.show();
            this.intersects(this.ball, wall)
        }
        this.ball.update();
        this.ball.xVel = (this.ball.isOnGround(this.walls)) ? this.ball.xVel * 0.5 : this.ball.xVel;

        if (!this.isPressed && this.calculatedForce > 0 && this.ball.isOnGround(this.walls)) {
            this.ball.moveTowards(mouseX, mouseY, this.calculatedForce);
            this.calculatedForce = 0;
        }

        let maxForce = 10;
        let barHeight = map(this.isPressed ? millis() - this.pressStartTime : this.calculatedForce * 100, 0, maxForce * 100, 0, 200);
        barHeight = constrain(barHeight, 0, 200);

        fill(200, 0, 0);
        rect(this.x + 20, this.h - 30 - barHeight, 20, barHeight);
        stroke(0);
        noFill();
        rect(this.x + 20, this.h - 230, 20, 200);
    }

    press() {
        if (this.ball.isOnGround(this.walls) && !this.room.won) {
            this.isPressed = true;
            this.pressStartTime = millis();
        }
    }

    release() {
        if (this.isPressed) {
            let pressDuration = millis() - this.pressStartTime;
            this.calculatedForce = constrain(pressDuration / 100, 0, 10);
            this.isPressed = false;
        }
    }

}
