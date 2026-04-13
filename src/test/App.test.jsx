import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renderiza Home por defecto', () => {
    render(<App />);
    expect(screen.getByText(/matemática contra/i)).toBeInTheDocument();
  });

  it('hace búsqueda y navega a resolution', async () => {
    const { container } = render(<App />);

    const input = screen.getByPlaceholderText(/qué dice el dnu/i);
    const submitButton = container.querySelector('button[type="submit"]');

    fireEvent.change(input, { target: { value: 'decreto 70' } });
    fireEvent.click(submitButton);

    await act(async () => {
      vi.advanceTimersByTime(1200);
      await Promise.resolve();
    });

    expect(screen.getByText('INCONSISTENCIA TÉCNICA')).toBeInTheDocument();
    expect(screen.getByText('Documento Fuente')).toBeInTheDocument();
  });

  it('si la búsqueda está vacía no cambia de vista', () => {
    const { container } = render(<App />);

    const submitButton = container.querySelector('button[type="submit"]');

    fireEvent.click(submitButton);

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(screen.getByText(/matemática contra/i)).toBeInTheDocument();
    expect(
      screen.queryByText('INCONSISTENCIA TÉCNICA')
    ).not.toBeInTheDocument();
  });

  it('navega a roadmap desde el nav', () => {
    const { container } = render(<App />);

    const roadmapButton = Array.from(container.querySelectorAll('button')).find(
      (button) => button.textContent === 'Roadmap'
    );

    expect(roadmapButton).not.toBeNull();
    fireEvent.click(roadmapButton);

    expect(screen.getByText('Plan de Transparencia')).toBeInTheDocument();
  });

  it('navega a ranking desde el nav', () => {
    const { container } = render(<App />);

    const rankingButton = Array.from(container.querySelectorAll('button')).find(
      (button) => button.textContent === 'Ranking'
    );

    expect(rankingButton).not.toBeNull();
    fireEvent.click(rankingButton);

    expect(
      screen.getByText('Ranking Nacional de Veracidad')
    ).toBeInTheDocument();
  });
});
