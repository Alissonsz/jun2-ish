import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useRoom } from '../../contexts/roomContext';
import Header from './header';

jest.mock('../../contexts/roomContext.tsx');

describe('Header component', () => {
  it('renders correctly', () => {
    const useRoomMocked = mocked(useRoom);
    const setRoomVideoUrl = jest.fn();

    useRoomMocked.mockReturnValueOnce({
      setRoomVideoUrl: setRoomVideoUrl,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    render(<Header />);

    expect(screen.getByText('Jun2-ish')).toBeInTheDocument();
  });

  it('should be able to update roomUrl on input submit', () => {
    const useRoomMocked = mocked(useRoom);
    const setRoomVideoUrl = jest.fn();

    useRoomMocked.mockReturnValue({
      setRoomVideoUrl: setRoomVideoUrl,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    render(<Header />);

    const input = screen.getByPlaceholderText('Video url');
    const button = screen.getByTestId('setRoomUrl');

    fireEvent.change(input, { target: { value: 'www.teste.com' } });
    fireEvent.click(button);

    expect(setRoomVideoUrl).toHaveBeenCalledWith('www.teste.com');
  });
});
