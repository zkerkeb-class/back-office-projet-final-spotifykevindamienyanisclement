const normalizeSoundUrl = (url: string | undefined | null): string => {
  if (!url) return '';

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  if (url.startsWith('uploads/') || url.startsWith('uploads\\')) {
    return `${process.env.NEXT_PUBLIC_API_URL}/${url}`;
  }

  return url;
};

export default normalizeSoundUrl;
