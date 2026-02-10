import { useState, useEffect } from 'react';
import { Eye, MessageSquare, TrendingUp, TrendingDown, Calendar, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../components/layout/DashboardLayout';
import { InlineLoader } from '../components/common/Loader';
import { getAnalyticsOverview, getPortfolioAnalytics, getAggregateViews } from '../services/analyticsService';

const DATE_RANGES = [
  { label: '7 days', value: 7 },
  { label: '30 days', value: 30 },
  { label: '90 days', value: 90 },
];

function StatCard({ icon: Icon, label, value, color, trend }) {
  const isPositive = trend && parseFloat(trend) >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend !== null && trend !== undefined && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${
            isPositive ? 'text-success-600' : 'text-error-600'
          }`}>
            <TrendIcon className="w-3 h-3" /> {trend}
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-surface-900">{value}</p>
      <p className="text-sm text-surface-500 mt-1">{label}</p>
    </div>
  );
}

function computeTrend(chartData) {
  if (!chartData || chartData.length < 2) return null;
  const mid = Math.floor(chartData.length / 2);
  const firstHalf = chartData.slice(0, mid);
  const secondHalf = chartData.slice(mid);
  const firstSum = firstHalf.reduce((sum, d) => sum + d.views, 0);
  const secondSum = secondHalf.reduce((sum, d) => sum + d.views, 0);
  if (firstSum === 0) return secondSum > 0 ? '+100%' : null;
  const pct = Math.round(((secondSum - firstSum) / firstSum) * 100);
  return `${pct >= 0 ? '+' : ''}${pct}%`;
}

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(30);
  const [overview, setOverview] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState('all');

  useEffect(() => {
    loadData();
  }, [dateRange, selectedPortfolio]);

  async function loadData() {
    setLoading(true);
    try {
      const overviewData = await getAnalyticsOverview();
      setOverview(overviewData);

      if (selectedPortfolio !== 'all') {
        const analytics = await getPortfolioAnalytics(selectedPortfolio, dateRange);
        setChartData(analytics.dailyViews || []);
      } else {
        const aggregate = await getAggregateViews(dateRange);
        setChartData(aggregate.dailyViews || []);
      }
    } catch {
      setOverview({ totalViews: 0, totalContacts: 0, portfolioCount: 0, portfolios: [] });
      setChartData([]);
    } finally {
      setLoading(false);
    }
  }

  const totalChartViews = chartData.reduce((sum, d) => sum + d.views, 0);
  const trend = computeTrend(chartData);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-surface-900">Analytics</h1>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-surface-400" />
            {DATE_RANGES.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setDateRange(value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  dateRange === value
                    ? 'bg-brand-500 text-white'
                    : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-16"><InlineLoader /></div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatCard
                icon={Eye}
                label={`Views (last ${dateRange} days)`}
                value={totalChartViews.toLocaleString()}
                color="bg-brand-100 text-brand-600"
                trend={trend}
              />
              <StatCard
                icon={MessageSquare}
                label="Contact Messages"
                value={overview?.totalContacts || 0}
                color="bg-success-100 text-success-600"
              />
              <StatCard
                icon={TrendingUp}
                label="Avg. Daily Views"
                value={chartData.length > 0 ? Math.round(totalChartViews / chartData.length) : 0}
                color="bg-purple-100 text-purple-600"
              />
            </div>

            {/* Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-surface-900">Views Over Time</h2>
                {overview?.portfolios?.length > 0 && (
                  <select
                    value={selectedPortfolio}
                    onChange={(e) => setSelectedPortfolio(e.target.value)}
                    className="text-sm border border-surface-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="all">All Portfolios</option>
                    {overview.portfolios.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                )}
              </div>

              {chartData.length === 0 ? (
                <div className="h-72 flex flex-col items-center justify-center text-surface-400">
                  <BarChart3 className="w-12 h-12 mb-3" />
                  <p className="text-sm">No view data yet. Share your published portfolio to start tracking.</p>
                </div>
              ) : (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 11, fill: '#94a3b8' }}
                        tickFormatter={(v) => {
                          const d = new Date(v);
                          return `${d.getMonth() + 1}/${d.getDate()}`;
                        }}
                      />
                      <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
                      <Tooltip
                        contentStyle={{
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                          fontSize: '13px',
                        }}
                        labelFormatter={(v) => new Date(v).toLocaleDateString()}
                      />
                      <Area
                        type="monotone"
                        dataKey="views"
                        stroke="#4f46e5"
                        strokeWidth={2}
                        fill="url(#viewsGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
