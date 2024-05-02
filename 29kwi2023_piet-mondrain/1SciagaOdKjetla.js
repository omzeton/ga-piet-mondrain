import { default as p5Class } from "p5";
import "./style.css";

const p5 = new p5Class(() => {});

const xdim = 10;
const ydim = 8;
const size = 20;

const blockSpacing = 90;

const yBlocksAmount = 9;
const xBlocksAmount = 7;

let grid;

const flipCoin = () => (p5.random() < 0.6 ? false : true);
const dist = (n, m) => p5.abs(n - m);
const generateCell = (west, north) => {
  if (!west && !north) {
    return { h: false, v: false };
  }
  if (!west) {
    return { h: flipCoin(), v: true };
  }
  if (!north) {
    return { h: true, v: flipCoin() };
  }
  const h = flipCoin();
  const v = h ? flipCoin() : true;
  return { h, v };
};
const generateGrid = (xd, yd) => {
  grid = new Array(yd + 1);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(xd + 1);
    for (let j = 0; j < grid[i].length; j++) {
      if (i == 0 || j == 0) {
        grid[i][j] = { h: false, v: false };
      } else if (i == 1 && j == 1) {
        grid[i][j] = { h: true, v: true };
      } else {
        grid[i][j] = generateCell(grid[i][j - 1].h, grid[i - 1][j].v);
      }
    }
  }
};

const display = (x1, y1, sx, sy) => {
  p5.rect(size, size, (sx - 1) * size, (sy - 1) * size);
  for (let i = 1; i < sy; i++) {
    for (let j = 1; j < sx; j++) {
      if (grid[y1 + i][x1 + j].h) {
        p5.line(j * size, i * size, (j + 1) * size, i * size);
      }
      if (grid[y1 + i][x1 + j].v) {
        p5.line(j * size, i * size, j * size, (i + 1) * size);
      }
    }
  }
};

p5.setup = () => {
  p5.createCanvas(1200, 850);
};

p5.draw = () => {
  p5.clear();
  p5.noLoop();
  p5.noFill();

  generateGrid(xdim, ydim);
  for (let i = 0; i < xBlocksAmount; i++) {
    p5.push();
    for (let j = 0; j < yBlocksAmount; j++) {
      p5.strokeWeight(6);
      p5.stroke("#fff");
      display(p5.min(j, 4), p5.min(i, 3), 3 + dist(4, j), 3 + dist(3, i));

      p5.strokeWeight(2);
      p5.stroke("#000");
      display(p5.min(j, 4), p5.min(i, 3), 3 + dist(4, j), 3 + dist(3, i));

      p5.translate(blockSpacing + dist(4, j) * size, 0);
    }
    p5.pop();
    p5.translate(0, blockSpacing + dist(3, i) * size);
  }
};

p5.keyTyped = () => {
  if (p5.key === "s" || p5.key === "S") {
    p5.saveCanvas(`palette-${colorPaletteRandomIndex}-${new Date().toISOString()}`, "png");
  }
};
