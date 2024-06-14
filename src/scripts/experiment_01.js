import p5 from "p5";
import { pulse } from "./utils";

new p5((sk) => {
  let seed = 0;
  let length = 72;
  let hl = length / 2;

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

    const randomIndex = () => Math.floor(sk.random() * lineOptions.length);
    const linesPerSquare = sk.random() < 0.1 ? 3 : sk.random() < 0.4 ? 2 : 1;

    sk.push();
    sk.translate(x, y);
    sk.noStroke();

    for (let i = 0; i < linesPerSquare; i++) {
      drawLine(lineOptions[randomIndex()]);
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
    sk.createCanvas(length * 20, length * 8);
    sk.rectMode(sk.CENTER);
    sk.strokeCap(sk.PROJECT);
    sk.angleMode(sk.DEGREES);
    sk.background("white");
    // sk.noLoop();
  };

  sk.draw = () => {
    sk.background("lightgray");
    sk.translate(hl, hl);

    if (sk.frameCount % 90 === 0) {
      seed++;
    }

    sk.randomSeed(seed);

    for (let x = 0; x < sk.width; x += length) {
      for (let y = 0; y < sk.height; y += length) {
        drawRandomLine(x, y, length);
        drawSquare(x, y, length);
      }
    }
  };
});
