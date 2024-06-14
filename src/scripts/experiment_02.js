import p5 from "p5";
import * as brush from "p5.brush";

new p5((sk) => {
  let seed = 0;
  let length = 72;
  let hl = length / 2;

  function drawRandomLine(x, y, length = 60) {
    const lineOptions = [
      { color: "black", coordinates: [hl, 0, hl, length] },
      { color: "yellow", coordinates: [0, hl, length, hl] },
      { color: "blue", coordinates: [0, 0, length, length] },
      { color: "red", coordinates: [length, 0, 0, length] },
    ];

    const drawLine = ({ color, coordinates }) => {
      const [x1, y1, x2, y2] = coordinates;
      brush.push();
      brush.set("charcoal", color, 0.2);
      brush.line(x1, y1, x2, y2);
      brush.pop();
    };

    const randomIndex = () => Math.floor(sk.random(lineOptions.length));
    const linesPerSquare = sk.random() < 0.1 ? 3 : sk.random() < 0.4 ? 2 : 1;

    sk.push();
    sk.translate(x, y);
    for (let i = 0; i < linesPerSquare; i++) {
      drawLine(lineOptions[randomIndex()]);
    }
    sk.pop();
  }

  function drawSquare(x, y, length = 60) {
    brush.push();
    brush.set("2B", "black", 0.5);
    brush.noFill();
    brush.rect(x, y, length, length);
    brush.pop();
  }

  brush.instance(sk);

  sk.setup = () => {
    sk.createCanvas(length * 16, length * 8, sk.WEBGL);
    brush.load();
    brush.noField();
    sk.angleMode(sk.DEGREES);
    sk.background("white");
    // sk.noLoop();
  };

  sk.draw = () => {
    sk.background("lightgray");

    sk.translate(-sk.width / 2, -sk.height / 2);

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
