import {useEffect, useState} from "react";

import {AngleControl} from "./components/AngleControl";
import {Circle} from "./components/Circle";
import {Line} from "./components/Line";
import {useStore} from "./store";

import styles from "./App.module.scss";

function App() {
  const state = useStore();
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    useStore.setState({line: parseFloat(e.currentTarget.value)});
  };

  const step = 0.01;

  return (
    <main>
      <form className={styles.form}>
        <input
          className={styles.lineInput}
          min={0}
          max={1}
          step={step}
          type="range"
          onChange={onChange}
          value={state.line}
        />
        <AngleControl
          value={state.circle}
          onChange={(circle) => useStore.setState({circle})}
        />
      </form>
      <Kbd />

      <svg className={styles.diagram} viewBox="-100 -50 200 100">
        <Line x="-80" y="-50" width="50" />
        <Circle x="20" y="-50" width="50" />
      </svg>
    </main>
  );
}

export default App;

function Kbd() {
  const [state, setState] = useState<string>("");

  useEffect(() => {
    const set = (e: KeyboardEvent) => setState(e.key);
    const unset = () => setState("");

    document.addEventListener("keydown", set);
    document.addEventListener("keyup", unset);

    return () => {
      document.removeEventListener("keydown", set);
      document.removeEventListener("keyup", unset);
    };
  }, []);
  return <kbd className={styles.kbd}>{state}</kbd>;
}
