import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ResolutionViewer from '../components/ResolutionViewer';
import MOCK_RESOLUTION from '../datos/mocked_resolution';

describe('ResolutionViewer', () => {
  it('no renderiza nada cuando result es null', () => {
    const { container } = render(<ResolutionViewer result={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renderiza ambos paneles: veredicto y evidencia', () => {
    render(<ResolutionViewer result={MOCK_RESOLUTION} />);

    expect(screen.getByText(MOCK_RESOLUTION.verdict)).toBeInTheDocument();
    expect(screen.getByText('Documento Fuente')).toBeInTheDocument();
  });

  it('propaga correctamente datos clave a los subcomponentes', () => {
    render(<ResolutionViewer result={MOCK_RESOLUTION} />);

    expect(screen.getByText(MOCK_RESOLUTION.query)).toBeInTheDocument();
    expect(screen.getByText(MOCK_RESOLUTION.source_law)).toBeInTheDocument();
  });
});
