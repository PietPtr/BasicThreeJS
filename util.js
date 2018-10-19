var seed = Math.random() * 51413;

function random() {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}
