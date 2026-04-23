import { describe, expect, it, vi } from 'vitest';
import { Resolution } from '../datos/mocked_resolution';

describe('Resolution constructor', () => {
  it('aplica valores por defecto cuando se instancia con objeto vacío', () => {
    const r = new Resolution({});
    expect(r.id).toBe('');
    expect(r.query).toBe('');
    expect(r.verdict).toBe('SIN DATOS SUFICIENTES');
    expect(r.summary_ia).toBe('');
    expect(r.hash).toBe('');
    expect(r.source_law).toBe('');
    expect(r.source_url).toBe('');
    expect(r.original_text).toBe('');
    expect(r.highlights).toEqual([]);
    expect(r.news_context).toEqual([]);
    expect(r.chunks_used).toEqual([]);
    expect(r.used_model).toBe('');
  });

  it('fromBackend con null retorna instancia con valores por defecto', () => {
    const r = Resolution.fromBackend(null);
    expect(r.verdict).toBe('SIN DATOS SUFICIENTES');
    expect(r.highlights).toEqual([]);
  });

  it('normaliza highlights no-array a array vacío', () => {
    const r = new Resolution({ highlights: 'no-array' });
    expect(r.highlights).toEqual([]);
  });
});

describe('Resolution.fetchOrMock', () => {
  it('usa backend cuando responde ok', async () => {
    const backendPayload = {
      id: 'RES-1',
      query: 'consulta de prueba',
      verdict: 'CONSISTENTE',
      summary_ia: 'respuesta backend',
      chunks_used: [
        {
          source: 'Ley 123',
          text: 'texto',
        },
      ],
      used_model: 'gpt-test',
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => backendPayload,
    });

    vi.stubGlobal('fetch', fetchMock);

    const result = await Resolution.fetchOrMock('consulta de prueba', 3, {
      forceNetwork: true,
    });

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/agent/chat',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );

    const requestConfig = fetchMock.mock.calls[0][1];
    expect(JSON.parse(requestConfig.body)).toEqual({
      prompt: 'consulta de prueba',
      top_k: 3,
    });

    expect(result.verdict).toBe('CONSISTENTE');
    expect(result.summary_ia).toBe('respuesta backend');
    expect(result.chunks_used).toHaveLength(1);
    expect(result.used_model).toBe('gpt-test');

    vi.unstubAllGlobals();
  });

  it('hace fallback a mock si backend falla', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValue(new Error('network failed unexpectedly'));

    vi.stubGlobal('fetch', fetchMock);

    const result = await Resolution.fetchOrMock('consulta fallback', 5, {
      forceNetwork: true,
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(result.verdict).toBe('INCONSISTENCIA TÉCNICA');
    expect(result.id).toBe('AUD-2024-882');

    vi.unstubAllGlobals();
  });

  it('lanza error cuando backend devuelve respuesta no-ok', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      text: async () => 'Service Unavailable',
    });

    vi.stubGlobal('fetch', fetchMock);

    await expect(
      Resolution.fetchOrMock('consulta error', 5, {
        forceNetwork: true,
        useMockFallback: false,
      })
    ).rejects.toThrow('Backend error 503: Service Unavailable');

    vi.unstubAllGlobals();
  });

  it('lanza error de red cuando useMockFallback es false', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValue(new Error('network unavailable'));

    vi.stubGlobal('fetch', fetchMock);

    await expect(
      Resolution.fetchOrMock('consulta sin fallback', 5, {
        forceNetwork: true,
        useMockFallback: false,
      })
    ).rejects.toThrow('network unavailable');

    vi.unstubAllGlobals();
  });
});
