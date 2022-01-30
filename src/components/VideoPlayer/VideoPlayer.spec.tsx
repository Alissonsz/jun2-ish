import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { mocked } from 'jest-mock';
import VideoPlayer from '.';
import { useVideo } from '../../contexts/videoContext';
import screenfull from 'screenfull';
import Player, { PlayerProps } from '../Player';

jest.mock('../../contexts/videoContext');
jest.mock('screenfull', () => ({
  isEnabled: true,
  toggle: jest.fn(),
}));
jest.mock('../Player');

const PlayerMocked = mocked(Player);

PlayerMocked.mockImplementation(() => {
  return <div>React Player</div>;
});

describe('Video Player component', () => {
  it('renders correctly', () => {
    const useVideoMocked = mocked(useVideo);

    useVideoMocked.mockReturnValue({
      isPlaying: false,
      playedFraction: 0,
      setLastSeek: jest.fn(),
      setPlayedFraction: jest.fn(),
    } as any);

    render(<VideoPlayer />);

    expect(screen.getByTestId('videoPlayer')).toBeInTheDocument();
    expect(screen.getByTestId('playButton')).toBeInTheDocument();
    expect(screen.getByTestId('videoDurationSlider')).toHaveAttribute(
      'value',
      '0'
    );
    expect(screen.getByTestId('volumeSlider')).toHaveAttribute('value', '100');
    expect(screen.getByTestId('volumeSlider')).toHaveClass('is-hidden');
  });

  it('should call seekVideo on videoProgress slider click', () => {
    const useVideoMocked = mocked(useVideo);
    const seekVideoMocked = jest.fn();

    useVideoMocked.mockReturnValue({
      setLastSeek: jest.fn(),
      seekVideo: seekVideoMocked,
      setPlayedFraction: jest.fn(),
    } as any);

    render(<VideoPlayer />);

    const videoProgressSlider = screen.getByTestId('videoDurationSlider');
    fireEvent.input(videoProgressSlider, { target: { value: 50 } });

    expect(seekVideoMocked).toHaveBeenCalledWith(50 / 100);
  });

  it('should be able change volume', () => {
    const useVideoMocked = mocked(useVideo);

    useVideoMocked.mockReturnValue({
      setLastSeek: jest.fn(),
      setPlayedFraction: jest.fn(),
    } as any);

    render(<VideoPlayer />);

    const toggleVolumeVisibleButton = screen.getByTestId('toggleVolumeVisible');
    const volumeSlider = screen.getByTestId('volumeSlider');

    fireEvent.mouseEnter(toggleVolumeVisibleButton);
    expect(volumeSlider).not.toHaveClass('is-hidden');

    fireEvent.input(volumeSlider, { target: { value: 50 } });
    expect(volumeSlider).toHaveAttribute('value', '50');

    fireEvent.mouseLeave(toggleVolumeVisibleButton);
    expect(volumeSlider).toHaveClass('is-hidden');
  });

  it('should be able to toggle fullscreen mode', async () => {
    const useVideoMocked = mocked(useVideo);
    const screenfullMocked = mocked(screenfull);

    useVideoMocked.mockReturnValue({
      setLastSeek: jest.fn(),
      setPlayedFraction: jest.fn(),
    } as any);

    render(<VideoPlayer />);

    const toggleFullscreenButton = screen.getByTestId('toggleFullscreenButton');
    const videoPlayerContainer = screen.getByTestId('videoPlayer');

    fireEvent.click(toggleFullscreenButton);
    await waitFor(() => {
      expect(screenfullMocked.toggle).toHaveBeenCalledWith(
        videoPlayerContainer
      );
    });
  });

  it('should call setPlayerFraction on onProgress callback', () => {
    const useVideoMocked = mocked(useVideo);
    const setPLayerFractionMock = jest.fn();

    useVideoMocked.mockReturnValue({
      setLastSeek: jest.fn(),
      setPlayedFraction: setPLayerFractionMock,
    } as any);

    let onProgressMock;

    PlayerMocked.mockImplementationOnce((props: PlayerProps) => {
      onProgressMock = props.onProgress;
      return <div>React Player</div>;
    });

    render(<VideoPlayer />);

    act(() => {
      onProgressMock({ played: 0.2 });
    });

    expect(setPLayerFractionMock).toHaveBeenCalledWith(0.2 * 100);
  });

  it('should call togglePlaying on video end', () => {
    const useVideoMocked = mocked(useVideo);
    const togglePlayingMocked = jest.fn();

    useVideoMocked.mockReturnValue({
      setLastSeek: jest.fn(),
      togglePlaying: togglePlayingMocked,
      setPlayedFraction: jest.fn(),
    } as any);

    let onEndedMock;

    PlayerMocked.mockImplementationOnce((props: PlayerProps) => {
      onEndedMock = props.onEnded;
      return <div>React Player</div>;
    });

    render(<VideoPlayer />);

    act(() => {
      onEndedMock();
    });

    expect(togglePlayingMocked).toHaveBeenCalled();
  });

  it('should show and hide controls based on mouse moving', () => {
    render(<VideoPlayer />);

    const videoCover = screen.getByTestId('videoPlayer');
    const controlsContainer = screen.getByTestId('controlsContainer');

    expect(controlsContainer).toHaveClass('is-hidden');

    fireEvent.mouseMove(videoCover);

    expect(controlsContainer).not.toHaveClass('is-hidden');

    waitFor(() => expect(controlsContainer).toHaveClass('is-hidden'));
  });
});
