import {InlineMath as KTX} from "react-katex";

import {useStore} from "../store";

import styles from "./Form.module.css";

const {raw} = String;

/** Form for adjusting the plane position */
export function Form() {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const z = parseFloat(e.currentTarget.value);
    if (!isNaN(z)) {
      useStore.setState({z});
    }
  };
  return (
    <form className={styles.form}>
      <p>
        Adjust the slider to see different cross-sections (implicit curves) of
        the implicit surface{" "}
        <KTX>{raw`
        2y(y^{2}-3x^{2})(1-z^{2})+(x^{2}+y^{2})^{2}-(9z^{2}-1)(1-z^{2})=0.
        `}</KTX>
      </p>
      <input min="-1" max="1" step="any" type="range" onChange={onChange} />
    </form>
  );
}
