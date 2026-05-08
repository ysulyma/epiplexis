import { type ClassValue, clsx } from "clsx";
import {
  Children,
  createContext,
  createElement,
  forwardRef,
  type JSX,
  useContext,
} from "react";
import type { ClassNameValue } from "tailwind-merge";
import { twMerge } from "tailwind-merge";

import type { Unsubscribe } from "./types.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get a styled component from a template. Handles forwarding refs.
 */
export function brand<TagName extends keyof JSX.IntrinsicElements>(
  displayName: string,
  template: React.ReactNode,
  mergeClassNames: (...args: ClassNameValue[]) => string = cn,
) {
  type Ref = React.ComponentRef<TagName>;
  type Props = JSX.IntrinsicElements[TagName];
  const node = Children.only(template) as React.ReactElement<Props, TagName>;
  const { className: templateClassName, ...templateProps } = node.props as {
    className?: string;
  } & typeof node.props;

  const component = (
    { className, ...props }: Props & { className?: string },
    ref: React.ForwardedRef<Ref>,
  ) =>
    createElement(node.type, {
      className: mergeClassNames(templateClassName, className),
      ...templateProps,
      ...props,
      ref,
    });
  component.displayName = displayName;

  return forwardRef(component);
}

/** Helper for creating a context */
export function makeContext<T>(initialValue: T) {
  const context = createContext<T>(initialValue);

  function useIt() {
    return useContext(context);
  }

  return { context, useIt };
}

export function fakeMinus(str: string) {
  return str.replace("-", "\u2212");
}

export const noop = () => {};

export function callAll(...fns: (() => unknown)[]): Unsubscribe {
  return () => {
    for (const fn of fns) {
      fn();
    }
  };
}
