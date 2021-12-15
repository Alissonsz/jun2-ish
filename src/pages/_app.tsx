import '../styles/global.sass';
import { AppProps } from 'next/app';
import { RoomProvider } from '../contexts/roomContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RoomProvider>
      <Component {...pageProps} />
    </RoomProvider>
  );
}
