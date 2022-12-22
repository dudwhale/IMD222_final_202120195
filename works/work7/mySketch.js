const leaves = [];
const reductionRate = 0.9;
const central = "blue";
const terminal = "pink";
const branch = "pink";
let rootRadius;
let rootStroke;
let shoter;

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  shoter = min(width, height);
  rootRadius = sqrt(shoter) * 1.7 * 0.9;
  rootStroke = shoter / 150;
  background("lightcyan");
  leaves.length = 0;
  leaves.push([(x = 0), (y = 0), (radius = rootRadius)]);
}

function draw() {
  translate(width / 2, height / 2);
  for (let i = 30; i--; ) {
    const [X, Y, RADIUS] = random(leaves);
    const degree = (int(random(8)) * TWO_PI) / 8;
    const radius = RADIUS * reductionRate;
    const x = X + cos(degree) * (radius + RADIUS);
    const y = Y + sin(degree) * (radius + RADIUS);
    if (sqrt(x * x + y * y) < shoter / 2.1) {
      if (
        leaves.every(([X, Y, RADIUS]) => dist(x, y, X, Y) >= radius + RADIUS)
      ) {
        leaves.push([x, y, radius]);
        const color2 = lerpColor(
          color(terminal),
          color(central),
          radius / rootRadius
        );
        fill(color2);
        noStroke();
        ellipse(x, y, radius * 1.7, radius * 1.7);
        strokeWeight((rootStroke * radius) / rootRadius);
        stroke(branch);
        line(X, Y, x, y);
      }
    }
  }
}

function mousePressed() {
  setup();
}
