import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';

export default function CheckoutCancel() {
  return (
    <div>
      <Navbar />

      <section className="min-h-[80vh] flex items-center justify-center bg-surface-50">
        <div className="max-w-md mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-surface-900 mb-3 font-heading">
            Changed your mind?
          </h1>
          <p className="text-surface-600 mb-8">
            No worries! You can upgrade anytime from your dashboard or settings.
          </p>

          <Link to="/dashboard">
            <Button variant="outline-white">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
