export type Pt2 = [number, number];

export type Pt3 = [number, number, number];

export type GuaranteedMap<K, V> = Omit<Map<K, V>, "get"> & {
  get(key: K): V;
};

// biome-ignore lint/suspicious/noExplicitAny: variance
export type MapValue<M extends Map<any, any>> =
  M extends Map<any, infer V> ? V : never;

export type Unsubscribe = () => void;
