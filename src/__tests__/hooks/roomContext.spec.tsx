import { renderHook, act } from '@testing-library/react-hooks';
import { useRoom, RoomProvider } from '../../contexts/roomContext';
import { Provider } from 'react-redux';
import { store } from '../../stores';
import { RoomState } from '../../stores/roomSlice';

const initialTestState: RoomState = {
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
};

describe('roomContext hook', () => {
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
});
