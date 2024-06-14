import p5 from "p5";
import * as brush from "p5.brush";

new p5((sk) => {
  let seed = 0;
  let length = 72;
  let hl = length / 2;

  let strokeBrushes = ["2B", "charcoal", "HB", "2H", "marker", "marker2"];
  const selectRandomBrush = () =>
    strokeBrushes[Math.floor(sk.random(strokeBrushes.length))];

  let colors = [
    "#3a5fb8",
    "#43baea",
    "#f26d96",
    "#6c362f",
    "#342c28",
    "#e32611",
    "#e6edff",
    "#1daa65",
  ];

  const selectRandomColor = () => colors[Math.floor(sk.random(colors.length))];

  function drawRandomLine(x, y, length = 60) {
    const lineOptions = [
      { color: "black", coordinates: [hl, 0, hl, length] },
      { color: "yellow", coordinates: [0, hl, length, hl] },
      { color: "blue", coordinates: [0, 0, length, length] },
      { color: "red", coordinates: [length, 0, 0, length] },
    ];

    const drawLine = ({ coordinates }, randomBrush) => {
      const [x1, y1, x2, y2] = coordinates;
      brush.push();
      brush.set(
        randomBrush,
        selectRandomColor(),
        sk.randomGaussian(1) * 1.95 + 0.05
      );
      brush.line(x1, y1, x2, y2);
      brush.pop();
    };

    const randomIndex = () => Math.floor(sk.random(lineOptions.length));
    const linesPerSquare = sk.random() < 0.1 ? 3 : sk.random() < 0.4 ? 2 : 1;

    const randomBrush = selectRandomBrush();

    sk.push();
    sk.translate(x, y);
    for (let i = 0; i < linesPerSquare; i++) {
      drawLine(lineOptions[randomIndex()], randomBrush);
    }
    sk.pop();
  }

  function drawSquare(x, y, length = 60) {
    const randomBrush = selectRandomBrush();
    const randomColor = selectRandomColor();

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
    sk.createCanvas(length * 16, length * 8, sk.WEBGL);
    brush.load();
    brush.field("truncated");
    sk.angleMode(sk.DEGREES);
    sk.background("white");
    sk.frameRate(30);

    backgroundColor = selectRandomColor();
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
