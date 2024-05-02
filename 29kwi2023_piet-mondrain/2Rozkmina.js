import { default as p5Class } from "p5";
import "./style.css";

const p5 = new p5Class(() => {});

const cellSize = 20;

const blockSpacing = 90;

const xBlocks = 9;
const yBlocks = 7;

let grid;

const flipCoin = () => (p5.random() < 0.6 ? false : true);
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
const generateGrid = () => {
  grid = new Array(9);
  for (let y = 0; y < grid.length; y++) {
    grid[y] = new Array(11);
    for (let x = 0; x < grid[y].length; x++) {
      if (y == 0 || x == 0) {
        grid[y][x] = { h: false, v: false };
      } else if (y == 1 && x == 1) {
        grid[y][x] = { h: true, v: true };
      } else {
        grid[y][x] = generateCell(grid[y][x - 1].h, grid[y - 1][x].v);
      }
    }
  }
};

const display = (x1, y1, sx, sy) => {
  p5.rect(cellSize, cellSize, (sx - 1) * cellSize, (sy - 1) * cellSize);
  for (let y = 1; y < sy; y++) {
    for (let x = 1; x < sx; x++) {
      const xPos = x * cellSize;
      const yPos = y * cellSize;
      if (grid[y1 + y][x1 + x].h) {
        p5.push();
        p5.noStroke();
        // PIONOWE
        p5.fill("#0f0");
        p5.circle(xPos, yPos, 10);
        p5.pop();
        p5.line(xPos, yPos, (x + 1) * cellSize, y * cellSize);
      }
      if (grid[y1 + y][x1 + x].v) {
        p5.push();
        p5.noStroke();
        // POZIOME
        p5.fill("#f00");
        p5.circle(xPos, yPos, 10);
        p5.pop();
        p5.line(xPos, yPos, x * cellSize, (y + 1) * cellSize);
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

  generateGrid();

  const magicNumber1 = 4;
  const magicNumber2 = 3;

  for (let y = 0; y < yBlocks; y++) {
    p5.push();
    for (let x = 0; x < xBlocks; x++) {
      p5.strokeWeight(6);
      p5.stroke("#fff");

      // console.log(`p5.min(${x}, ${magicNumber1})`, p5.min(x, magicNumber1));
      // console.log(`p5.min(${y}, ${magicNumber2})`, p5.min(y, magicNumber2));

      display(magicNumber1, magicNumber2, magicNumber2 + p5.abs(magicNumber1 - x), magicNumber2 + p5.abs(magicNumber2 - y));

      p5.strokeWeight(2);
      p5.stroke("#000");
      display(magicNumber1, magicNumber2, magicNumber2 + p5.abs(magicNumber1 - x), magicNumber2 + p5.abs(magicNumber2 - y));

      p5.translate(blockSpacing + p5.abs(magicNumber1 - x) * cellSize, 0);
    }
    p5.pop();
    p5.translate(0, blockSpacing + p5.abs(magicNumber2 - y) * cellSize);
  }
};

p5.keyTyped = () => {
  if (p5.key === "s" || p5.key === "S") {
    p5.saveCanvas(`palette-${colorPaletteRandomIndex}-${new Date().toISOString()}`, "png");
  }
};
