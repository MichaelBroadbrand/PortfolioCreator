import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Palette,
  Edit3,
  Paintbrush,
  Rocket,
  BarChart3,
  Search,
  ArrowRight,
  Layout,
  Users,
  Check,
  Sparkles,
  Zap,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';

// Scroll reveal hook
function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = ref.current?.querySelectorAll('[data-reveal]');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}

const features = [
  {
    icon: Palette,
    title: 'Beautiful Templates',
    desc: 'Start with professionally designed templates tailored for developers, designers, and freelancers.',
  },
  {
    icon: Edit3,
    title: 'Visual Editor',
    desc: 'Drag, drop, and customise every section with our intuitive visual editor. No code required.',
  },
  {
    icon: Paintbrush,
    title: 'Custom Themes',
    desc: 'Choose colours, fonts, and spacing to match your personal brand perfectly.',
  },
  {
    icon: Rocket,
    title: 'One-Click Publish',
    desc: 'Go live instantly with a shareable URL. Update anytime with zero downtime.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    desc: 'Track views, visitors, and referral sources to understand your audience.',
  },
  {
    icon: Search,
    title: 'SEO Optimised',
    desc: 'Built-in meta tags, Open Graph, and semantic HTML for search engine visibility.',
  },
];

const steps = [
  { num: 1, icon: Layout, title: 'Pick a Template', desc: 'Browse our gallery and choose a starting point that fits your style.' },
  { num: 2, icon: Edit3, title: 'Add Your Content', desc: 'Fill in your projects, skills, and experience with our visual editor.' },
  { num: 3, icon: Rocket, title: 'Publish & Share', desc: 'Go live in one click and share your portfolio with the world.' },
];

