import type { Controls } from "liqvid";

/**
 * @package
 * Configure shortcuts here so they can be referenced by `<KeyboardShortcuts>`
 */
export const shortcuts = {
  captions: "C",
  colorScheme: "Meta+'",
  fullscreen: "F",
  mute: "M",
  playPause: ["K", "Space"],

  script: {
    back: "W",
    forward: "E",
  },
  seeking: {
    percentage: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(
      (num): Controls.PercentageSeekShortcut => ({
        key: num.toString(),
        multiplier: num / 10,
      }),
    ),
    relative: [
      { delta: { seconds: -5 }, key: "ArrowLeft" },
      { delta: { seconds: 5 }, key: "ArrowRight" },
      { delta: { seconds: -10 }, key: "J" },
      { delta: { seconds: 10 }, key: "L" },
    ],
  } as Controls.ScrubberBarProps["shortcuts"],

  togglePrompts: "P",

  volume: [
    { delta: -5, seq: "ArrowDown" },
    { delta: 5, seq: "ArrowUp" },
  ] satisfies Controls.VolumeShortcut[],
};
