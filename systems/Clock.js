

class Clock {
    constructor(epoch, currentTime) {
        if (!Clock.instance) {
            this.epoch = epoch;
            this.time = currentTime || 0;
            this.speed = 1;
            this.previousSpeed = this.speed;

            Clock.instance = this;
        }

        return Clock.instance;
    }

    pause() {
        this.previousSpeed = this.speed;
        this.speed = 0;
    }

    start() {
        this.speed = this.previousSpeed;
    }

    tick(dt) {
        this.time += dt * 1000 * this.speed;
    }

    date() {
        return new Date(this.epoch + this.time);
    }

    dateString() {
        let d = this.date();
        return d.getFullYear() + '/' +
                (''+(d.getMonth()+1)).padStart(2, '0') + '/' +
                (''+d.getUTCDay()).padStart(2, '0') + ' ' +
                (''+d.getHours()).padStart(2, '0') + ':' +
                (''+d.getMinutes()).padStart(2, '0') + ':' +
                (''+d.getSeconds()).padStart(2, '0') + '.' +
                (''+d.getMilliseconds()).padStart(3, '0');
    }

    seconds() {
        return (this.epoch + this.time) / 1000;
    }

    makeJSON() {
        return {
            time: this.time,
            epoch: this.epoch
        }
    }

    fromJSON(json) {
        this.time = json.time;
        this.epoch = json.epoch;
    }
}
