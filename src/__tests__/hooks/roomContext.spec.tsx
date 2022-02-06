import { renderHook, act } from '@testing-library/react-hooks';
import { useRoom, RoomProvider } from '../../contexts/roomContext';
import { Provider } from 'react-redux';
import { store } from '../../stores';
import { RoomActions, RoomState } from '../../stores/roomSlice';
import socket from '../../services/ws';
import { mocked } from 'jest-mock';

const initialTestState: RoomState = {
  id: '3fdc23de-b046-490d-9235-821463968c25',
  userNickname: 'John Doe',
  name: 'Test room',
  videoUrl: 'www.youtube.com/teste',
  messages: [
    {
      author: 'John Doe',
      content: 'Hello there',
    },
    {
      author: 'Doe John',
      content: 'There hello',
    },
  ],
  playlist: [],
};

const callbacksMap = {};

describe('roomContext hook', () => {
  beforeEach(() => {
    store.dispatch(RoomActions.clearState());
  });

  beforeAll(() => {
    const socketMocked = mocked(socket);
    socketMocked.on.mockImplementation((...args) => {
      callbacksMap[args[0]] = args[1];

      return {} as any;
    });
  });

  it('should be able to initialize', () => {
    const wrapper = ({ children }) => (
      <Provider store={store}>
        <RoomProvider>{children}</RoomProvider>
      </Provider>
    );

    const { result } = renderHook(useRoom, { wrapper });

    act(() => {
      result.current.setRoomName(initialTestState.name);
      result.current.setRoomVideoUrl(initialTestState.videoUrl);
      result.current.setRoomMessages(initialTestState.messages);
    });

    expect(result.current.name).toEqual(initialTestState.name);
    expect(result.current.videoUrl).toEqual(initialTestState.videoUrl);
    expect(result.current.messages).toEqual(initialTestState.messages);
  });

  it('should add new message when a newMessage arrive', () => {
    const wrapper = ({ children }) => (
      <Provider store={store}>
        <RoomProvider>{children}</RoomProvider>
      </Provider>
    );

    const callback = callbacksMap['newMessage'];
    const { result } = renderHook(useRoom, { wrapper });

    callback({ author: 'Gamer', content: 'Olá gamers' });
    expect(result.current.messages).toEqual(
      expect.arrayContaining([{ author: 'Gamer', content: 'Olá gamers' }])
    );
  });

  it('should change room videoUrl on videoChanged ws call', () => {
    const wrapper = ({ children }) => (
      <Provider store={store}>
        <RoomProvider>{children}</RoomProvider>
      </Provider>
    );

    const callback = callbacksMap['videoChanged'];
    const { result } = renderHook(useRoom, { wrapper });

    callback('www.test.com');
    expect(result.current.videoUrl).toEqual('www.test.com');
  });
});
