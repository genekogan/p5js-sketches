var n;
var circles = [];

function setup() {
  createCanvas(800, 800);
  smooth();
  noLoop();
  
  n = 1600;
  
  // put bounding circles
  circles.push(new Circ(-10, height/2, 20));
  circles.push(new Circ(width+10, height/2, 20));
  circles.push(new Circ(width/2, -10, 20));
  circles.push(new Circ(width/2, height+10, 20));
  
  for (var i=0; i<n; i++) {
    circles.push(new Circ());  
  }
}

function draw() {
  background(255);
  var idx = 0;
  for (var i=0; i<circles.length; i++) {
    circles[i].draw();
  }
}

function distBetweenCircles(circle1, circle2) {
  return (dist(circle1.x, circle1.y, circle2.x, circle2.y) - 0.5*(circle1.r + circle2.r));
}
  
function Circ(x_, y_, r_) {
  
  if (x_===undefined) {
    do {
      done = true;
      this.x = random(width);
      this.y = random(height);
      this.r = 6;
      
      minDist = width;
      for (var i=0; i<circles.length; i++) {
        var dOther = distBetweenCircles(this, circles[i]);
        if (dOther < 0) done = false;
        else {
          if (dOther < minDist) minDist = dOther;
        }
      }
    } while(!done);
    this.r += minDist;
  }
  else {
    this.x = x_;
    this.y = y_;
    this.r = r_;
  }

  this.draw = function() {
    push();
    translate(this.x, this.y);
    noFill();
    stroke(0);
    ellipse(0, 0, this.r, this.r);
    pop();
  }
}