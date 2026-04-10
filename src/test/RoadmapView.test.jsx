import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RoadmapView from '../components/RoadmapView';

describe('RoadmapView', () => {
  it('renderiza encabezado y las 4 fases del roadmap', () => {
    render(<RoadmapView />);

    expect(screen.getByText('Plan de Transparencia')).toBeInTheDocument();
    expect(
      screen.getByText(
        /de auditoría individual a un índice nacional de integridad pública/i
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText('Auditoría de Fuentes Públicas')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Repositorio de Inconsistencias')
    ).toBeInTheDocument();
    expect(screen.getByText('Ranking de Veracidad')).toBeInTheDocument();
    expect(screen.getByText('Open Data API')).toBeInTheDocument();
  });
});
