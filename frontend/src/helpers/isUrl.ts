export const isUrl = (url: string) => {
  return /^(https?:\/\/)/.test(url);
};
