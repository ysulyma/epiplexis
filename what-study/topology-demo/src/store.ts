import {create} from "zustand";
import {subscribeWithSelector} from "zustand/middleware";

export const useStore = create(
  subscribeWithSelector(() => ({
    line: 0,
    circle: 0,
  }))
);
