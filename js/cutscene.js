class Cutscene {
    constructor(video, func) {
        this.video = createVideo([video]);
        this.video.hide();
        this.video.onended(func);
        this.active = true;
    }

    play() {
        this.video.play()
    }

    show() {
        image(this.video, 0, 0, W, H)
    }
}