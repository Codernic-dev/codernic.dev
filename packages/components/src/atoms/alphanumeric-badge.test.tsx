import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AlphanumericBadge } from './alphanumeric-badge';

describe('AlphanumericBadge Component', () => {
  it('renders uppercase character correctly', () => {
    render(<AlphanumericBadge char="a" data-testid="badge-a" />);
    const el = screen.getByTestId('badge-a');
    expect(el).toBeInTheDocument();
    expect(el.textContent).toBe('A');
  });

  it('renders numbers correctly', () => {
    render(<AlphanumericBadge char={1} pillar="deming" data-testid="badge-1" />);
    const el = screen.getByTestId('badge-1');
    expect(el).toBeInTheDocument();
    expect(el.textContent).toBe('1');
  });

  it('applies custom size styles', () => {
    render(<AlphanumericBadge char="B" size="lg" data-testid="badge-lg" />);
    const el = screen.getByTestId('badge-lg');
    expect(el.style.width).toBe('40px');
    expect(el.style.height).toBe('40px');
  });
});
