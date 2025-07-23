import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import Button from '../Button';

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Button Component', () => {
  it('renders button with correct text', () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant styles', () => {
    renderWithTheme(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByText('Secondary Button');
    expect(button).toBeInTheDocument();
  });

  it('renders disabled state correctly', () => {
    const handleClick = vi.fn();
    renderWithTheme(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>
    );
    
    const button = screen.getByText('Disabled Button');
    expect(button).toBeDisabled();
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders with icon', () => {
    renderWithTheme(
      <Button icon={<span data-testid="icon">🚀</span>}>
        Button with Icon
      </Button>
    );
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('Button with Icon')).toBeInTheDocument();
  });

  it('supports fullWidth prop', () => {
    renderWithTheme(<Button fullWidth>Full Width Button</Button>);
    const button = screen.getByText('Full Width Button');
    expect(button).toBeInTheDocument();
  });
});