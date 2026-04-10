import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RoadmapPhaseCard from '../components/RoadmapPhaseCard';

describe('RoadmapPhaseCard', () => {
  it('renderiza contenido de fase activa y badge', () => {
    render(
      <RoadmapPhaseCard
        step="01"
        title="Fase Activa"
        description="Descripción activa"
        active={true}
      />
    );

    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('Fase Activa')).toBeInTheDocument();
    expect(screen.getByText('Descripción activa')).toBeInTheDocument();
    expect(screen.getByText('Fase de Despliegue Activa')).toBeInTheDocument();
  });

  it('no renderiza badge cuando la fase no está activa', () => {
    render(
      <RoadmapPhaseCard
        step="02"
        title="Fase Inactiva"
        description="Descripción inactiva"
        active={false}
      />
    );

    expect(screen.getByText('02')).toBeInTheDocument();
    expect(
      screen.queryByText('Fase de Despliegue Activa')
    ).not.toBeInTheDocument();
  });
});
