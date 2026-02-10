import { SignUp } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Palette } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel — desktop only */}
      <div className="hidden lg:flex lg:w-1/2 bg-surface-100 flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Ambient amber glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(234,179,8,0.06) 0%, transparent 70%)',
          }}
        />
        <div className="absolute inset-0 opacity-100">
          <svg className="w-full h-full" viewBox="0 0 800 800">
            <circle cx="400" cy="400" r="300" fill="none" stroke="rgba(234,179,8,0.15)" strokeWidth="1" />
            <circle cx="400" cy="400" r="200" fill="none" stroke="rgba(234,179,8,0.12)" strokeWidth="1" />
            <circle cx="400" cy="400" r="100" fill="none" stroke="rgba(234,179,8,0.1)" strokeWidth="1" />
            <circle cx="200" cy="200" r="80" fill="none" stroke="rgba(234,179,8,0.08)" strokeWidth="0.5" />
            <circle cx="600" cy="600" r="120" fill="none" stroke="rgba(234,179,8,0.08)" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Palette className="w-10 h-10 text-brand-400" />
          </div>
          <h1 className="text-4xl font-bold font-heading mb-4 text-surface-900">
            PortfolioBuilder
          </h1>
          <p className="text-xl text-surface-600 max-w-md">
            Build your portfolio in minutes. No design skills needed.
          </p>
        </div>
      </div>

      {/* Right side — Clerk component */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-surface-50">
        <div className="w-full max-w-md">
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            afterSignUpUrl="/dashboard"
          />
          <p className="text-center text-sm text-surface-500 mt-6">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-brand-400 hover:text-brand-300 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
