import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Check, Sparkles, Zap } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { useToast } from '../context/ThemeContext';
import { createCheckoutSession } from '../services/billingService';
import { getProfile } from '../services/userService';
import { useEffect } from 'react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Up to 5 portfolios',
      '10 professional templates',
      'Custom themes & colours',
      'Analytics dashboard',
      'SEO optimisation',
      'Contact form',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: 'For professionals who want more',
    features: [
      'Unlimited portfolios',
      'AI content generation',
      'All free features',
      'Premium templates (coming soon)',
      'Priority support',
    ],
    cta: 'Upgrade to Pro',
    highlight: true,
  },
];

export default function Pricing() {
  const { isSignedIn } = useUser();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [userPlan, setUserPlan] = useState(null);

  useEffect(() => {
    if (isSignedIn) {
      getProfile()
        .then((data) => setUserPlan(data.plan))
        .catch(() => {});
    }
  }, [isSignedIn]);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const { url } = await createCheckoutSession();
      window.location.href = url;
    } catch (err) {
      toast.error(err.message || 'Failed to start checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <section className="min-h-screen bg-surface-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-surface-900 via-brand-300 to-brand-500 bg-clip-text text-transparent mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-surface-600 max-w-xl mx-auto">
              Start free. Upgrade when you need more power.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {plans.map((plan) => {
              const isCurrent = isSignedIn && userPlan === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`relative bg-white/[0.06] backdrop-blur-xl border rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_30px_rgba(234,179,8,0.08)] ${
                    plan.highlight
                      ? 'border-brand-500/30 hover:border-brand-500/50'
                      : 'border-white/[0.08] hover:border-white/[0.12]'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 text-xs font-semibold bg-brand-500 text-surface-50 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Popular
                      </span>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-surface-900 mb-1">{plan.name}</h3>
                    <p className="text-sm text-surface-500">{plan.description}</p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-surface-900">{plan.price}</span>
                    <span className="text-surface-500 ml-1">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-surface-700">
                        <Check className="w-4 h-4 text-brand-400 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {isCurrent ? (
                    <Button variant="ghost" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : plan.id === 'free' ? (
                    <Link to={isSignedIn ? '/dashboard' : '/sign-up'}>
                      <Button variant="outline-white" className="w-full">
                        {plan.cta}
                      </Button>
                    </Link>
                  ) : isSignedIn ? (
                    <Button
                      variant="gold"
                      className="w-full"
                      onClick={handleUpgrade}
                      loading={loading}
                    >
                      <Zap className="w-4 h-4 mr-1" />
                      {plan.cta}
                    </Button>
                  ) : (
                    <Link to="/sign-up">
                      <Button variant="gold" className="w-full">
                        <Zap className="w-4 h-4 mr-1" />
                        Get Started
                      </Button>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
