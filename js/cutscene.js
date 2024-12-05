class Cutscene {
    constructor(video, func, active = false) {
        this.video = createVideo([video]);
        this.video.hide();
        this.video.onended(func);
        this.active = active;
    }

    play() {
        this.video.play()
    }

    show() {
        image(this.video, 0, 0, W, H)
    }
}