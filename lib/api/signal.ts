"use client";

import { bind } from "@liqvid/utils";
import { useEffect, useState } from "react";

export class Signal<T> {
  #listeners: Set<(value: T) => void>;
  #value: T;

  constructor(initial: T) {
    this.#listeners = new Set();
    this.#value = initial;

    bind(this, ["get", "set", "subscribe"]);
  }

  get() {
    return this.#value;
  }

  set(value: T) {
    this.#value = value;
    for (const listener of this.#listeners) {
      listener(this.#value);
    }
  }

  subscribe(listener: (value: T) => void) {
    this.#listeners.add(listener);

    return () => {
      this.#listeners.delete(listener);
    };
  }
}

export function useSignal<T>(
  signal: Signal<T>,
  callback: (value: T) => unknown,
) {
  useEffect(() => signal.subscribe(callback), [callback, signal]);
}

export function useSignalValue<T>(signal: Signal<T>) {
  const [state, setState] = useState(signal.get);
  useSignal(signal, setState);
  return state;
}
