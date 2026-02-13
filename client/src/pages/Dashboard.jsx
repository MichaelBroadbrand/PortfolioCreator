import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Eye, Globe, Plus, FileText } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import PortfolioCard from '../components/dashboard/PortfolioCard';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Button from '../components/common/Button';
import { InlineLoader } from '../components/common/Loader';
import { useToast } from '../context/ThemeContext';
import {
  getPortfolios,
  duplicatePortfolio,
  deletePortfolio,
} from '../services/portfolioService';
import { getAnalyticsOverview } from '../services/analyticsService';

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-xl p-5 flex items-center gap-4 hover:border-white/[0.12] transition-colors">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-3xl font-bold text-surface-900">{value}</p>
        <p className="text-sm text-surface-600">{label}</p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const toast = useToast();
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [totalViews, setTotalViews] = useState(0);

  // TODO: Re-enable plan checks when billing is live
  const isPro = true;

  useEffect(() => {
    loadPortfolios();
    loadAnalytics();
  }, []);

  async function loadPortfolios() {
    setLoading(true);
    try {
      const data = await getPortfolios();
      setPortfolios(data);
    } catch (err) {
      console.error('[Dashboard] Failed to load portfolios:', err);
      setPortfolios([]);
    } finally {
      setLoading(false);
    }
  }

  async function loadAnalytics() {
    try {
      const overview = await getAnalyticsOverview();
      setTotalViews(overview.totalViews || 0);
    } catch {
      // Analytics are non-critical, keep totalViews at 0
    }
  }

  async function handleDuplicate(id) {
    try {
      await duplicatePortfolio(id);
      toast.success('Portfolio duplicated!');
      loadPortfolios();
    } catch (err) {
      toast.error(err.message || 'Failed to duplicate');
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deletePortfolio(deleteTarget._id);
      toast.success('Portfolio deleted');
      setPortfolios((prev) => prev.filter((p) => p._id !== deleteTarget._id));
    } catch (err) {
      toast.error(err.message || 'Failed to delete');
    } finally {
      setDeleteTarget(null);
    }
  }

  const publishedCount = portfolios.filter((p) => p.status === 'published').length;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-surface-900 mb-6">
          Welcome back
        </h1>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard icon={Layers} label="Total Portfolios" value={portfolios.length} color="bg-brand-500/10 text-brand-400" />
          <StatCard icon={Eye} label="Total Views" value={totalViews} color="bg-success-500/10 text-success-500" />
          <StatCard icon={Globe} label="Published" value={publishedCount} color="bg-blue-500/10 text-blue-400" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-surface-900">Your Portfolios</h2>
          <Button size="sm" onClick={() => navigate('/templates')}>
            <Plus className="w-4 h-4 mr-1" /> Create New
          </Button>
        </div>

        {loading && <div className="py-16"><InlineLoader /></div>}

        {!loading && portfolios.length === 0 && (
          <div className="text-center py-16 bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-xl">
            <div className="w-20 h-20 bg-white/[0.06] rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-surface-500" />
            </div>
            <h3 className="text-xl font-semibold text-surface-900 mb-2">Create your first portfolio</h3>
            <p className="text-surface-600 mb-6">Choose a template and start building in minutes</p>
            <Button onClick={() => navigate('/templates')}>Browse Templates</Button>
          </div>
        )}

        {!loading && portfolios.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((p) => (
              <PortfolioCard key={p._id} portfolio={p} onDuplicate={handleDuplicate} onDelete={setDeleteTarget} />
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Portfolio"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDelete}
      />
    </DashboardLayout>
  );
}