export default function Landing() {
  const pageRef = useScrollReveal();

  return (
    <div ref={pageRef}>
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-surface-50 relative overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(234,179,8,0.08) 0%, transparent 60%)',
          }}
        />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="max-w-7xl mx-auto px-4 py-20 text-center relative z-10">
          <h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-6 font-heading bg-gradient-to-r from-surface-900 via-brand-300 to-brand-500 bg-clip-text text-transparent opacity-0 translate-y-4 transition-all duration-700"
            data-reveal
          >
            Build a Stunning Portfolio
            <br />
            in Minutes
          </h1>
          <p
            className="text-lg md:text-xl text-surface-600 max-w-2xl mx-auto mb-10 opacity-0 translate-y-4 transition-all duration-700 delay-100"
            data-reveal
          >
            No design skills needed. Choose a template, add your content, and
            publish — it's that simple.
          </p>
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 translate-y-4 transition-all duration-700 delay-200"
            data-reveal
          >
            <Link to="/sign-up">
              <Button
                variant="gold"
                size="lg"
                className="px-8 py-3.5 text-base font-semibold"
              >
                Get Started Free
              </Button>
            </Link>
            <Link to="/templates">
              <Button
                variant="outline-white"
                size="lg"
                className="px-8 py-3.5 text-base"
              >
                See Templates
              </Button>
            </Link>
          </div>

          {/* Floating mockup */}
          <div
            className="max-w-4xl mx-auto animate-float opacity-0 translate-y-4 transition-all duration-700 delay-300"
            data-reveal
          >
            <div className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden">
              {/* Browser chrome */}
              <div className="bg-white/[0.04] px-4 py-3 flex items-center gap-2 border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green-400/60" />
                </div>
                <div className="flex-1 bg-white/[0.06] rounded-md px-3 py-1 text-xs text-surface-500 text-center">
                  portfoliobuilder.com/alexchen
                </div>
              </div>
              {/* Mock portfolio content */}
              <div className="p-8 bg-gradient-to-br from-surface-200 to-surface-100">
                <div className="max-w-md">
                  <div className="w-16 h-16 rounded-full bg-brand-500/20 mb-4" />
                  <div className="h-8 bg-surface-800/90 rounded w-48 mb-3" />
                  <div className="h-4 bg-brand-500/40 rounded w-64 mb-2" />
                  <div className="h-3 bg-surface-800/20 rounded w-80 mb-6" />
                  <div className="flex gap-3">
                    <div className="h-9 bg-brand-500 rounded-lg w-28" />
                    <div className="h-9 bg-white/[0.06] rounded-lg w-28 border border-white/[0.1]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-4 bg-surface-100 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-surface-500">
            <Users className="w-4 h-4" />
            <p className="text-sm font-medium">
              Trusted by <span className="text-surface-900 font-semibold">1,000+</span> professionals
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-surface-50 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16" data-reveal>
            <h2 className="text-3xl font-bold text-surface-900 mb-4 font-heading opacity-0 translate-y-4 transition-all duration-700" data-reveal>
              Everything You Need
            </h2>
            <p className="text-surface-600 text-lg opacity-0 translate-y-4 transition-all duration-700 delay-100" data-reveal>
              Build, customise, and share — all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="text-center bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6 hover:border-white/[0.12] hover:shadow-[0_0_30px_rgba(234,179,8,0.08)] transition-all duration-300 opacity-0 translate-y-4"
                style={{ transitionDelay: `${i * 100}ms` }}
                data-reveal
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-surface-900 mb-2">{title}</h3>
                <p className="text-sm text-surface-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <section className="py-20 bg-surface-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold text-surface-900 mb-4 font-heading opacity-0 translate-y-4 transition-all duration-700"
              data-reveal
            >
              Choose Your Style
            </h2>
            <p className="text-surface-600 text-lg opacity-0 translate-y-4 transition-all duration-700 delay-100" data-reveal>
              Start with a professional template and make it yours.
            </p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 opacity-0 translate-y-4 transition-all duration-700 delay-200"
            data-reveal
          >
            {/* Template preview cards */}
            {[
              { name: 'Developer', gradient: 'from-slate-900 to-slate-800', accent: 'bg-emerald-500' },
              { name: 'Designer', gradient: 'from-stone-50 to-stone-100', accent: 'bg-rose-400' },
              { name: 'Creative', gradient: 'from-violet-600 to-pink-500', accent: 'bg-white' },
            ].map(({ name, gradient, accent }, i) => (
              <div
                key={name}
                className={`rounded-xl overflow-hidden bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.12] hover:shadow-[0_0_30px_rgba(234,179,8,0.08)] transform hover:-translate-y-2 transition-all duration-300 ${i === 1 ? 'md:-translate-y-4' : ''}`}
              >
                <div className={`h-48 bg-gradient-to-br ${gradient} p-6`}>
                  <div className={`w-8 h-8 rounded-full ${accent} opacity-60 mb-3`} />
                  <div className={`h-5 rounded w-32 mb-2 ${name === 'Designer' ? 'bg-stone-900/80' : 'bg-white/80'}`} />
                  <div className={`h-3 rounded w-48 ${name === 'Designer' ? 'bg-stone-900/40' : 'bg-white/40'}`} />
                </div>
                <div className="bg-surface-100 p-4">
                  <p className="font-semibold text-surface-900">{name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/templates"
              className="inline-flex items-center gap-1 text-brand-400 hover:text-brand-300 font-medium text-sm"
            >
              Browse All Templates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-surface-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2
            className="text-3xl font-bold text-surface-900 mb-16 font-heading text-center opacity-0 translate-y-4 transition-all duration-700"
            data-reveal
          >
            Three Simple Steps
          </h2>

          <div
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-4 opacity-0 translate-y-4 transition-all duration-700 delay-200"
            data-reveal
          >
            {steps.map(({ num, icon: Icon, title, desc }, i) => (
              <div key={num} className="flex-1 flex flex-col items-center text-center relative">
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+32px)] w-[calc(100%-64px)] border-t-2 border-dashed border-white/[0.1]" />
                )}

                <div className="w-12 h-12 rounded-full bg-brand-500 text-surface-50 flex items-center justify-center text-lg font-bold mb-4 relative z-10">
                  {num}
                </div>
                <Icon className="w-6 h-6 text-brand-400 mb-3" />
                <h3 className="font-semibold text-surface-900 mb-2">{title}</h3>
                <p className="text-sm text-surface-600 max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-surface-100 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2
            className="text-3xl font-bold text-surface-900 mb-4 font-heading text-center opacity-0 translate-y-4 transition-all duration-700"
            data-reveal
          >
            Simple, Transparent Pricing
          </h2>
          <p
            className="text-surface-600 text-lg text-center mb-12 opacity-0 translate-y-4 transition-all duration-700 delay-100"
            data-reveal
          >
            Start free. Upgrade when you need more power.
          </p>

          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto opacity-0 translate-y-4 transition-all duration-700 delay-200"
            data-reveal
          >
            {/* Free Plan */}
            <div className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 hover:border-white/[0.12] transition-all">
              <h3 className="text-lg font-semibold text-surface-900 mb-1">Free</h3>
              <p className="text-sm text-surface-500 mb-4">Perfect for getting started</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-surface-900">$0</span>
                <span className="text-surface-500 ml-1">forever</span>
              </div>
              <ul className="space-y-2.5 mb-8">
                {['Up to 5 portfolios', '10 professional templates', 'Custom themes', 'Analytics dashboard', 'SEO optimisation'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-surface-700">
                    <Check className="w-4 h-4 text-brand-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/sign-up">
                <Button variant="outline-white" className="w-full">Get Started</Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative bg-white/[0.06] backdrop-blur-xl border border-brand-500/30 rounded-2xl p-8 hover:border-brand-500/50 transition-all">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 text-xs font-semibold bg-brand-500 text-surface-50 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Popular
                </span>
              </div>
              <h3 className="text-lg font-semibold text-surface-900 mb-1">Pro</h3>
              <p className="text-sm text-surface-500 mb-4">For professionals who want more</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-surface-900">$9</span>
                <span className="text-surface-500 ml-1">/month</span>
              </div>
              <ul className="space-y-2.5 mb-8">
                {['Unlimited portfolios', 'AI content generation', 'All free features', 'Premium templates (coming soon)', 'Priority support'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-surface-700">
                    <Check className="w-4 h-4 text-brand-400 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/sign-up">
                <Button variant="gold" className="w-full">
                  <Zap className="w-4 h-4 mr-1" /> Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-surface-50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-12 text-center hover:border-white/[0.12] hover:shadow-[0_0_40px_rgba(234,179,8,0.06)] transition-all duration-500 opacity-0 translate-y-4 transition-all duration-700"
            data-reveal
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading bg-gradient-to-r from-surface-900 via-brand-300 to-brand-500 bg-clip-text text-transparent">
              Ready to Build Your Portfolio?
            </h2>
            <p className="text-surface-600 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of professionals showcasing their work.
            </p>
            <Link to="/sign-up">
              <Button
                variant="gold"
                size="lg"
                className="px-8 py-3.5 text-base font-semibold"
              >
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
