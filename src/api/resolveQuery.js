import { Resolution } from '../datos/mocked_resolution';

/**
 * Calls backend and returns a ResolutionResponse.
 * @param {string} question
 * @param {number} [topK=5]
 * @returns {Promise<object>}
 */
export async function resolveQuery(question, topK = 5) {
  return Resolution.fetchOrMock(question, topK);
}
