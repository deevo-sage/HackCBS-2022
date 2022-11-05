export const addressCompress = (str: string) => {
  if (!str) return;
  return str.substring(0, 10) + "..." + str.substring(str.length - 4);
};
