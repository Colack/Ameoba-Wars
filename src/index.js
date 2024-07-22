var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

// test

canvas.width = 1200;
canvas.height = 800;

const fps = 60;

var keys = [];

let lasttime = 0;
let accumulator = 0;
const timeStep = 1000 / fps; // Set to 60 fps. Will stay at the same speed regardless of fps. Makes it easier to code and manage.
let timestamp = Date.now();

const gameInfo = {
    name: 'Amoeba Wars: Microscopic Warfare',
    version: '0.0.1',
    author: 'Colack & Mahmoud',
    description: 'A game about amoebas fighting each other.'
}

var playerSelf = {
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    color: 'white',
    speed: 5,
    
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    },

    update: function() {
        if (keys[87]) { // W
            this.y -= this.speed;
        }
        if (keys[83]) { // S
            this.y += this.speed;
        }
        if (keys[65]) { // A
            this.x -= this.speed;
        }
        if (keys[68]) { // D
            this.x += this.speed;
        }

        if (this.x < 0) {
            this.x = 0;
        }

        if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
        }

        if (this.y < 0) {
            this.y = 0;
        }

        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
        }
    }
}

window.addEventListener('keydown', function(e) {
    keys[e.keyCode] = true;
});

window.addEventListener('keyup', function(e) {
    keys[e.keyCode] = false;
});

function gameLoop() {
    let newTimestamp = Date.now();
    let deltaTime = newTimestamp - timestamp;
    timestamp = newTimestamp;

    accumulator += deltaTime;

    while (accumulator >= timeStep) {
        update();
        accumulator -= timeStep;
    }

    draw();

    requestAnimationFrame(gameLoop);
}

function update() {
    playerSelf.update();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the screen

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw some text to the screen
    ctx.fillStyle = 'white';
    ctx.font = '48px serif';
    ctx.fillText('Hello World!', 10, 50);

    playerSelf.draw();
}

function init() {
    // set document title to the game title
    document.title = gameInfo.name;

    requestAnimationFrame(gameLoop);
}

init();
