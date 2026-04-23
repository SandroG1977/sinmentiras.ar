import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SocialShare from '../components/SocialShare';
import MOCK_RESOLUTION from '../datos/mocked_resolution';

vi.mock('html-to-image', () => ({
  toPng: vi.fn(),
}));

import { toPng } from 'html-to-image';

afterEach(() => {
  vi.restoreAllMocks();
  delete navigator.share;
  delete navigator.clipboard;
});

describe('SocialShare', () => {
  it('no renderiza nada cuando result es null', () => {
    const { container } = render(
      <SocialShare result={null} captureRef={{ current: null }} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renderiza links directos a WhatsApp, X y Telegram', () => {
    render(
      <SocialShare
        result={MOCK_RESOLUTION}
        captureRef={{ current: document.createElement('div') }}
      />
    );

    expect(
      screen.getByRole('link', { name: /compartir en whatsapp/i })
    ).toHaveAttribute('href', expect.stringContaining('wa.me'));
    expect(
      screen.getByRole('link', { name: /compartir en x/i })
    ).toHaveAttribute(
      'href',
      expect.stringContaining('twitter.com/intent/tweet')
    );
    expect(
      screen.getByRole('link', { name: /compartir en telegram/i })
    ).toHaveAttribute('href', expect.stringContaining('t.me/share/url'));
  });

  it('copia el resultado al portapapeles', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: writeTextMock },
    });

    render(
      <SocialShare
        result={MOCK_RESOLUTION}
        captureRef={{ current: document.createElement('div') }}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /copiar resultado/i }));

    await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(1));
    expect(writeTextMock.mock.calls[0][0]).toMatch(/^Consulta:/i);
    expect(writeTextMock.mock.calls[0][0]).toMatch(/\n\nVeredicto:/i);
    expect(writeTextMock.mock.calls[0][0]).toMatch(/\n\nResumen:/i);
    expect(writeTextMock.mock.calls[0][0]).toMatch(/\n\nFuente:/i);
    expect(screen.getByText(/copiado para compartir/i)).toBeInTheDocument();
  });

  it('usa fallback con execCommand cuando navigator.clipboard no existe', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: undefined,
    });

    const execCommandMock = vi.fn(() => true);
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: execCommandMock,
    });

    render(
      <SocialShare
        result={MOCK_RESOLUTION}
        captureRef={{ current: document.createElement('div') }}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /copiar resultado/i }));

    await waitFor(() => expect(execCommandMock).toHaveBeenCalledWith('copy'));
    expect(screen.getByText(/copiado para compartir/i)).toBeInTheDocument();
  });

  it('muestra feedback de error cuando falla la copia', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const writeTextMock = vi.fn().mockRejectedValue(new Error('copy failed'));

    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: writeTextMock },
    });

    render(
      <SocialShare
        result={MOCK_RESOLUTION}
        captureRef={{ current: document.createElement('div') }}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /copiar resultado/i }));

    await waitFor(() =>
      expect(screen.getByText(/no se pudo copiar/i)).toBeInTheDocument()
    );
    expect(errorSpy).toHaveBeenCalled();
  });

  it('renderiza la opcion mas cuando navigator.share esta disponible', () => {
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: vi.fn(),
    });

    render(
      <SocialShare
        result={MOCK_RESOLUTION}
        captureRef={{ current: document.createElement('div') }}
      />
    );

    expect(
      screen.getByRole('button', { name: /más opciones para compartir/i })
    ).toBeInTheDocument();
  });

  it('comparte con navigator.share y muestra feedback de exito', async () => {
    const shareMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: shareMock,
    });

    render(
      <SocialShare
        result={MOCK_RESOLUTION}
        captureRef={{ current: document.createElement('div') }}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: /más opciones para compartir/i })
    );

    await waitFor(() => expect(shareMock).toHaveBeenCalledTimes(1));
    expect(screen.getByText(/resultado compartido/i)).toBeInTheDocument();
  });

  it('no muestra error cuando navigator.share se cancela con AbortError', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const shareMock = vi.fn().mockRejectedValue({ name: 'AbortError' });

    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: shareMock,
    });

    render(
      <SocialShare
        result={MOCK_RESOLUTION}
        captureRef={{ current: document.createElement('div') }}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: /más opciones para compartir/i })
    );

    await waitFor(() => expect(shareMock).toHaveBeenCalledTimes(1));
    expect(screen.queryByText(/no se pudo compartir/i)).not.toBeInTheDocument();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('muestra feedback de error cuando navigator.share falla', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const shareMock = vi.fn().mockRejectedValue(new Error('share failed'));

    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: shareMock,
    });

    render(
      <SocialShare
        result={MOCK_RESOLUTION}
        captureRef={{ current: document.createElement('div') }}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: /más opciones para compartir/i })
    );

    await waitFor(() =>
      expect(screen.getByText(/no se pudo compartir/i)).toBeInTheDocument()
    );
    expect(errorSpy).toHaveBeenCalled();
  });

  it('descarga una placa png del resultado', async () => {
    toPng.mockResolvedValue('data:image/png;base64,test');

    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});

    const captureNode = document.createElement('div');

    render(
      <SocialShare
        result={MOCK_RESOLUTION}
        captureRef={{ current: captureNode }}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: /descargar placa para instagram/i })
    );

    await waitFor(() =>
      expect(toPng).toHaveBeenCalledWith(
        captureNode,
        expect.objectContaining({ backgroundColor: '#020617', pixelRatio: 2 })
      )
    );
    expect(clickSpy).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(screen.getAllByText(/placa descargada/i).length).toBeGreaterThan(0)
    );
  });

  it('muestra error si se intenta descargar sin captureRef', () => {
    render(<SocialShare result={MOCK_RESOLUTION} captureRef={undefined} />);

    fireEvent.click(
      screen.getByRole('button', { name: /descargar placa para instagram/i })
    );

    expect(
      screen.getByText(/no se pudo generar la placa/i)
    ).toBeInTheDocument();
  });

  it('muestra error si falla toPng al descargar', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    toPng.mockRejectedValue(new Error('png failed'));

    render(
      <SocialShare
        result={MOCK_RESOLUTION}
        captureRef={{ current: document.createElement('div') }}
      />
    );

    fireEvent.click(
      screen.getByRole('button', { name: /descargar placa para instagram/i })
    );

    await waitFor(() =>
      expect(
        screen.getByText(/no se pudo generar la placa/i)
      ).toBeInTheDocument()
    );
    expect(errorSpy).toHaveBeenCalled();
  });
});
