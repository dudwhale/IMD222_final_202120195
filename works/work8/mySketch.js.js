let particles = [];
let nums;
let particleDensity = 1000;
let colors = [];

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");

  nums = (boundingRects.width * boundingRects.height) / particleDensity;
  background(0, 0, 10);
  colorMode(HSB, 360, 100, 100, 100);
  colors[0] = color(350, 50, 80, random(25, 50));
  colors[1] = color(200, 50, 80, random(25, 50));
  for (let i = 0; i < nums; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  for (let j = particles.length - 1; j > 0; j--) {
    particles[j].update();
    particles[j].show();
    if (particles[j].finished()) {
      particles.splice(j, 1);
      background(0, 0, 5, 0.1);
    }
  }

  for (let i = particles.length; i < nums; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.pos = createVector(this.x, this.y);

  this.life = random(20);
  this.c = color(random(colors));
  this.ff = 0;

  this.update = function () {
    this.ff = noise(this.pos.x / 100, this.pos.y / 100) * TWO_PI;
    let mainP = 1200;
    let changeDir = TWO_PI / mainP;
    let roundff = round((this.ff / TWO_PI) * mainP);
    this.ff = changeDir * roundff;

    if (this.ff < 6 && this.ff > 3) {
      this.c = colors[0];
      stroke(this.c);
      this.pos.add(tan(this.ff) * random(1, 3), tan(this.ff));
    } else {
      this.c = colors[1];
      stroke(this.c);
      this.pos.sub(sin(this.ff) * random(0.1, 1), cos(this.ff));
    }
  };

  this.show = function () {
    noFill();
    strokeWeight(random(2));
    let lx = 20;
    let ly = 20;
    let px = constrain(this.pos.x, lx, width - lx);
    let py = constrain(this.pos.y, ly, height - ly);
    point(px, py);
  };

  this.finished = function () {
    this.life -= random(random(random(random()))) / 10;
    this.life = constrain(this.life, 0, 1);
    if (this.life == 0) {
      return true;
    } else {
      return false;
    }
  };
}

function mousePressed() {
  (location || window.location || document.location).reload();
}
