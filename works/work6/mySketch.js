const MIN_PARTICLE_COUNT = 200;
const MAX_PARTICLE_COUNT = 700;
const MIN_PARTICLE_SIZE = 12;
const MAX_PARTICLE_SIZE = 50;
const MIN_FORCE = 0.4;
const MAX_FORCE = 0.6;
const REPULSION_RADIUS = 100;
const REPULSION_STRENGTH = 0.25;
const IMG_RESIZED_WIDTH = 550;
const IMG_SCAN_STEPS = 2;
const DrawTypes = {
  Rect: 0,
};

let imgNames = ["earth.png", "saturn.png", "mars.png"];
let particles = [];
let imgIndex = 0;
let drawType = 0;
let particleCount = 550;
let img;

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  loadImg(imgNames[0]);
}

function draw() {
  background(20, 0, 40);
  fill(255);
  noStroke();
  if (img == null) {
    return;
  }
  push();
  translate(width / 2 - img.width / 2, height / 2 - img.height / 2);
  rectMode(CENTER);
  particles.forEach((particle) => {
    particle.move();
    push();
    translate(particle.pos.x, particle.pos.y);
    fill(particle.color);
    switch (drawType) {
      case DrawTypes.Rect:
        rect(0, 0, particle.size * 0.25, particle.size);
        rect(0, 0, particle.size, particle.size * 0.25);
    }
    pop();
  });
}

function mousePressed() {
  if (mouseButton == LEFT) {
    loadNextImg();
  }
}
