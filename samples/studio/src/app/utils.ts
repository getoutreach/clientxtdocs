export const isUrl = (url: string): boolean => {
  if (!url) {
    return false;
  }

  // eslint-disable-next-line
  return /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
    url
  );
};
