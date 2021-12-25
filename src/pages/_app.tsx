import '../styles/global.sass';
import { AppProps } from 'next/app';
import { RoomProvider } from '../contexts/roomContext';
import { store } from '../stores';
import { Provider } from 'react-redux';
import { VideoProvider } from '../contexts/videoContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <RoomProvider>
        <VideoProvider>
          <Component {...pageProps} />
        </VideoProvider>
      </RoomProvider>
    </Provider>
  );
}
