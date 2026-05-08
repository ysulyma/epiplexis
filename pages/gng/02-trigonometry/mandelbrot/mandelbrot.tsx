import { lerp } from "@liqvid/utils/misc";
import { useEffect, useEffectEvent, useRef, useState } from "react";

type Bounds = {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
};

const trials = 100;

export default function Mandelbrot() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [bounds, setBounds] = useState<Bounds>({
    // xMin: -0.56,
    // xMax: -0.53,
    // yMin: -0.545,
    // yMax: -0.52,
    xMax: 0.5,
    xMin: -2,
    yMax: 1,
    yMin: -1,
  });

  const resize = useEffectEvent(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const { height, width } = canvas.getBoundingClientRect();
    canvas.height = height;
    canvas.width = width;
  });

  const redraw = useEffectEvent(() => {
    // get vars
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { height, width } = canvas;

    // faster to do with imagedata
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;

    // iterate over pixels
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        // get behavior of number
        const z = {
          im: lerp(bounds.yMin, bounds.yMax, y / height),
          re: lerp(bounds.xMin, bounds.xMax, x / width),
        };

        const escapeTime = behavior(z);

        // color the pixel
        const r = Math.floor(escapeTime / trials) * 0x03;
        const g = Math.floor(escapeTime / trials) * 0x69;
        const b = Math.floor(escapeTime / trials) * 0xa1;
        const alpha = 255;

        // draw the pixel
        const offset = (y * width + x) * 4;
        pixels[offset] = r;
        pixels[offset + 1] = g;
        pixels[offset + 2] = b;
        pixels[offset + 3] = alpha;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  });

  useEffect(() => {
    resize();
    redraw();
  }, []);

  const timeout = useRef<number>(null);
  const zoom = (e: React.WheelEvent<HTMLCanvasElement>) => {
    return;
    const canvas = ref.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const percent = [
      (e.clientX - rect.left) / rect.width,
      (e.clientY - rect.top) / rect.height,
    ];

    const z = {
      im: lerp(bounds.yMin, bounds.yMax, percent[1]),
      re: lerp(bounds.xMin, bounds.xMax, percent[0]),
    };

    const boundsWidth = bounds.xMax - bounds.xMin;
    const boundsHeight = bounds.yMax - bounds.yMin;

    const newWidth = boundsWidth * (e.deltaY > 0 ? 1.1 : 0.9);
    const newHeight = boundsHeight * (e.deltaY > 0 ? 1.1 : 0.9);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      setBounds((prev) => ({
        xMax: prev.xMin + newWidth + z.re,
        xMin: prev.xMin,
        yMax: prev.yMin + newHeight + z.im,
        yMin: prev.yMin,
      }));
    }, 500);
  };

  return <canvas className="h-screen w-screen" onWheel={zoom} ref={ref} />;
}

type Complex = {
  /** Real part */
  re: number;

  /** Imaginary part */
  im: number;
};

function add(a: Complex, b: Complex): Complex {
  return { im: a.im + b.im, re: a.re + b.re };
}

function mul(a: Complex, b: Complex): Complex {
  return {
    im: a.re * b.im + a.im * b.re,
    re: a.re * b.re - a.im * b.im,
  };
}

function normSquared(z: Complex): number {
  return z.re * z.re + z.im * z.im;
}

function behavior(c: Complex): number {
  let z = { im: 0, re: 0 };
  let n = 0;
  while (n <= trials && normSquared(z) < 4) {
    z = add(mul(z, z), c);
    n++;
  }
  return n;
}
