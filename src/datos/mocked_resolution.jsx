const MOCK_RESOLUTION_DATA = {
  id: 'AUD-2024-882',
  query:
    '¿El nuevo decreto permite que las empresas paguen indemnizaciones en cuotas?',
  verdict: 'INCONSISTENCIA TÉCNICA',
  summary_ia:
    "El decreto 70/2023 no establece el pago en cuotas por defecto, pero habilita que mediante convenio colectivo se cree un 'Fondo de Cese' que podría modificar la modalidad del pago indemnizatorio. La afirmación de que 'ya se puede pagar en cuotas' es prematura y técnicamente incompleta.",
  hash: 'sha256:f4e8d221c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855e3b0',
  source_law: 'Ley 25.877 - Art. 24 (Modificado por Proyecto Bases)',
  source_url:
    'https://www.boletinoficial.gob.ar/detalleAviso/primera/299000/20231221',
  original_text:
    'Las partes podrán sustituir el presente régimen de indemnizaciones por un sistema de fondo de cese laboral cuyo costo estará siempre a cargo del empleador, con un aporte mensual que no podrá ser superior al OCHO POR CIENTO (8%) de la remuneración computable...',
  highlights: [
    'sustituir el presente régimen de indemnizaciones',
    'sistema de fondo de cese laboral',
  ],
  news_context: [
    {
      source: 'C5N',
      title: 'Confirmado: Se terminan las indemnizaciones de un solo pago',
      sentiment: 'negative',
    },
    {
      source: 'Infobae',
      title: 'Cómo funciona el nuevo fondo de cese laboral',
      sentiment: 'neutral',
    },
  ],
};

class Resolution {
  constructor(data = {}) {
    this.id = data.id || '';
    this.query = data.query || '';
    this.verdict = data.verdict || 'SIN DATOS SUFICIENTES';
    this.summary_ia = data.summary_ia || '';
    this.hash = data.hash || '';
    this.source_law = data.source_law || '';
    this.source_url = data.source_url || '';
    this.original_text = data.original_text || '';
    this.highlights = Array.isArray(data.highlights) ? data.highlights : [];
    this.news_context = Array.isArray(data.news_context)
      ? data.news_context
      : [];
    this.chunks_used = Array.isArray(data.chunks_used) ? data.chunks_used : [];
    this.used_model = data.used_model || '';
  }

  static fromBackend(data) {
    return new Resolution(data || {});
  }

  static mock() {
    return new Resolution(MOCK_RESOLUTION_DATA);
  }

  static async fetchOrMock(question, topK = 5, options = {}) {
    const forceNetwork = options.forceNetwork === true;

    if (import.meta.env.MODE === 'test' && !forceNetwork) {
      return Resolution.mock().toJSON();
    }

    const useMockFallback =
      options.useMockFallback ??
      import.meta.env.VITE_USE_MOCK_FALLBACK !== 'false';

    try {
      const response = await fetch('/api/v1/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: question, top_k: topK }),
      });

      if (!response.ok) {
        const detail = await response.text();
        throw new Error(`Backend error ${response.status}: ${detail}`);
      }

      const payload = await response.json();
      return Resolution.fromBackend(payload).toJSON();
    } catch (error) {
      if (useMockFallback) {
        return Resolution.mock().toJSON();
      }
      throw error;
    }
  }

  toJSON() {
    return {
      id: this.id,
      query: this.query,
      verdict: this.verdict,
      summary_ia: this.summary_ia,
      hash: this.hash,
      source_law: this.source_law,
      source_url: this.source_url,
      original_text: this.original_text,
      highlights: this.highlights,
      news_context: this.news_context,
      chunks_used: this.chunks_used,
      used_model: this.used_model,
    };
  }
}

const MOCK_RESOLUTION = Resolution.mock().toJSON();

export { Resolution, MOCK_RESOLUTION };

export default MOCK_RESOLUTION;
