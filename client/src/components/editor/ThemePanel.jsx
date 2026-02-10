import { useState } from 'react';
import { Sun, Moon, Check, RotateCcw } from 'lucide-react';
import { useEditor } from '../../context/EditorContext';

const PRESET_PALETTES = [
  {
    name: 'Ocean',
    colors: { primary: '#0ea5e9', secondary: '#06b6d4', accent: '#f59e0b', background: '#ffffff', text: '#0f172a' },
  },
  {
    name: 'Sunset',
    colors: { primary: '#f97316', secondary: '#ef4444', accent: '#eab308', background: '#fffbeb', text: '#1c1917' },
  },
  {
    name: 'Forest',
    colors: { primary: '#16a34a', secondary: '#059669', accent: '#84cc16', background: '#f0fdf4', text: '#14532d' },
  },
  {
    name: 'Monochrome',
    colors: { primary: '#374151', secondary: '#6b7280', accent: '#111827', background: '#ffffff', text: '#111827' },
  },
  {
    name: 'Midnight',
    colors: { primary: '#8b5cf6', secondary: '#6366f1', accent: '#ec4899', background: '#0f172a', text: '#f8fafc' },
  },
];

const PRESET_COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308',
  '#84cc16', '#22c55e', '#14b8a6', '#06b6d4',
  '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6',
  '#a855f7', '#d946ef', '#ec4899', '#f43f5e',
];

const FONT_PAIRINGS = [
  { id: 'inter-dm', heading: 'Inter', body: 'DM Sans' },
  { id: 'playfair-source', heading: 'Playfair Display', body: 'Source Sans 3' },
  { id: 'space-inter', heading: 'Space Grotesk', body: 'Inter' },
  { id: 'merriweather-open', heading: 'Merriweather', body: 'Open Sans' },
  { id: 'poppins-nunito', heading: 'Poppins', body: 'Nunito' },
];

const SPACING_OPTIONS = [
  { id: 'compact', label: 'Compact' },
  { id: 'normal', label: 'Normal' },
  { id: 'spacious', label: 'Spacious' },
];

function ColorSwatch({ color, isActive, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1"
      title={label}
    >
      <div
        className="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all"
        style={{
          backgroundColor: color,
          borderColor: isActive ? color : 'transparent',
          boxShadow: isActive ? `0 0 0 2px ${color}40` : 'none',
        }}
      >
        {isActive && <Check className="w-3.5 h-3.5 text-white" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))' }} />}
      </div>
      <span className="text-[10px] text-surface-500">{label}</span>
    </button>
  );
}

