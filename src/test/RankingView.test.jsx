import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RankingView from '../components/RankingView';

describe('RankingView', () => {
  it('renderiza encabezado del ranking', () => {
    render(<RankingView />);

    expect(
      screen.getByText('Ranking Nacional de Veracidad')
    ).toBeInTheDocument();
    expect(
      screen.getByText(/puntaje de integridad basado en datos históricos/i)
    ).toBeInTheDocument();
  });

  it('renderiza tabla y columnas principales', () => {
    render(<RankingView />);

    expect(screen.getByText('Sujeto')).toBeInTheDocument();
    expect(screen.getByText('Estado')).toBeInTheDocument();
    expect(screen.getByText('Faltas')).toBeInTheDocument();
    expect(screen.getByText('Score Integridad')).toBeInTheDocument();
  });

  it('renderiza filas mockeadas del ranking', () => {
    render(<RankingView />);

    expect(screen.getByText('Juan Mentira')).toBeInTheDocument();
    expect(screen.getByText('Periodista X')).toBeInTheDocument();
    expect(screen.getByText('Senador Verdad')).toBeInTheDocument();
  });
});
