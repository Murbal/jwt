export type Primitive = string | number | symbol | bigint | boolean;
export type DictionaryKey = string | number | symbol;
export type Dictionary<Value = any, Key = any> = Record<
  Extract<DictionaryKey, Key>,
  Value
>;
export type Keys<Obj extends Dictionary> = keyof Obj;
