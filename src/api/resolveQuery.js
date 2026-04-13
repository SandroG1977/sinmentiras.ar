/**
 * Calls POST /api/v1/rag/resolve and returns a ResolutionResponse.
 * @param {string} question
 * @param {number} [topK=5]
 * @returns {Promise<object>}
 */
export async function resolveQuery(question, topK = 5) {
    const response = await fetch('/api/v1/rag/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, top_k: topK }),
    });

    if (!response.ok) {
        const detail = await response.text();
        throw new Error(`Backend error ${response.status}: ${detail}`);
    }

    return response.json();
}
