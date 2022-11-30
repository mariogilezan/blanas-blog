import Link from 'next/link';
import Label from '../ui/label';

export default function CategoryLabel({ categories }) {
  return (
    <div className='flex gap-3'>
      {categories?.length &&
        categories.slice(0).map((category, index) => (
          <Link href='#' key={index}>
            <Label color={category.color}>{category.title}</Label>
          </Link>
        ))}
    </div>
  );
}
