var seed = 1337

function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}
