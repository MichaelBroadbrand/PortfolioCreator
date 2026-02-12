import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Palette, Github, Twitter } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToFeatures = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <footer className="bg-surface-50 text-surface-500 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-surface-50" />
              </div>
              <span className="text-lg font-bold text-surface-800 font-heading">
                PortfolioBuilder
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Build stunning portfolios in minutes. No design skills needed.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-surface-800 mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#features" onClick={scrollToFeatures} className="hover:text-brand-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <Link to="/templates" className="hover:text-brand-400 transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-brand-400 transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-surface-800 mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-brand-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-surface-800 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-brand-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-brand-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} PortfolioBuilder. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hover:text-brand-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="hover:text-brand-400 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
