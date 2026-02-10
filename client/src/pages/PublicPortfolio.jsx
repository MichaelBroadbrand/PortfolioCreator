import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileQuestion, AlertCircle } from 'lucide-react';
import PortfolioView from '../components/public/PortfolioView';
import PortfolioFooter from '../components/public/PortfolioFooter';
import { FullPageLoader } from '../components/common/Loader';
import { getPublicPortfolio } from '../services/publicService';

export default function PublicPortfolio() {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      setNotFound(false);
      try {
        const data = await getPublicPortfolio(slug);
        setPortfolio(data);

        // Set SEO meta tags
        if (data.seo?.title) document.title = data.seo.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && data.seo?.description) metaDesc.setAttribute('content', data.seo.description);
      } catch (err) {
        if (err.response?.status === 404) {
          setNotFound(true);
        } else {
          setError(err.message || 'Failed to load portfolio');
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) return <FullPageLoader />;

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface-50">
        <FileQuestion className="w-16 h-16 text-surface-300 mb-4" />
        <h1 className="text-2xl font-bold text-surface-800 mb-2">Portfolio Not Found</h1>
        <p className="text-surface-500">This portfolio doesn't exist or has been unpublished.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface-50">
        <AlertCircle className="w-16 h-16 text-error-300 mb-4" />
        <h1 className="text-2xl font-bold text-surface-800 mb-2">Something went wrong</h1>
        <p className="text-surface-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!portfolio) return null;

  // Each layout controls its own container/wrapper — no hardcoded card
  return (
    <div className="min-h-screen">
      <PortfolioView portfolio={portfolio} />
      <PortfolioFooter />
    </div>
  );
}
