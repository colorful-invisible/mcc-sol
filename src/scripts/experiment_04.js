import p5 from "p5";
import * as brush from "p5.brush";

import { randomFromArray } from "./utils";

new p5((sk) => {
  let seed = 0;
  let length = 72;
  let hl = length / 2;

  let strokeBrushes = ["2B", "charcoal", "HB", "2H", "marker", "marker2"];
  // let colors = [
  //   "#00330E",
  //   "#00330E",
  //   "yellow",
  //   "#AE0000",
  //   "#AE0000",
  //   "#AE0000",
  // ];
  let colors = ["black", "yellow", "yellow", "#00E4E4", "#00E4E4", "#00E4E4"];

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
      brush.set(randomBrush, randomFromArray(sk, colors), sk.noise(2) + 0.05);
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
    brush.set("2B", randomColor, 1);
    if (sk.random() < 0.2) {
      brush.setHatch(randomBrush, randomColor);
      brush.hatch(length / 4, sk.random(0, 90));
    }
    brush.rect(x, y, length, length);
    brush.pop();
  }

  brush.instance(sk);

  sk.setup = () => {
    let canvas = sk.createCanvas(length * 16, length * 8, sk.WEBGL);
    canvas.elt.classList.add("saturate");
    brush.load();
    brush.field("truncated");
    sk.angleMode(sk.DEGREES);
    sk.background("white");
  };

  sk.draw = () => {
    sk.background("#fafafa");

    sk.translate(-sk.width / 2, -sk.height / 2);

    if (sk.frameCount % 120 === 0) {
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
