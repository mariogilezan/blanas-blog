export const cx = (...classNames) => classNames.filter(Boolean).join(' ');

/**
 Because we use sanity-next-image, vercel throws error when using normal imports
 **/
export const myLoader = ({ src }) => src;
