import {create} from "zustand";
import {subscribeWithSelector} from "zustand/middleware";

export const useStore = create(
  subscribeWithSelector(() => ({
    z: 0,
  }))
);
