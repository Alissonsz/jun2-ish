import Chat from './';
import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'jest-mock';
import { useRoom } from '../../contexts/roomContext';

jest.mock('../../contexts/roomContext.tsx');

describe('Chat Component', () => {
  it('renders correctly', () => {
    const useRoomMocked = mocked(useRoom);
    useRoomMocked.mockReturnValue({
      messages: [
        {
          author: 'John Doe',
          content: 'Hi there',
        },
        {
          author: 'Doe John',
          content: 'There hi',
        },
      ],
    } as any);

    render(<Chat />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Hi there')).toBeInTheDocument();
    expect(screen.getByText('Doe John')).toBeInTheDocument();
    expect(screen.getByText('There hi')).toBeInTheDocument();
  });

  it('should be able to add a new message on input submit', () => {
    const useRoomMocked = mocked(useRoom);
    const addMessageMocked = jest.fn();

    useRoomMocked.mockReturnValue({
      messages: [
        {
          author: 'John Doe',
          content: 'Hi there',
        },
        {
          author: 'Doe John',
          content: 'There hi',
        },
      ],
      addMessage: addMessageMocked,
    } as any);

    render(<Chat />);

    const messageInput = screen.getByPlaceholderText('Type a message');
    fireEvent.input(messageInput, { target: { value: 'Hello everyone' } });
    fireEvent.keyPress(messageInput, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    expect(addMessageMocked).toHaveBeenCalledWith('Hello everyone');

    const submitMessageButton = screen.getByTestId('submitMessageButton');
    fireEvent.input(messageInput, { target: { value: 'Testing submit icon' } });
    fireEvent.click(submitMessageButton);

    expect(addMessageMocked).toHaveBeenCalledWith('Testing submit icon');
  });
});
