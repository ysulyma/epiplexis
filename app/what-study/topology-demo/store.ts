import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useStore = create(
  subscribeWithSelector(() => ({
    circle: 0,
    line: 0,
  })),
);
