import { render, screen } from '@testing-library/react';
import Header from './Header';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../utils/theme';

describe('Header Component', () => {
  it('should have a link', () => {
    render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should have a textfield', () => {
    render(
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    );
    expect(screen.getByText('Cool Movies')).toBeInTheDocument();
  });
});
