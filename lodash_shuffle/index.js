const copyArray = ary => !ary ? [] : Array.prototype.slice.call(ary);

function shuffle(arr = []) {
  const { length } = arr;
  if (!length) return arr;

  let index = -1;
  let lastIndex = length - 1;
  const result = copyArray(arr);

  while (++index < length) {
    const seed = Math.floor(Math.random() * (lastIndex - index + 1));
    const value = result[seed];
    result[seed] = result[index];
    result[index] = value;
  }

  return result;
}

console.log(shuffle(null));
