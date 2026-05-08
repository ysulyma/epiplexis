import {
  blue800,
  hexColor,
  purple800,
  red800,
} from "@/components/three/theme.ts";
import { fakeMinus } from "@/lib/utils.ts";

export function format(num: number) {
  return fakeMinus(num.toFixed(2));
}

// theme
export const leftColor = hexColor(blue800);
export const rightColor = hexColor(red800);
export const resultColor = hexColor(purple800);
