import { Palette, Target, Heart, Users } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const values = [
  {
    icon: Target,
    title: 'Simplicity First',
    desc: 'We believe building a portfolio should take minutes, not days. No code, no complexity — just results.',
  },
  {
    icon: Heart,
    title: 'Design for Everyone',
    desc: 'Whether you\'re a developer, designer, or freelancer, our templates and tools adapt to your style.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    desc: 'We listen to our users and build features that matter. Your feedback shapes the product.',
  },
];

export default function About() {
  return (
    <div>
      <Navbar />

      <section className="min-h-screen bg-surface-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-surface-900 via-brand-300 to-brand-500 bg-clip-text text-transparent mb-4">
              About PortfolioBuilder
            </h1>
            <p className="text-lg text-surface-600 max-w-xl mx-auto">
              We're on a mission to help professionals showcase their work beautifully.
            </p>
          </div>

          <div className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 md:p-12 mb-12">
            <h2 className="text-2xl font-bold text-surface-900 mb-4 font-heading">Our Story</h2>
            <div className="space-y-4 text-surface-600 leading-relaxed">
              <p>
                PortfolioBuilder was born from a simple frustration: creating a professional portfolio shouldn't require design skills or coding knowledge.
              </p>
              <p>
                We built a platform where anyone can go from zero to a published portfolio in minutes. Pick a template, add your content, customise the design, and hit publish. That's it.
              </p>
              <p>
                With features like AI content generation, a visual drag-and-drop editor, custom themes, and built-in analytics, we give you everything you need to stand out — all in one place.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-surface-900 mb-8 font-heading text-center">What We Believe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="text-center bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6 hover:border-white/[0.12] hover:shadow-[0_0_30px_rgba(234,179,8,0.08)] transition-all duration-300"
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

      <Footer />
    </div>
  );
}
