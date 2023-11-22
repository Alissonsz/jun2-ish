import Head from 'next/head';
import Header from './Header';
import { GoMarkGithub } from 'react-icons/go';

export const siteTitle = 'Jun2-ish';

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
        <title>{`${siteTitle} ${home ? 'Homepage' : ''}`}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <header>
        <Header />
      </header>
      <div className="inner-wrap">{children}</div>

      <footer className="footer">
        <div className="content has-text-centered">
          <p>Built with ❤️ by Alisson Souza</p>
          <a
            href="https://github.com/Alissonsz/jun2-ish"
            target="_blank"
            rel="noreferrer"
            className="has-tooltip-bottom"
            data-tooltip="Project repository"
          >
            <GoMarkGithub size={36} />
          </a>
        </div>
      </footer>
    </>
  );
}
