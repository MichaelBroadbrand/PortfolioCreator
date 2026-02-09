import { Link } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        {/* Background 404 */}
        <p className="text-8xl font-bold text-gray-200 select-none">404</p>

        {/* Illustration */}
        <div className="flex justify-center -mt-12 mb-6">
          <div className="w-24 h-24 bg-surface-100 rounded-full flex items-center justify-center">
            <FileQuestion className="w-12 h-12 text-surface-400" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-2xl font-semibold text-surface-900 mb-2">
          Portfolio not found
        </h1>
        <p className="text-surface-500 mb-8 max-w-md mx-auto">
          This portfolio doesn't exist or has been unpublished.
        </p>

        {/* CTA */}
        <Link to="/">
          <Button variant="primary" size="lg">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
