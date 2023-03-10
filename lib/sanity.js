import Image from 'next/image';
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText as PortbaleTextComponent } from '@portabletext/react';
import { config } from './config';
import GetImage from '../utils/getImage';

if (!config.projectId) {
  throw Error('The Project ID is not set. Check your environment variables.');
}

export const urlFor = (source) => imageUrlBuilder(config).image(source);

export const imageBuilder = (source) => imageUrlBuilder(config).image(source);

// TODO: Add preview subscription from next-sanity
// usePreviewSubscription

// Barebones lazy-loaded image component
const ImageComponent = ({ value }) => {
  const imageProps = value ? GetImage(value) : null;
  return (
    <Image
      src={imageProps.src}
      loader={imageProps.loader}
      width={imageProps.width}
      height={imageProps.height}
      alt={value.alt || ' '}
      sizes='(max-width: 800px) 100vw, 800px'
      loading='lazy'
      className='object-cover'
    />
  );
};

const components = {
  types: {
    image: ImageComponent,
    code: (props) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
  marks: {
    center: (props) => <div className='text-center'>{props.children}</div>,
    highlight: (props) => (
      <span className='font-bold text-brand-primary'>{props.children}</span>
    ),
    link: (props) => (
      <a href={props.value?.href} target='_blank' rel='noopener noreferrer'>
        {props.children}
      </a>
    ),
  },
};

// Set up Portable text serialization
export const PortableText = (props) => (
  <PortbaleTextComponent components={components} {...props} />
);

const client = createClient(config);

export const previewClient = createClient({
  ...config,
  useCdn: false,
});

export const getClient = (usePreview) => (usePreview ? previewClient : client);

export default client;
