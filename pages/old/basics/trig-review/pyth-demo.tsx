const { raw } = String;

import { useEffect, useRef } from "react";

import { KTX } from "@/components/KTX";

export default function PythagorasDemo() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    function update() {
      if (!ref.current) return;
      const width = parseFloat(getComputedStyle(ref.current).width);
      ref.current.style.fontSize = `${width / 0.2 / 100}px`;
    }

    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <figure
      ref={ref}
      style={{
        margin: "1.5em auto",
        position: "relative",
        width: "50%",
      }}
    >
      <svg viewBox="-5 -5 110 60" width="100%">
        <path
          className="stroke-black dark:stroke-white"
          d="M 0 50 L 100 0 v 50 z"
          fill="#AE81FF"
        />
        <path
          className="stroke-black dark:stroke-white"
          d="M 100 50 m -10 0 v -10 h 10"
          fill="none"
        />
      </svg>
      <KTX
        style={{ left: "1em", position: "absolute", top: "9.5em" }}
      >{raw`${"\\"}underbrace{\hspace{15em}}_{\displaystyle a}`}</KTX>
      <KTX
        style={{
          position: "absolute",
          right: "-4em",
          top: "4.5em",
          transform: "rotate(-90deg)",
        }}
      >{raw`${"\\"}underbrace{\hspace{7.5em}}`}</KTX>
      <KTX
        style={{
          left: "0%",
          position: "absolute",
          top: "4em",
          transform: "rotate(153.43deg)",
        }}
      >{raw`${"\\"}underbrace{\hspace{16.5em}}`}</KTX>
      <KTX
        style={{
          position: "absolute",
          right: "-1.5em",
          top: "43%",
        }}
      >
        b
      </KTX>
      <KTX
        style={{
          left: "44%",
          position: "absolute",
          top: "2.5em",
        }}
      >
        c
      </KTX>
    </figure>
  );
}