function ColorPickerPopover({ currentColor, onSelect, onClose }) {
  const [hex, setHex] = useState(currentColor || '#000000');

  return (
    <div className="absolute z-20 mt-1 p-3 bg-surface-100 border border-white/[0.08] rounded-lg shadow-lg w-52">
      <div className="grid grid-cols-4 gap-2 mb-3">
        {PRESET_COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => { onSelect(c); onClose(); }}
            className="w-8 h-8 rounded-full border border-white/[0.1] flex items-center justify-center hover:scale-110 transition-transform"
            style={{ backgroundColor: c }}
          >
            {currentColor === c && <Check className="w-3 h-3 text-white" style={{ filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.5))' }} />}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && /^#[0-9A-Fa-f]{6}$/.test(hex)) {
              onSelect(hex);
              onClose();
            }
          }}
          className="flex-1 rounded border border-white/[0.1] bg-white/[0.06] px-2 py-1 text-xs font-mono text-surface-800"
          placeholder="#000000"
        />
        <button
          type="button"
          onClick={() => {
            if (/^#[0-9A-Fa-f]{6}$/.test(hex)) { onSelect(hex); onClose(); }
          }}
          className="px-2 py-1 text-xs bg-brand-500 text-surface-50 rounded hover:bg-brand-400"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default function ThemePanel() {
  const { portfolio, updateTheme } = useEditor();
  const theme = portfolio?.theme || {};
  const colorScheme = theme.colorScheme || {};

  const [activeColorKey, setActiveColorKey] = useState(null);

  const colorKeys = [
    { key: 'primary', label: 'Primary' },
    { key: 'secondary', label: 'Secondary' },
    { key: 'accent', label: 'Accent' },
    { key: 'background', label: 'BG' },
    { key: 'text', label: 'Text' },
  ];

  const updateColor = (key, value) => {
    updateTheme({ colorScheme: { ...colorScheme, [key]: value } });
  };

  const applyPalette = (palette) => {
    updateTheme({ colorScheme: { ...colorScheme, ...palette.colors } });
  };

  const defaultTheme = portfolio?._defaultTheme || theme;

  const resetToDefaults = () => {
    if (window.confirm('Reset theme to template defaults?')) {
      updateTheme(defaultTheme);
    }
  };

  return (
    <div className="space-y-6">
      {/* Colour Scheme */}
      <div>
        <h4 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">Colour Scheme</h4>
        <div className="flex justify-between relative">
          {colorKeys.map(({ key, label }) => (
            <div key={key} className="relative">
              <ColorSwatch
                color={colorScheme[key] || '#000'}
                isActive={activeColorKey === key}
                onClick={() => setActiveColorKey(activeColorKey === key ? null : key)}
                label={label}
              />
              {activeColorKey === key && (
                <ColorPickerPopover
                  currentColor={colorScheme[key]}
                  onSelect={(c) => updateColor(key, c)}
                  onClose={() => setActiveColorKey(null)}
                />
              )}
            </div>
          ))}
        </div>

        {/* Preset palettes */}
        <div className="mt-4 space-y-2">
          <p className="text-xs text-surface-500">Presets</p>
          {PRESET_PALETTES.map((palette) => (
            <button
              key={palette.name}
              type="button"
              onClick={() => applyPalette(palette)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex gap-0.5">
                {Object.values(palette.colors).map((c, i) => (
                  <div key={i} className="w-4 h-4 rounded-full border border-white/[0.1]" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="text-xs text-surface-600">{palette.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div>
        <h4 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">Typography</h4>
        <div className="space-y-1.5">
          {FONT_PAIRINGS.map((pair) => (
            <button
              key={pair.id}
              type="button"
              onClick={() => updateTheme({ fontPairing: pair })}
              className={`w-full text-left px-3 py-2 rounded-lg border transition-colors ${
                theme.fontPairing?.id === pair.id
                  ? 'border-brand-500 bg-brand-500/10'
                  : 'border-white/[0.08] hover:border-white/[0.12]'
              }`}
            >
              <span className="text-sm font-semibold text-surface-800" style={{ fontFamily: pair.heading }}>{pair.heading}</span>
              <span className="text-xs text-surface-500 ml-1">+</span>
              <span className="text-xs text-surface-500 ml-1" style={{ fontFamily: pair.body }}>{pair.body}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mode */}
      <div>
        <h4 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">Mode</h4>
        <div className="flex gap-2">
          {[
            { id: 'light', label: 'Light', icon: Sun },
            { id: 'dark', label: 'Dark', icon: Moon },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => updateTheme({ mode: id })}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                theme.mode === id
                  ? 'bg-brand-500 text-surface-50'
                  : 'bg-white/[0.06] text-surface-600 hover:bg-white/[0.1]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Spacing */}
      <div>
        <h4 className="text-xs font-semibold text-surface-500 uppercase tracking-wider mb-3">Spacing</h4>
        <div className="flex gap-2">
          {SPACING_OPTIONS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => updateTheme({ spacing: id })}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors border-2 ${
                theme.spacing === id
                  ? 'border-brand-500 bg-brand-500/10 text-brand-400'
                  : 'border-white/[0.08] text-surface-600 hover:border-white/[0.12]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Reset */}
      <button
        type="button"
        onClick={resetToDefaults}
        className="flex items-center gap-1 text-sm text-surface-500 hover:text-surface-700 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Reset to template defaults
      </button>
    </div>
  );
}
