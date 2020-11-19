interface cloudinaryOptions {
  w: number;
  h: number;
  c: string;
  dpr: number;
}

const cloudinary = (url: string, options: cloudinaryOptions, format = 'jpg') => {
  let explodedUrl = url.split('.');

  explodedUrl[explodedUrl.length - 1] = format;

  const formattedUrl = explodedUrl.join('.');

  const anchor = `image/upload/`;

  const firstIndex = formattedUrl.indexOf(anchor);

  const insertIndex = firstIndex + anchor.length;

  const filters = Object.entries(options)
    .map(([key, value]) => `${key}_${value}`)
    .join(',');

  return [formattedUrl.slice(0, insertIndex), `${filters}/`, formattedUrl.slice(insertIndex)].join(
    '',
  );
};

export default cloudinary;
