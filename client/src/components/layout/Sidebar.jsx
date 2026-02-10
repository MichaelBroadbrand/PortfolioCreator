import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Palette,
  BarChart3,
  Settings,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/templates', label: 'Templates', icon: Palette },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-surface-100 border-r border-white/[0.06] min-h-[calc(100vh-4rem)]">
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-colors duration-200
                  ${isActive ? 'bg-white/[0.08] text-brand-400' : 'text-surface-600 hover:text-surface-800 hover:bg-white/[0.04]'}
                `}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-100 border-t border-white/[0.06] h-16">
        <div className="flex items-center justify-around h-full">
          {navItems.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`
                  flex flex-col items-center gap-1 text-xs font-medium
                  transition-colors duration-200
                  ${isActive ? 'text-brand-400' : 'text-surface-500'}
                `}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
