import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Nav from '../components/Nav';

describe('Nav', () => {
  it('renderiza marca y badge informativo', () => {
    render(<Nav view="home" setView={vi.fn()} />);

    expect(screen.getByText(/SINMENTIRAS/i)).toBeInTheDocument();
    expect(screen.getByText('Fuentes 100% Públicas')).toBeInTheDocument();
  });

  it('llama setView con roadmap al hacer click en Roadmap', () => {
    const setView = vi.fn();
    const { container } = render(<Nav view="home" setView={setView} />);

    const roadmapButton = Array.from(container.querySelectorAll('button')).find(
      (button) => button.textContent === 'Roadmap'
    );

    expect(roadmapButton).not.toBeNull();
    fireEvent.click(roadmapButton);
    expect(setView).toHaveBeenCalledWith('roadmap');
  });

  it('llama setView con ranking al hacer click en Ranking', () => {
    const setView = vi.fn();
    const { container } = render(<Nav view="home" setView={setView} />);

    const rankingButton = Array.from(container.querySelectorAll('button')).find(
      (button) => button.textContent === 'Ranking'
    );

    expect(rankingButton).not.toBeNull();
    fireEvent.click(rankingButton);
    expect(setView).toHaveBeenCalledWith('ranking');
  });

  it('llama setView con home al hacer click en el logo', () => {
    const setView = vi.fn();
    render(<Nav view="roadmap" setView={setView} />);

    fireEvent.click(screen.getByText(/SINMENTIRAS/i));
    expect(setView).toHaveBeenCalledWith('home');
  });

  it('llama setView con home al hacer click en Auditoría', () => {
    const setView = vi.fn();
    const { container } = render(<Nav view="roadmap" setView={setView} />);

    const homeButton = Array.from(container.querySelectorAll('button')).find(
      (button) => button.textContent === 'Auditoría'
    );

    expect(homeButton).not.toBeNull();
    fireEvent.click(homeButton);
    expect(setView).toHaveBeenCalledWith('home');
  });
});
