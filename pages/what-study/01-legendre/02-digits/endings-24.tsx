import { range } from "@liqvid/utils/misc";

import { BaseTable } from "./endings.tsx";

export default function Endings() {
  return (
    <main>
      <div className="mx-auto flex max-w-2xl justify-between">
        <BaseTable bases={[10, 2, 4]} nums={range(0, 4)} />
        <BaseTable bases={[10, 2, 4]} nums={range(4, 8)} />
      </div>
    </main>
  );
}
