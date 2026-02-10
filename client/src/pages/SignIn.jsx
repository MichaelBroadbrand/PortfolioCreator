import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Palette } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel — desktop only */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-600 to-brand-800 flex-col items-center justify-center p-12 text-white relative overflow-hidden">
        {/* Abstract SVG pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 800">
            <circle cx="400" cy="400" r="300" fill="none" stroke="white" strokeWidth="1" />
            <circle cx="400" cy="400" r="200" fill="none" stroke="white" strokeWidth="1" />
            <circle cx="400" cy="400" r="100" fill="none" stroke="white" strokeWidth="1" />
            <circle cx="200" cy="200" r="80" fill="none" stroke="white" strokeWidth="0.5" />
            <circle cx="600" cy="600" r="120" fill="none" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Palette className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold font-heading mb-4">
            PortfolioBuilder
          </h1>
          <p className="text-xl text-brand-200 max-w-md">
            Build your portfolio in minutes. No design skills needed.
          </p>
        </div>
      </div>

      {/* Right side — Clerk component */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            afterSignInUrl="/dashboard"
          />
          <p className="text-center text-sm text-surface-500 mt-6">
            Don't have an account?{' '}
            <Link to="/sign-up" className="text-brand-600 hover:text-brand-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
