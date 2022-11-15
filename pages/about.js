import Link from 'next/link';

export default function About() {
  return (
    <div>
      <div>
        <nav>
          <div>
            <h1>
              <Link href='/'>Food Ninja</Link>
            </h1>
          </div>
          <ul>
            <li>
              <Link href='/'>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href='/about'>
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link href='/contact'>
                <span>Contact</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>{' '}
      {/* end nav */}
      <main className='mt-20'>
        <h1 className='text-4xl text-red-500'>About</h1>
      </main>
    </div>
  );
}
