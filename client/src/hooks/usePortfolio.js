import { useState, useEffect, useCallback } from 'react';
import { useEditor } from '../context/EditorContext';
import { getPortfolio } from '../services/portfolioService';

export default function usePortfolio(portfolioId) {
  const { setPortfolio } = useEditor();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPortfolio = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (!portfolioId) {
        throw new Error('No portfolio ID provided');
      }

      const portfolio = await getPortfolio(portfolioId);
      if (!portfolio) {
        throw new Error('Portfolio not found');
      }
      setPortfolio(portfolio);
    } catch (err) {
      console.error('[usePortfolio] Failed to load portfolio:', err);
      setError(err.message || 'Failed to load portfolio');
    } finally {
      setLoading(false);
    }
  }, [portfolioId, setPortfolio]);

  useEffect(() => {
    loadPortfolio();
  }, [loadPortfolio]);

  return { loading, error, reload: loadPortfolio };
}
