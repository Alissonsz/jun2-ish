import { render, screen } from '@testing-library/react';
import Header from './header';

describe('Header component', () => {
  it('renders correctly', () => {
    render(<Header />);

    expect(screen.getByText('Jun2-ish')).toBeInTheDocument();
  });
});
