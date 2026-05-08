import { KTX } from "@/components/KTX.tsx";
import { useSignalValue } from "@/lib/api/signal.ts";
import { truncate } from "@/lib/math.ts";

import { zSignal } from "../state.ts";

const { raw } = String;

/** Form for adjusting the plane position */
export function Form() {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const z = Number.parseFloat(e.currentTarget.value);
    if (!Number.isNaN(z)) {
      zSignal.set(z);
    }
  };

  const z = useSignalValue(zSignal);

  const inputProps = {
    max: 1,
    min: -1,
    onChange,
  };

  return (
    <form className="w-full text-center">
      <p>
        Adjust the slider to see different cross-sections (implicit curves) of
        the implicit surface
        <KTX display>{raw`
        2y(y^{2}-3x^{2})(1-z^{2})+(x^{2}+y^{2})^{2}-(9z^{2}-1)(1-z^{2})=0.
        `}</KTX>
      </p>
      <div className="mx-auto my-4 flex w-max items-center gap-4 text-2xl">
        <input step="any" type="range" {...inputProps} value={z} />
        <input
          className="w-20 appearance-none bg-[#0001] text-right dark:bg-[#fff3]"
          step="0.05"
          type="number"
          value={truncate(z, 2)}
          {...inputProps}
        />
      </div>
    </form>
  );
}

// input[type='number'] {
//     -moz-appearance:textfield;
// }

// input::-webkit-outer-spin-button,
// input::-webkit-inner-spin-button {
//     -webkit-appearance: none;
// }
