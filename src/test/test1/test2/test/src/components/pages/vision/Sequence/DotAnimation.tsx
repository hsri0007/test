import { useCallback, useEffect, useRef, useState } from 'react';

import { SeededRandom, reverseNumber } from '~/utils';

const CANVAS_SIZE = 560;
const DOT_COUNT = 80;

interface Dot {
  pos: { x: number; y: number };
  target: { x: number; y: number };
  size: number;
  targetSize: number;
  opacity: number;
  targetOpacity: number;
  colored: boolean;
}

interface DotAnimationProps {
  animation?: number; // 0 - 3
  className?: string;
}

export const DotAnimation = (props: DotAnimationProps) => {
  const { animation, className } = props;
  const [isSetup, setIsSetup] = useState(false);
  const dots = useRef<Dot[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  let dpr = useRef<number>(2);
  let frame = useRef<number>(0);

  const setupDots = useCallback(() => {
    if (!isSetup) {
      for (let i = 0; i < DOT_COUNT; i++) {
        dots.current[i] = {
          pos: { x: CANVAS_SIZE * 0.5, y: CANVAS_SIZE * 0.5 },
          target: { x: CANVAS_SIZE * 0.5, y: CANVAS_SIZE * 0.5 },
          size: 0,
          targetSize: 0,
          opacity: 0,
          targetOpacity: 0,
          colored: false,
        };
      }
    }
  }, [isSetup]);

  const getPositionInRing = (current: number, total: number, radius: number, ratio?: number) => {
    const ovalRatio = ratio === undefined ? 1 : ratio;
    const pos = { x: 0, y: 0 };
    pos.x = CANVAS_SIZE * 0.5 + radius * Math.cos((2 * Math.PI * current) / total);
    pos.y = CANVAS_SIZE * 0.5 + ovalRatio * radius * Math.sin((2 * Math.PI * current) / total);
    return pos;
  };

  const updateDot = useCallback(
    (index: number, RNG: SeededRandom) => {
      const dot = dots.current[index];
      dot.colored = false;
      dot.targetOpacity = 1;
      dot.target = { x: CANVAS_SIZE * 0.5, y: CANVAS_SIZE * 0.5 };
      if (animation === 0) {
        if (index === 0) {
          dot.targetSize = 14;
          dot.colored = true;
        } else if (index < 19) {
          dot.target = getPositionInRing(
            1 + index + (frame.current % 7500) * 0.0075,
            18,
            CANVAS_SIZE * 0.45
          );
          dot.targetSize = 14;
        } else if (index < 28) {
          dot.target = getPositionInRing(
            19 + index - (frame.current % 5000) * 0.005,
            9,
            CANVAS_SIZE * 0.3
          );
          dot.targetSize = 10;
        } else if (index < 32) {
          dot.target = getPositionInRing(
            28 + index + (frame.current % 3000) * 0.003,
            4,
            CANVAS_SIZE * 0.15
          );
          dot.targetSize = 5;
        } else {
          dot.targetSize = 0;
          dot.targetOpacity = 0;
        }
      } else if (animation === 1) {
        if (index === 0) {
          dot.targetSize = 7;
          dot.colored = true;
        } else if (index === 1) {
          dot.target = getPositionInRing(
            (frame.current % 7500) * 0.0075,
            2,
            CANVAS_SIZE * 0.35 - Math.abs((frame.current % 500) - 250) * 0.25
          );
          dot.targetSize = 10;
        } else if (index === 10) {
          dot.target = getPositionInRing(
            1 + (frame.current % 7500) * 0.0075,
            2,
            CANVAS_SIZE * 0.35 - Math.abs((frame.current % 500) - 250) * 0.25
          );
          dot.targetSize = 10;
        } else {
          dot.targetSize = 0;
          dot.targetOpacity = 0;
        }
      } else if (animation === 2) {
        if (index < 32) {
          dot.colored = !!Math.round(RNG.random(0, 0.6));
          if (dot.colored) {
            dot.targetOpacity = 1;
            dot.targetSize = Math.round(RNG.random(4, 16));
          } else {
            dot.targetOpacity = RNG.random(0.2, 2);
            dot.targetSize = Math.round((2 - dot.targetOpacity + 0.2) * 20);
          }
          const movementRate = Math.round(RNG.random(200, 500));
          dot.target = getPositionInRing(
            ((frame.current + index * 5) % movementRate) / movementRate,
            1,
            CANVAS_SIZE * RNG.random(0.02, 0.4)
          );
        } else {
          dot.targetSize = 0;
          dot.targetOpacity = 0;
        }
      } else if (animation === 3) {
        dot.targetSize = 5;
        if (index < 10) {
          dot.target = getPositionInRing(
            index - (frame.current % 5000) * 0.005,
            10,
            CANVAS_SIZE * 0.2,
            0.45
          );
          dot.targetOpacity = 1 - (CANVAS_SIZE * 0.5 - dot.target.y) / (CANVAS_SIZE * 0.2 * 0.45);
          dot.target.y += -135;
        } else if (index < 26) {
          dot.target = getPositionInRing(
            16 + index - (frame.current % 5000) * 0.005,
            16,
            CANVAS_SIZE * 0.34,
            0.45
          );
          dot.targetOpacity = 1 - (CANVAS_SIZE * 0.5 - dot.target.y) / (CANVAS_SIZE * 0.34 * 0.45);
          dot.target.y += -75;
        } else if (index < 50) {
          dot.target = getPositionInRing(
            26 + index - (frame.current % 5000) * 0.005,
            24,
            CANVAS_SIZE * 0.39,
            0.45
          );
          dot.targetOpacity = 1 - (CANVAS_SIZE * 0.5 - dot.target.y) / (CANVAS_SIZE * 0.39 * 0.45);
          dot.target.y += 0;
        } else if (index < 66) {
          dot.target = getPositionInRing(
            50 + index - (frame.current % 5000) * 0.005,
            16,
            CANVAS_SIZE * 0.34,
            0.45
          );
          dot.targetOpacity = 1 - (CANVAS_SIZE * 0.5 - dot.target.y) / (CANVAS_SIZE * 0.34 * 0.45);
          dot.target.y += 80;
        } else if (index < 78) {
          dot.target = getPositionInRing(
            index - (frame.current % 5000) * 0.005,
            10,
            CANVAS_SIZE * 0.2,
            0.45
          );
          dot.targetOpacity = 1 - (CANVAS_SIZE * 0.5 - dot.target.y) / (CANVAS_SIZE * 0.2 * 0.45);
          dot.target.y += 150;
        } else if (index < 79) {
          dot.target = { x: CANVAS_SIZE * 0.5, y: CANVAS_SIZE * 0.5 - 160 };
          dot.targetOpacity = 0.8;
        } else if (index < 80) {
          dot.target = { x: CANVAS_SIZE * 0.5, y: CANVAS_SIZE * 0.5 + 160 };
          dot.targetOpacity = 0.8;
        }
      } else {
        dot.targetSize = 0;
        dot.targetOpacity = 0;
      }
    },
    [animation]
  );

  const moveDot = (index: number) => {
    const dot = dots.current[index];
    const lerpFactor = 16;
    const opacityLerpFactor = 4;
    const x = (dot.pos.x * lerpFactor + dot.target.x) / (lerpFactor + 1);
    const y = (dot.pos.y * lerpFactor + dot.target.y) / (lerpFactor + 1);
    const size = (dot.size * lerpFactor + dot.targetSize) / (lerpFactor + 1);
    const opacity = (dot.opacity * opacityLerpFactor + dot.targetOpacity) / (opacityLerpFactor + 1);
    dot.pos = { x, y };
    dot.size = size;
    dot.opacity = opacity;
  };

  const drawDot = (dot: Dot) => {
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.beginPath();
      ctx.arc(dot.pos.x, dot.pos.y, dot.size, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(${dot.colored ? '16,248,228,' : '255,255,255,'}${dot.opacity})`;
      ctx.fill();
    }
  };

  const draw = useCallback(() => {
    clearTimeout(drawTimeout.current);
    const ctx = ctxRef.current;
    if (ctx) {
      // Clear the canvas
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      const RNG = new SeededRandom(83423);
      dots.current.forEach((_, index) => updateDot(index, RNG));
      dots.current.forEach((_, index) => moveDot(index));
      if (animation === 1) {
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.beginPath();
        ctx.moveTo(dots.current[1].pos.x, dots.current[1].pos.y);
        ctx.lineTo(dots.current[10].pos.x, dots.current[10].pos.y);
        ctx.stroke();
        ctx.strokeStyle = 'transparent';
      }
      // Reverse loop so the leftover dots are on the bottom
      for (let i = dots.current.length - 1; i >= 0; i--) {
        drawDot(dots.current[i]);
      }
      // Draw a new frame.current in a 60th of a second
      frame.current += 1;
      drawTimeout.current = setTimeout(() => draw(), 1000 / 60);
    }
  }, [animation, updateDot]);

  const setupCanvas = useCallback(() => {
    dpr.current = Math.ceil(window.devicePixelRatio) + 1 || 1;
    if (canvasRef.current) {
      canvasRef.current.width = CANVAS_SIZE * dpr.current;
      canvasRef.current.height = CANVAS_SIZE * dpr.current;
      ctxRef.current = canvasRef.current.getContext('2d');
      ctxRef.current?.scale(dpr.current, dpr.current);
    }
  }, []);

  useEffect(() => {
    if (isSetup) {
      clearTimeout(drawTimeout.current);
      setupCanvas();
      draw();
    }
    return () => {};
  }, [animation, draw, isSetup, setupCanvas]);

  useEffect(() => {
    setupCanvas();
    setupDots();
    setIsSetup(true);
    draw();
    return () => {};
  }, [draw, isSetup, setupCanvas, setupDots]);

  return (
    <div className={className}>
      <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} />
    </div>
  );
};
