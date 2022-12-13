import Container from './container';
import ThemeSwitch from './themeSwitch';

export default function Footer(props) {
  return (
    <Container className='mt-10 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-6 items-center'>
      <ThemeSwitch />
      <div className='text-sm text-center pb-2'>
        &copy; {new Date().getFullYear()} {props?.copyright}. All rights
        reserved.
      </div>
    </Container>
  );
}
