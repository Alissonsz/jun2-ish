import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { useRoom } from '../../contexts/roomContext';
import Header from '.';

jest.mock('../../contexts/roomContext.tsx');

describe('Header component', () => {
  it('renders correctly', () => {
    const useRoomMocked = mocked(useRoom);
    const changeVideoUrl = jest.fn();

    useRoomMocked.mockReturnValue({
      changeVideoUrl: changeVideoUrl,
      playlist: [],
    } as any);

    render(<Header />);

    expect(screen.getByText('Jun2-ish')).toBeInTheDocument();
  });

  it('should be able to update roomUrl on input submit', () => {
    const useRoomMocked = mocked(useRoom);
    const changeVideoUrl = jest.fn();

    useRoomMocked.mockReturnValue({
      changeVideoUrl: changeVideoUrl,
      playlist: [],
    } as any);

    render(<Header />);

    const input = screen.getByPlaceholderText('Video url');
    const button = screen.getByTestId('setRoomUrl');

    fireEvent.change(input, { target: { value: 'www.teste.com' } });
    fireEvent.click(button);

    expect(changeVideoUrl).toHaveBeenCalledWith('www.teste.com');
  });
});
