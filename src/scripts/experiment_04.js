import p5 from "p5";
import * as brush from "p5.brush";

import { randomFromArray } from "./utils";

new p5((sk) => {
  let seed = 0;
  let length = 72;
  let hl = length / 2;

  let strokeBrushes = ["2B", "charcoal", "HB", "2H", "marker", "marker2"];
  let backgroundColors = ["white", "black"];
  let colors = [
    "#191a1e",
    "#fcbaee",
    "#d8e191",
    "#267dc5",
    "#3bb941",
    "#b3d3c3",
    "#fcbaee",
    "#d8e191",
    "#267dc5",
    "#3bb941",
    "#FFFFFF",
  ];

  // let colors = ["white", "black", "gray"];

  // let colors = [
  //   "#3a5fb8",
  //   "#43baea",
  //   "#f26d96",
  //   "#6c362f",
  //   "#342c28",
  //   "#e32611",
  //   "#e6edff",
  //   "#1daa65",
  // ];

  function drawRandomLine(x, y, length = 60) {
    const lineOptions = [
      { coordinates: [hl, 0, hl, length] },
      { coordinates: [0, hl, length, hl] },
      { coordinates: [0, 0, length, length] },
      { coordinates: [length, 0, 0, length] },
    ];

    const drawLine = ({ coordinates }, randomBrush) => {
      const [x1, y1, x2, y2] = coordinates;
      brush.push();
      brush.set(
        randomBrush,
        randomFromArray(sk, colors),
        sk.randomGaussian(2) + 0.05
      );
      brush.line(x1, y1, x2, y2);
      brush.pop();
    };

    const linesPerSquare =
      sk.random() < 0.05
        ? 4
        : sk.random() < 0.1
        ? 3
        : sk.random() < 0.4
        ? 2
        : 1;

    const randomBrush = randomFromArray(sk, strokeBrushes);

    sk.push();
    sk.translate(x, y);

    for (let i = 0; i < linesPerSquare; i++) {
      drawLine(randomFromArray(sk, lineOptions), randomBrush);
    }
    sk.pop();
  }

  function drawSquare(x, y, length = 60) {
    const randomBrush = randomFromArray(sk, strokeBrushes);
    const randomColor = randomFromArray(sk, colors);

    brush.push();
    brush.set("2B", randomColor, 0.5);
    brush.setHatch(randomBrush, randomColor);
    brush.hatch(length / 4, sk.random(0, 90));
    brush.rect(x, y, length, length);
    brush.pop();
  }

  brush.instance(sk);

  let backgroundColor = "white";

  sk.setup = () => {
    sk.createCanvas(length * 12, length * 8, sk.WEBGL);
    brush.load();
    brush.field("truncated");
    sk.angleMode(sk.DEGREES);
    sk.background("white");
    sk.frameRate(30);

    backgroundColor = randomFromArray(sk, backgroundColors);
  };

  sk.draw = () => {
    sk.background(backgroundColor);

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
