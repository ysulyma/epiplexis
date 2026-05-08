import "mafs/core.css";
import "mafs/font.css";
import "./style.css";

import { EpiplexisMathJaxContext } from "@/components/MathJaxContext.tsx";

import { ThreeD } from "./ThreeD.tsx";
import { TwoD } from "./TwoD.tsx";

export default function Add() {
  return (
    <EpiplexisMathJaxContext features={["input"]}>
      {/* this needs to be here, rather than style.css, due to CSS import order */}
      <style>{`
      .MafsView {
        --mafs-bg: transparent;
        --mafs-fg: #000;
        --mafs-line-color: #ddd;
      }

      :root.dark .MafsView {
        --mafs-fg: #fff;
        --mafs-line-color: #fff1;
      }
      `}</style>
      <div className="flex h-auto w-full items-center justify-between gap-8 px-8">
        <TwoD />
        <ThreeD />
      </div>
    </EpiplexisMathJaxContext>
  );
}
