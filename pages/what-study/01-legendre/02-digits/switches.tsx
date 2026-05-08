import { useState } from "react";

import { Switch } from "@/components/ui/switch.tsx";

const Th = (props: React.HTMLProps<HTMLTableCellElement>) => (
  <th className="px-4 py-2 text-right" {...props} />
);

const Td = (props: React.HTMLProps<HTMLTableCellElement>) => (
  <td className="px-4 py-2 text-center" {...props} />
);

export default function Switches() {
  const options = [
    "Bacon",
    "Egg",
    "Cheese",
    "Hashbrown",
    "Avocado",
    "Tomato",
    "Onion",
  ];
  const [state, setState] = useState(0);

  return (
    <main>
      <h1 className="mx-auto mb-4 text-center text-3xl">
        Make the perfect sandwich
      </h1>
      <div className="mx-auto flex max-w-lg justify-between">
        <table>
          <tbody>
            {options.map((option, i) => (
              <tr key={option}>
                <Th>{option}</Th>
                <Td>
                  <Switch
                    checked={state & (1 << i)}
                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR
                    onCheckedChange={() => setState((prev) => prev ^ (1 << i))}
                  />
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
        <output className="text-4xl">
          <p>
            Binary:{" "}
            <span className="font-mono">
              {state.toString(2).padStart(options.length, "0")}
            </span>
          </p>
          <p>
            Decimal: <span className="font-mono">{state}</span>
          </p>
        </output>
      </div>
    </main>
  );
}
