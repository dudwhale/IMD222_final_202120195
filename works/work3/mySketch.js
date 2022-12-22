let rows = [];
function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
  background(255);
  stroke(255);
  fill(100, 180, 250);
  for (r = 0; r < 12; r++) {
    rows[r] = new row(r * 50 + 29);
    for (d = 0; d < 16; d++) {
      rows[r].dots[d] = new dot(d * 50 + 29, rows[r].y);
    }
  }
}

function draw() {
  clear();
  for (i = 0; i < rows.length; i++) {
    for (j = 0; j < 12; j++) {
      rows[i].dots[j].react();
      rows[i].dots[j].display();
    }
  }
}

class row {
  constructor(y) {
    this.y = y;
    this.dots = [];
  }
}

class dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.f = 1;
  }
  react() {
    if (dist(mouseX, mouseY, this.x, this.y) <= 50) {
      if (this.f > 1 / 25) {
        this.f += -0.2;
      } else {
        this.f = 1 / 25;
      }
    } else {
      if (this.f < 1) {
        this.f += 0.003;
      }
    }
  }
  display() {
    ellipse(this.x, this.y, 100 * this.f, 100 * this.f);
  }
}
