export type Pt2 = [number, number];

export type Pt3 = [number, number, number];

export type GuaranteedMap<K, V> = Omit<Map<K, V>, "get"> & {
  get(key: K): V;
};

export type MapValue<M extends Map<unknown, unknown>> =
  M extends Map<unknown, infer V> ? V : never;

export type Unsubscribe = () => void;
