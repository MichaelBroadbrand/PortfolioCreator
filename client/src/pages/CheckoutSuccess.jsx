import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Layout } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';

export default function CheckoutSuccess() {
  return (
    <div>
      <Navbar />

      <section className="min-h-[80vh] flex items-center justify-center bg-surface-50">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-success-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-success-500" />
          </div>

          <h1 className="text-3xl font-bold text-surface-900 mb-3 font-heading">
            Welcome to Pro!
          </h1>
          <p className="text-surface-600 mb-8">
            Your subscription is active. You now have unlimited portfolios and AI-powered content generation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/dashboard">
              <Button variant="gold">
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/templates">
              <Button variant="outline-white">
                <Layout className="w-4 h-4 mr-1" />
                Start Building
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
