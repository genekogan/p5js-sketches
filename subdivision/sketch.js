var circles, rects;

function setup() 
{
  createCanvas(800, 800);
  colorMode(HSB);
  smooth();
  noLoop();
  circles = false;
  rects = true;
}

function draw() 
{
  background(255);
  var base = color( random(255), random(150,255), random(150,255) );
  drawBox(10, 0, 0, width, height, base);

  // refresh option
  fill(0,130);
  rect(2, 0, 50, 20);
  rect(70, 0, 75, 20);
  rect(163, 0, 40, 20);
  fill(255);
  text("circles", 7, 15);
  text("rectangles", 75, 15);
  text("both", 168, 15);
}

function drawBox(n, x, y, w, h, col) 
{
  if (n==0) {
    if (rects) {
      stroke(0, 20);
      fill(col);
      rect(x, y, w, h);
    }
    if (circles) {
      noStroke();
      var alph = 240;
      if (rects) alph = 70;
      fill(perturbColor(col,40,40,40), alph);
      ellipse(x + w/2, y + h/2, w*0.95, h*0.95);
    }
  }
  else {
    var t = random(1);
    var newcol1 = perturbColor(col, n, n*2, n*3);
    var newcol2 = perturbColor(col, n, n*2, n*3);  
    var horiz = random(1) > 0.5 ? true : false;
    if (horiz) {
      drawBox(n-1, x, y, w, h*t, newcol1);
      drawBox(n-1, x, y+h*t, w, h*(1-t), newcol2);  
    } else {
      drawBox(n-1, x, y, w*t, h, newcol1);
      drawBox(n-1, x+w*t, y, w*(1-t), h, newcol2);  
    }      
  }
}

function perturbColor(col, h, s, b) {
  var h2 = floor(hue(col) + random(-h, h) + 255) % 255;
  var s2 = floor(saturation(col) + random(-s, s) + 255) % 255;
  var b2 = floor(brightness(col) + random(-b, b) + 255) % 255;
  return color(h2, s2, b2);
}

function mousePressed() {
  if (mouseY < 21) {
    if      (mouseX <  53) { circles = true;  rects = false; }
    else if (mouseX < 146) { circles = false;  rects = true; }
    else if (mouseX < 204) { circles = true;  rects = true; }
  }
  redraw();
}