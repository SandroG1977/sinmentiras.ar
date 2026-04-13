import { describe, expect, it, vi } from 'vitest';
import { Resolution } from '../datos/mocked_resolution';

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
});
