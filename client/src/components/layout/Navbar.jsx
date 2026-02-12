import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import {
  Menu,
  X,
  ChevronDown,
  Settings,
  HelpCircle,
  LogOut,
  LayoutDashboard,
  Palette,
} from 'lucide-react';
import Button from '../common/Button';
import { getProfile } from '../../services/userService';

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState('');
  const dropdownRef = useRef(null);

  // Fetch profile avatar
  useEffect(() => {
    if (!isSignedIn) return;
    getProfile()
      .then((data) => { if (data.avatarUrl) setAvatarUrl(data.avatarUrl); })
      .catch(() => {});
  }, [isSignedIn]);

  const profileImage = avatarUrl || user?.imageUrl;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? 'text-brand-400 border-b-2 border-brand-400 pb-1'
        : 'text-surface-600 hover:text-surface-800'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-surface-50/80 backdrop-blur-xl border-b border-white/[0.06] h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
            <Palette className="w-5 h-5 text-surface-50" />
          </div>
          <span className="text-xl font-bold text-brand-500 font-heading">
            PortfolioBuilder
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {isSignedIn ? (
            <>
              <Link to="/templates" className={navLinkClass('/templates')}>
                Templates
              </Link>
              <Link to="/dashboard" className={navLinkClass('/dashboard')}>
                Dashboard
              </Link>

              {/* User dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-lg hover:bg-white/[0.06] transition-colors"
                >
                  <img
                    src={profileImage}
                    alt={user?.fullName || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                  <ChevronDown className="w-4 h-4 text-surface-500" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-surface-100 rounded-xl shadow-lg border border-white/[0.08] py-1 origin-top-right animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-white/[0.06]">
                      <p className="text-sm font-medium text-surface-900">
                        {user?.fullName}
                      </p>
                      <p className="text-xs text-surface-500 truncate">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-surface-700 hover:bg-white/[0.06]"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-surface-700 hover:bg-white/[0.06]"
                    >
                      <HelpCircle className="w-4 h-4" />
                      Help
                    </a>
                    <div className="border-t border-white/[0.06] my-1" />
                    <button
                      onClick={() => signOut()}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-surface-700 hover:bg-white/[0.06]"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/pricing" className={navLinkClass('/pricing')}>
                Pricing
              </Link>
              <Link to="/sign-in">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link to="/sign-up">
                <Button variant="gold">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-surface-600 hover:bg-white/[0.06] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-surface-100 shadow-xl animate-in slide-in-from-right duration-300">
            <div className="flex flex-col p-4 gap-2">
              {isSignedIn ? (
                <>
                  <div className="flex items-center gap-3 p-3 mb-2">
                    <img
                      src={profileImage}
                      alt={user?.fullName || 'User'}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-surface-900">{user?.fullName}</p>
                      <p className="text-xs text-surface-500">
                        {user?.primaryEmailAddress?.emailAddress}
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.06] text-sm text-surface-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <Link
                    to="/templates"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.06] text-sm text-surface-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Palette className="w-4 h-4" />
                    Templates
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.06] text-sm text-surface-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <div className="border-t border-white/[0.06] my-2" />
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.06] text-sm text-surface-700"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/pricing"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.06] text-sm text-surface-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link
                    to="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="gold" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
