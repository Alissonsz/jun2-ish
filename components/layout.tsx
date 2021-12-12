import Head from 'next/head';
import Link from 'next/link';
import Header from './Header/header';

export const siteTitle = 'Next.js Sample Website';

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  /*
   * Added this to toggle the is-active class. See:
   *
   * https://bulma.io/documentation/components/navbar/#navbar-menu
   * https://github.com/jgthms/bulma/issues/856
   */
  const toggleStyles = (event) => {
    document.querySelector('#burger').classList.toggle('is-active');
    document.querySelector('#navbarmenu').classList.toggle('is-active');
  };

  return (
    <div>
      <Head>
        <title>
          {siteTitle} {home ? 'Homepage' : ''}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header>
        <Header />
      </header>
      {children}
      <footer className="footer">
        <div className="content has-text-centered">
          <span>I'm the footer</span>
        </div>
      </footer>
    </div>
  );
}
