import { render, screen } from '@testing-library/react';
import { mocked } from 'jest-mock';
import VideoPlayer from '.';
import { useVideo } from '../../contexts/videoContext';

jest.mock('../../contexts/videoContext');
jest.mock('screenfull');

describe('Video Player component', () => {
  it('renders correctly', () => {
    const useVideoMocked = mocked(useVideo);

    useVideoMocked.mockReturnValue({
      setLastSeek: jest.fn(),
    } as any);

    render(<VideoPlayer />);

    expect(screen.getByTestId('VideoPlayer')).toBeInTheDocument();
  });
});
