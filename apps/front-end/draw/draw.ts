import { BACKEND_URL } from '@/config';
import axios from 'axios';

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "pencil";
      points: { x: number; y: number }[];
    };

export async function initdraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.scale(dpr, dpr);

  ctx.lineWidth = 2;
  ctx.strokeStyle = "white";

  let existingShapes: Shape[] = await getExistingShapes(roomId);

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "chat") {
      const parsedShape = JSON.parse(message.message);
      existingShapes.push(parsedShape.shape);
      clearCanvas(existingShapes, canvas, ctx);
    }
  };

  clearCanvas(existingShapes, canvas, ctx);

  let clicked = false;
  let startX = 0;
  let startY = 0;
  let pencilPoints: { x: number; y: number }[] = [];

  const getPos = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    const { x, y } = getPos(e);
    startX = x;
    startY = y;
    pencilPoints = [{ x, y }];
  });

  canvas.addEventListener("mouseup", (e) => {
    if (!clicked) return;
    clicked = false;

    const { x, y } = getPos(e);
    const width = x - startX;
    const height = y - startY;

    // @ts-ignore
    const selectedTool = window.selectedTool;

    let shape: Shape | null = null;

    if (selectedTool === "rect") {
      shape = {
        type: "rect",
        x: startX,
        y: startY,
        width,
        height,
      };
    } else if (selectedTool === "circle") {
      const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
      shape = {
        type: "circle",
        centerX: startX + radius,
        centerY: startY + radius,
        radius,
      };
    } else if (selectedTool === "pencil") {
      shape = {
        type: "pencil",
        points: pencilPoints,
      };
    }

    if (!shape) return;

    existingShapes.push(shape);

    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({ shape }),
        roomId,
      })
    );
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!clicked) return;

    const { x, y } = getPos(e);
    clearCanvas(existingShapes, canvas, ctx);

    // @ts-ignore
    const selectedTool = window.selectedTool;

    if (selectedTool === "rect") {
      ctx.strokeRect(startX, startY, x - startX, y - startY);
    } else if (selectedTool === "circle") {
      const radius = Math.max(Math.abs(x - startX), Math.abs(y - startY)) / 2;
      ctx.beginPath();
      ctx.arc(startX + radius, startY + radius, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    } else if (selectedTool === "pencil") {
      pencilPoints.push({ x, y });
      ctx.beginPath();
      ctx.moveTo(pencilPoints[0].x, pencilPoints[0].y);
      for (let p of pencilPoints) {
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.closePath();
    }
  });
}

function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "white";

  for (const shape of existingShapes) {
    if (shape.type === "rect") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
    } else if (shape.type === "pencil") {
      ctx.beginPath();
      ctx.moveTo(shape.points[0].x, shape.points[0].y);
      for (let p of shape.points) {
        ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.closePath();
    }
  }
}

async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
  return res.data.messages.map((x: { message: string }) => {
    return JSON.parse(x.message).shape;
  });
}
