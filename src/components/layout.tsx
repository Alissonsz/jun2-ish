import Head from 'next/head';
import Header from './Header';

export const siteTitle = 'Next.js Sample Website';

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <>
      <Head>
        <title>
          {siteTitle} {home ? 'Homepage' : ''}
        </title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <header>
        <Header />
      </header>
      <div className="inner-wrap">{children}</div>

      <footer className="footer">
        <div className="content has-text-centered">
          <span>I'm the footer</span>
        </div>
      </footer>
    </>
  );
}
