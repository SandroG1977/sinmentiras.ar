import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import VeredictViewer from '../components/VeredictViewer';
import MOCK_RESOLUTION from '../datos/mocked_resolution';

describe('VeredictViewer', () => {
  it('no renderiza nada cuando result es null', () => {
    const { container } = render(<VeredictViewer result={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renderiza veredicto, consulta y resumen', () => {
    render(<VeredictViewer result={MOCK_RESOLUTION} />);

    expect(screen.getByText(MOCK_RESOLUTION.verdict)).toBeInTheDocument();
    expect(screen.getByText(MOCK_RESOLUTION.query)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(MOCK_RESOLUTION.summary_ia, 'i'))
    ).toBeInTheDocument();
  });

  it('renderiza la sección de contraste de medios con los items del news_context', () => {
    render(<VeredictViewer result={MOCK_RESOLUTION} />);

    expect(
      screen.getByText('Contraste de Medios Auditados')
    ).toBeInTheDocument();
    expect(screen.getByText('C5N')).toBeInTheDocument();
    expect(screen.getByText('Infobae')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Confirmado: Se terminan las indemnizaciones de un solo pago'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText('Cómo funciona el nuevo fondo de cese laboral')
    ).toBeInTheDocument();
  });

  it('renderiza el aviso de integridad', () => {
    render(<VeredictViewer result={MOCK_RESOLUTION} />);

    expect(screen.getByText('Aviso de Integridad')).toBeInTheDocument();
    expect(
      screen.getByText(
        /este análisis se basa exclusivamente en documentos de dominio público/i
      )
    ).toBeInTheDocument();
  });

  it('renderiza el origen de datos oficial', () => {
    render(<VeredictViewer result={MOCK_RESOLUTION} />);

    expect(screen.getByText('DATA ORIGIN: BORA.GOB.AR')).toBeInTheDocument();
  });

  it('renderiza correctamente cuando news_context no existe', () => {
    const resultWithoutNewsContext = {
      ...MOCK_RESOLUTION,
      news_context: undefined,
    };

    render(<VeredictViewer result={resultWithoutNewsContext} />);

    expect(
      screen.getByText('Contraste de Medios Auditados')
    ).toBeInTheDocument();
    expect(screen.queryByText('C5N')).not.toBeInTheDocument();
  });
});
