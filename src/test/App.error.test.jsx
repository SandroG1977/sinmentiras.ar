import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';
import * as api from '../api/resolveQuery';

vi.mock('../api/resolveQuery');

describe('App - Error handling', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('maneja error cuando resolveQuery falla', async () => {
    api.resolveQuery.mockRejectedValueOnce(
      new Error('API Error: Connection failed')
    );

    const { container } = render(<App />);

    const input = screen.getByPlaceholderText(/qué dice el dnu/i);
    const submitButton = container.querySelector('button[type="submit"]');

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(submitButton);

    await act(async () => {
      vi.advanceTimersByTime(1200);
      await Promise.resolve();
    });

    expect(screen.getByText(/API Error/)).toBeInTheDocument();
  });
});
