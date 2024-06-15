import p5 from "p5";
import { randomFromArray } from "./utils";

new p5((sk) => {
  let length = 72;
  let hl = length / 2;
  let seed = 0;

  function drawRandomLine(x, y, length = 60) {
    const lineOptions = [
      { color: "black", coordinates: [0, -hl, 0, hl] },
      {
        color: "yellow",
        coordinates: [-hl, 0, hl, 0],
      },
      {
        color: "blue",
        coordinates: [-hl, -hl, hl, hl],
      },
      { color: "red", coordinates: [-hl, hl, hl, -hl] },
    ];

    const drawLine = ({ color, coordinates }) => {
      const [x1, y1, x2, y2] = coordinates;
      sk.push();
      sk.stroke(color);
      sk.strokeWeight(2);
      sk.line(x1, y1, x2, y2);
      sk.pop();
    };

    const linesPerSquare =
      sk.random() < 0.05
        ? 4
        : sk.random() < 0.1
        ? 3
        : sk.random() < 0.4
        ? 2
        : 1;

    sk.push();
    sk.translate(x, y);
    sk.noStroke();

    for (let i = 0; i < linesPerSquare; i++) {
      drawLine(randomFromArray(sk, lineOptions));
    }

    sk.pop();
  }

  function drawSquare(x, y, length = 60) {
    sk.push();
    sk.stroke("black");
    sk.strokeWeight(2);
    sk.noFill();
    sk.rect(x, y, length);
    sk.pop();
  }

  sk.setup = () => {
    sk.createCanvas(length * 8, length * 8);
    sk.rectMode(sk.CENTER);
    sk.strokeCap(sk.PROJECT);
    sk.angleMode(sk.DEGREES);
    sk.background("white");
    // sk.noLoop();
  };

  sk.draw = () => {
    sk.background("white");

    if (sk.frameCount % 120 === 0) {
      seed++;
    }

    sk.randomSeed(seed);

    sk.push();
    sk.translate(hl, hl);

    for (let x = 0; x < sk.width; x += length) {
      for (let y = 0; y < sk.height; y += length) {
        drawRandomLine(x, y, length);
        drawSquare(x, y, length);
      }
    }
    sk.pop();

    sk.push();
    sk.stroke("black");
    sk.strokeWeight(4);
    sk.noFill();
    sk.rect(sk.width / 2, sk.height / 2, sk.width, sk.height);
    sk.pop();
  };
});
