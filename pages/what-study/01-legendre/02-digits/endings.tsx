import { range } from "@liqvid/utils";

import { KTX } from "@/components/KTX.tsx";

const Th = (props: React.HTMLProps<HTMLTableCellElement>) => (
  <th
    className="bg-stone-400 px-4 py-2 text-right dark:bg-stone-700"
    {...props}
  />
);

const Td = (props: React.HTMLProps<HTMLTableCellElement>) => (
  <td className="mono px-4 py-2 text-right" {...props} />
);

export default function Endings() {
  return (
    <main>
      <div className="mx-auto flex max-w-2xl justify-between">
        <BaseTable bases={[10, 2, 5]} nums={range(0, 5)} />
        <BaseTable bases={[10, 2, 5]} nums={range(5, 10)} />
      </div>
    </main>
  );
}

export function BaseTable({
  bases,
  nums,
}: {
  bases: number[];
  nums: number[];
}) {
  return (
    <table>
      <thead>
        <tr>
          {bases.map((b) => (
            <Th key={b}>Base {b}</Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {nums.map((n) => (
          <tr className="odd:bg-stone-100 dark:odd:bg-stone-600" key={n}>
            {bases.map((b) => (
              <Td key={b}>
                <KTX>{n.toString(b)}</KTX>
              </Td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
