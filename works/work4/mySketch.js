const MIN_PARTICLE_COUNT = 500;
const MAX_PARTICLE_COUNT = 700;
const MIN_PARTICLE_SIZE = 2;
const MAX_PARTICLE_SIZE = 25;
const MIN_FORCE = 0.4;
const MAX_FORCE = 0.6;
const REPULSION_RADIUS = 100;
const REPULSION_STRENGTH = 0.25;
const IMG_RESIZED_WIDTH = 400;
const IMG_SCAN_STEPS = 4;
const DrawTypes = {
  Rect: 0,
};

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
  loadImg("daisy.png");
}

function draw() {
  background(255, 255, 220);
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
        rect(0, 0, particle.size, particle.size);
    }
    pop();
  });
}
