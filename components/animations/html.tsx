import { Animate, Duration } from "liqvid";

const defaultDuration = new Duration({ ms: 300 });

export function FadeIn<M extends string>({
  endValue = 1,
  ...props
}: {
  endValue?: number;
} & Partial<React.ComponentProps<typeof Animate<M>>>) {
  return (
    <Animate<M>
      duration={defaultDuration}
      easing="ease-in"
      fill="both"
      keyframes={[{ opacity: 0 }, { opacity: endValue }]}
      {...props}
    />
  );
}
