export default function<TInput, TOutput> (map: { [key: string]: TInput }, reducer: (result: TOutput, value: TInput, key: string) => TOutput, initial: TOutput): TOutput {
  return Object.keys(map).reduce((result: TOutput, key: string) => {
    return reducer(result, map[key], key);
  }, initial);
}
