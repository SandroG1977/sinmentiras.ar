import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import EvidenceViewer from '../components/EvidenceViewer';
import MOCK_RESOLUTION from '../datos/mocked_resolution';

describe('EvidenceViewer', () => {
  it('no renderiza nada cuando result es null', () => {
    const { container } = render(<EvidenceViewer result={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renderiza los metadatos principales del documento', () => {
    render(<EvidenceViewer result={MOCK_RESOLUTION} />);

    expect(screen.getByText('Documento Fuente')).toBeInTheDocument();
    expect(screen.getByText('Identificador Legislativo')).toBeInTheDocument();
    expect(screen.getByText(MOCK_RESOLUTION.source_law)).toBeInTheDocument();
    expect(screen.getByText('ORIGINAL')).toBeInTheDocument();
  });

  it('renderiza el link a la fuente oficial con la URL correcta', () => {
    render(<EvidenceViewer result={MOCK_RESOLUTION} />);

    const sourceLink = screen.getByRole('link', {
      name: /ver en bora.gob.ar/i,
    });
    expect(sourceLink).toBeInTheDocument();
    expect(sourceLink).toHaveAttribute('href', MOCK_RESOLUTION.source_url);
    expect(sourceLink).toHaveAttribute('target', '_blank');
    expect(sourceLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renderiza los dos highlights del texto fuente', () => {
    render(<EvidenceViewer result={MOCK_RESOLUTION} />);

    expect(
      screen.getByText('sustituir el presente régimen de indemnizaciones')
    ).toBeInTheDocument();
    expect(
      screen.getByText('sistema de fondo de cese laboral')
    ).toBeInTheDocument();
  });

  it('renderiza el footer de auditoría pública', () => {
    render(<EvidenceViewer result={MOCK_RESOLUTION} />);

    expect(
      screen.getByText(/fuente publica: ley 27.275 de acceso a la informacion/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/auditor: iaautomations ai engine/i)
    ).toBeInTheDocument();
  });

  it('soporta resultado sin highlights', () => {
    const resultWithoutHighlights = {
      ...MOCK_RESOLUTION,
      highlights: [],
      original_text: 'Texto oficial sin marcas.',
    };

    render(<EvidenceViewer result={resultWithoutHighlights} />);
    expect(screen.getByText(/texto oficial sin marcas/i)).toBeInTheDocument();
  });

  it('soporta resultado con un solo highlight', () => {
    const resultWithOneHighlight = {
      ...MOCK_RESOLUTION,
      highlights: ['fondo de cese laboral'],
      original_text: 'Este texto menciona un fondo de cese laboral y nada más.',
    };

    render(<EvidenceViewer result={resultWithOneHighlight} />);
    expect(screen.getByText('fondo de cese laboral')).toBeInTheDocument();
  });

  it('soporta highlights con primer valor vacío y segundo presente', () => {
    const resultSecondOnly = {
      ...MOCK_RESOLUTION,
      highlights: [undefined, 'marcador secundario'],
      original_text: 'Documento corto',
    };

    render(<EvidenceViewer result={resultSecondOnly} />);
    expect(screen.getByText('marcador secundario')).toBeInTheDocument();
  });

  it('soporta highlights y texto original indefinidos', () => {
    const resultWithUndefinedFields = {
      ...MOCK_RESOLUTION,
      highlights: undefined,
      original_text: undefined,
    };

    render(<EvidenceViewer result={resultWithUndefinedFields} />);
    expect(screen.getByText('Documento Fuente')).toBeInTheDocument();
  });

  it('tolera primer highlight no presente en el texto', () => {
    const resultWithMissingPrimaryMatch = {
      ...MOCK_RESOLUTION,
      highlights: ['NO_EXISTE_EN_TEXTO', 'SEGUNDO_MARCADOR'],
      original_text: 'Texto sin coincidencia para el marcador primario',
    };

    render(<EvidenceViewer result={resultWithMissingPrimaryMatch} />);
    expect(screen.getByText('NO_EXISTE_EN_TEXTO')).toBeInTheDocument();
    expect(screen.getByText('SEGUNDO_MARCADOR')).toBeInTheDocument();
  });

  it('tolera primer highlight no presente cuando no hay segundo highlight', () => {
    const resultWithMissingPrimaryOnly = {
      ...MOCK_RESOLUTION,
      highlights: ['NO_EXISTE_EN_TEXTO'],
      original_text: 'Texto sin match primario y sin segundo marcador',
    };

    render(<EvidenceViewer result={resultWithMissingPrimaryOnly} />);
    expect(screen.getByText('NO_EXISTE_EN_TEXTO')).toBeInTheDocument();
  });
});
