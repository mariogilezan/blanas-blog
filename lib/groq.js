import { groq } from 'next-sanity';

export const postQuery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
  ...,
  author->,
  categories[]->
}
`;

export const configQuery = groq`
*[_type == "siteconfig"][0] {
  ...
}
`;

export const singlePostQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ...,
  author->,
  categories[]->,
  "estReadTime": round(length(pt::text(body)) / 5 / 180)
}
`;

export const pathPostQuery = groq`
*[_type == "post"] {
  "slug": slug.current
}
`;

export const authorsQuery = groq`
*[_type == "author"] {
  ...
}
`;
