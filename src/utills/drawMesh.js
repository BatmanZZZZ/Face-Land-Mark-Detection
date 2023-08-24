import { TRIANGULATION } from "./triangulation";


const featureColors = {
  faceOval: "red",
  nose: "yellow",
  rightEye: "green",
  leftEye: "yellow",
  lips: "pink",
  leftEyebrow:'yellow',
  rightEyebrow:'yellow',
};

export const drawMesh = (prediction, ctx) => {
  if (!prediction) return;
  const keyPoints = prediction.keypoints;
  console.log(keyPoints);
  if (!keyPoints) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Loop through keypoints
  for (let i = 0; i < TRIANGULATION.length / 3; i++) {
    const points = [
      TRIANGULATION[i * 3],
      TRIANGULATION[i * 3 + 1],
      TRIANGULATION[i * 3 + 2],
    ].map((index) => keyPoints[index]);

    // Find the name of the current point
    const featureName = points.find(point => point.name)?.name;
    const color = featureColors[featureName] || "blue";
    drawPath(ctx, points, true, color);
  }

  // Loop through keypoints again for circles
  for (let keyPoint of keyPoints) {
    ctx.beginPath();
    ctx.arc(keyPoint.x, keyPoint.y, 1, 0, 3 * Math.PI);

    // Use the name to determine color
    const featureName = keyPoint.name;
    const color = featureColors[featureName] || "blue";
    ctx.fillStyle = color;
    ctx.fill();
  }
};

const drawPath = (ctx, points, closePath, color) => {
  const region = new Path2D();
  region.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(point.x, point.y);
  }
  if (closePath) region.closePath();
  ctx.strokeStyle = color;
  ctx.stroke(region);
};
