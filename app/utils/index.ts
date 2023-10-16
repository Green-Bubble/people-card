export function snakeToCamel(str: string) {
  const res = str.replace(/_([a-z])/g, function (match, letter) {
    return letter.toUpperCase();
  });
  const camel = res[0].toUpperCase() + res.slice(1);
  return camel;
}
