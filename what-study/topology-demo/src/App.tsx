import {useId, useRef} from "react";

import {AngleControl} from "./components/AngleControl";
import {Circle} from "./components/Circle";
import {DarkTheme} from "./components/DarkTheme";
import {Line} from "./components/Line";
import {ScaleProvider} from "./components/Scale";
import {useStore} from "./store";

import styles from "./App.module.scss";

function App() {
  const state = useStore();
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    useStore.setState({line: parseFloat(e.currentTarget.value)});
  };

  const step = 0.01;

  const rangeId = useId();
  const circleId = useId();

  const ref = useRef<SVGSVGElement>(null);

  return (
    <main className={styles.main}>
      <DarkTheme />
      <form className={styles.form}>
        <p>
          Use the sliders to adjust the position of the points on the curves
        </p>
        <div className={styles.flex}>
          <input
            className={styles.lineInput}
            id={rangeId}
            min={0}
            max={1}
            step={step}
            type="range"
            onChange={onChange}
            value={state.line}
          />
          <AngleControl
            id={circleId}
            value={state.circle}
            onChange={(circle) => useStore.setState({circle})}
          />
        </div>
      </form>

      <svg className={styles.diagram} viewBox="-120 -50 240 100" ref={ref}>
        <ScaleProvider svg={ref}>
          <Line x="-110" y="-50" width="90" />
          <Circle x="30" y="-50" width="90" />
        </ScaleProvider>
      </svg>
    </main>
  );
}

export default App;
