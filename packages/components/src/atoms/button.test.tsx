import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button data-testid="btn-test">Click Me</Button>);
    const btn = screen.getByTestId('btn-test');
    expect(btn).toBeInTheDocument();
    expect(btn.textContent).toBe('Click Me');
  });

  it('handles disabled state', () => {
    render(<Button disabled data-testid="btn-disabled">Disabled</Button>);
    const btn = screen.getByTestId('btn-disabled');
    expect(btn).toBeDisabled();
  });
});
