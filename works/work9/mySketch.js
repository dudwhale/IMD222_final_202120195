const flowers = [];
const flowers_num = 50;
const step = 6;

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  background(0);
  colorMode(HSB, 360);
  noFill();
  for (let i = flowers_num; i--; )
    flowers[i] = createVector(
      random(width * 0.1, width * 0.9),
      random(height * 0.1, height * 0.9)
    );
}

function draw() {
  const sec = frameCount / 30;
  stroke(map(sin(sec), -2, 2, 0, 360), 360, 360);
  strokeWeight(0.1);
  for (let { x, y } of flowers) {
    beginShape();
    for (let i = 200; i--; ) {
      let degree = sec;
      for (const b of flowers) degree += atan2(b.y - y, b.x - x) * 2;
      vertex((x += cos(degree) * step), (y += sin(degree) * step));
      if (flowers.some((e) => (e.x - x) ** 2 + (e.y - y) ** 2 < step)) break;
    }
    endShape();
  }
}

function mousePressed() {
  setup();
}
