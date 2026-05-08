import {
  blue800,
  hexColor,
  purple800,
  red800,
} from "@/components/three/theme.ts";
import { fakeMinus } from "@/lib/utils.ts";

/** @package */
export function format(num: number) {
  return fakeMinus(num.toFixed(2));
}

// theme

/** @package */
export const leftColor = hexColor(blue800);

/** @package */
export const rightColor = hexColor(red800);

/** @package */
export const resultColor = hexColor(purple800);
