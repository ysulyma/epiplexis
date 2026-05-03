import { useId, useMemo, useRef } from "react";

export default function Demo() {
  return (
    <main className="min-h-screen min-w-screen">
      <Popup title="Demo">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Popup>
    </main>
  );
}

/** Draggable popup */
function Popup({
  children,
  title,
}: {
  children: React.ReactNode;
  title: React.ReactNode;
}) {
  const headerId = useId();

  const { anchorEvents, ref } = useDragElement();

  return (
    <aside
      aria-labelledby={headerId}
      className="max-w-[600px] overflow-hidden rounded-md border border-gray-200 border-solid shadow"
      ref={ref}
      role="dialog"
    >
      <header
        className="select-none bg-purple-600 px-2 py-1 text-white"
        id={headerId}
        {...anchorEvents}
      >
        {title}
      </header>
      <div className="px-2 py-1">{children}</div>
    </aside>
  );
}

/**
 * Provides generic drag functionality
 * @returns An object of event handlers to spread onto the target
 */
function useDrag<T = Element>(opts: {
  down?: React.PointerEventHandler<T>;
  leave?: (e: PointerEvent) => unknown;
  move: (e: PointerEvent) => unknown;
  up?: (e: PointerEvent) => unknown;
}) {
  const onPointerDown = useMemo(() => {
    // pointer event handlers
    const onPointerUp = (e: PointerEvent) => {
      opts.up?.(e);
      unsubscribe();
    };

    const onPointerLeave = (e: PointerEvent) => {
      opts.leave?.(e);
      unsubscribe();
    };

    /** Remove event handlers from document.body */
    const unsubscribe = () => {
      document.body.removeEventListener("pointerleave", onPointerLeave);
      document.body.removeEventListener("pointermove", opts.move);
      document.body.removeEventListener("pointerup", onPointerUp);
    };

    const onPointerDown: React.PointerEventHandler<T> = (e) => {
      opts.down?.(e);

      // attach event handlers
      document.body.addEventListener("pointerleave", onPointerLeave);
      document.body.addEventListener("pointermove", opts.move);
      document.body.addEventListener("pointerup", onPointerUp);
    };

    return onPointerDown;
  }, [opts.leave, opts.move, opts.up, opts.down]);

  return { onPointerDown };
}

/** Provides functionality to drag an element */
function useDragElement<TRoot extends HTMLElement, TAnchor extends Element>(): {
  /** Events to spread onto the dragging "anchor" */
  anchorEvents: {
    onPointerDown: React.PointerEventHandler<TAnchor>;
  };

  /** Ref to attach to the object you wish to make draggable. */
  ref: React.RefObject<TRoot>;
} {
  const ref = useRef<TRoot>(null);

  const offset = useRef({ x: 0, y: 0 });

  const anchorEvents = useDrag(
    useMemo(
      () => ({
        down: (e: React.PointerEvent<TAnchor>) => {
          if (!ref.current) return;

          // set offset
          const rect = ref.current.getBoundingClientRect();
          offset.current = { x: rect.x - e.clientX, y: rect.y - e.clientY };
        },
        move: (e: PointerEvent) => {
          if (!ref.current) return;
          const x = e.clientX + offset.current.x;
          const y = e.clientY + offset.current.y;
          ref.current.style.translate = `${x}px ${y}px`;
        },
      }),
      [],
    ),
  );

  return {
    anchorEvents,
    ref,
  };
}
