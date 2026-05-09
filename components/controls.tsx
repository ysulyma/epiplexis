import {
  ArrowsInIcon,
  ArrowsOutIcon,
  PauseIcon,
  PlayIcon,
} from "@phosphor-icons/react";
import { Controls } from "liqvid";

import { shortcuts } from "./shortcuts.ts";

const iconClassName = "!h-[calc(var(--lv-controls-height)*0.45)] w-auto";

/** @package Fullscreen control */
export function FullScreen() {
  return (
    <Controls.FullScreen
      render={({ isFullScreen }, props) => {
        const label =
          (isFullScreen ? "Exit full screen" : "Full screen") + " (f)";

        return (
          <button aria-label={label} title={label} {...props}>
            {isFullScreen ? (
              <ArrowsInIcon className={iconClassName} weight="bold" />
            ) : (
              <ArrowsOutIcon className={iconClassName} weight="bold" />
            )}
          </button>
        );
      }}
      shortcuts={shortcuts.fullscreen}
    />
  );
}

/** @package Control for playing/pausing */
export function PlayPause() {
  return (
    <Controls.PlayPause
      render={({ paused, seeking }, { ...props }) => {
        const label = (paused || seeking ? "Play" : "Pause") + " (k)";
        return (
          <button aria-label={label} title={label} {...props}>
            {paused || seeking ? (
              <PlayIcon className={iconClassName} weight="fill" />
            ) : (
              <PauseIcon className={iconClassName} weight="fill" />
            )}
          </button>
        );
      }}
      shortcuts={shortcuts.playPause}
    />
  );
}
