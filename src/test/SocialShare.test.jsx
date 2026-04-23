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
});
