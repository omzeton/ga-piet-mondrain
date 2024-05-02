import p5 from "p5";
import colors from "nice-color-palettes";
import "./style.css";

const width = window.innerWidth;
const height = window.innerHeight;
const res = 60;

const xOffset = 250;
const yOffset = 250;
const shapeOffset = 0;

const colorPaletteRandomIndex = Math.floor(Math.random() * colors.length);
const colorPalette = colors[colorPaletteRandomIndex];
const bgColor = colorPalette[0];
const otherColors = colorPalette.slice(1);

new p5($ => {
  $.setup = () => {
    $.createCanvas(width, height);
    $.background(bgColor);
  };

  const applyColor = () => $.fill(otherColors[Math.floor(Math.random() * otherColors.length)]);

  const half = (res - shapeOffset) / 2;
  const full = res - shapeOffset;

  const shape1 = (x, y) => {
    applyColor();
    $.triangle(x + half, y, x + full, y + full, x, y + full);
  };

  const shape2 = (x, y) => {
    applyColor();
    $.triangle(x, y, x + full, y + half, x, y + full);
  };

  const shape3 = (x, y) => {
    applyColor();
    $.triangle(x, y + half, x + full, y, x + full, y + full);
  };

  const shape4 = (x, y) => {
    applyColor();
    $.triangle(x, y, x + full, y, x + half, y + full);
  };

  const shape5 = (x, y) => {
    applyColor();
    $.beginShape();
    $.vertex(x, y);
    $.vertex(x + half, y);
    $.vertex(x + full, y + half);
    $.vertex(x + full, y + full);
    $.vertex(x + half, y + full);
    $.vertex(x, y + half);
    $.endShape($.CLOSE);
  };

  const shape6 = (x, y) => {
    applyColor();
    $.beginShape();
    $.vertex(x, y);
    $.vertex(x + half, y);
    $.vertex(x + full, y + half);
    $.vertex(x + full, y + full);
    $.vertex(x, y + full);
    $.endShape($.CLOSE);
  };

  const shape7 = (x, y) => {
    applyColor();
    $.beginShape();
    $.vertex(x, y);
    $.vertex(x + full, y);
    $.vertex(x + full, y + full);
    $.vertex(x + half, y + full);
    $.vertex(x, y + half);
    $.endShape($.CLOSE);
  };

  const shape8 = (x, y) => {
    applyColor();
    $.beginShape();
    $.vertex(x, y + half);
    $.vertex(x + half, y);
    $.vertex(x + full, y);
    $.vertex(x + full, y + half);
    $.vertex(x + half, y + full);
    $.vertex(x, y + full);
    $.endShape($.CLOSE);
  };

  $.draw = () => {
    $.noLoop();
    $.noStroke();
    const shapeChoices = [shape5, shape6, shape7, shape8];
    for (let x = xOffset; x < width - xOffset; x += res) {
      for (let y = yOffset; y < height - yOffset; y += res) {
        const randomChoice = shapeChoices[Math.floor(Math.random() * shapeChoices.length)];
        randomChoice(x, y);
      }
    }
  };

  $.keyTyped = () => {
    if ($.key === "s" || $.key === "S") {
      $.saveCanvas(`palette-${colorPaletteRandomIndex}-${new Date().toISOString()}`, "png");
    }
    return false;
  };
});
