import { useState, useEffect, useRef } from 'react';
import { User, Shield, Bell, AlertTriangle, Camera, Loader2 } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { useToast } from '../context/ThemeContext';
import { getProfile, updateProfile, deleteAccount } from '../services/userService';
import useImageUpload from '../hooks/useImageUpload';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'account', label: 'Account', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
];

function ProfileTab({ profile, onSave }) {
  const [name, setName] = useState(profile.displayName || '');
  const [bio, setBio] = useState(profile.bio || '');
  const [saving, setSaving] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || '');
  const fileInputRef = useRef(null);
  const { upload, uploading } = useImageUpload();
  const toast = useToast();

  const handleSave = async () => {
    setSaving(true);
    await onSave({ displayName: name, bio, avatarUrl });
    setSaving(false);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await upload(file, 'portfolio-builder/avatars');
      setAvatarUrl(result.url);
      await onSave({ avatarUrl: result.url });
    } catch (err) {
      toast.error(err.message || 'Failed to upload avatar');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Profile Information</h3>

        {/* Avatar */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-surface-600 mb-2">Avatar</label>
          <div className="flex items-center gap-4">
            <div
              onClick={() => !uploading && fileInputRef.current?.click()}
              className="w-20 h-20 rounded-full bg-white/[0.06] border-2 border-dashed border-surface-400 flex items-center justify-center overflow-hidden group cursor-pointer hover:border-brand-500/50 transition-colors relative"
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-6 h-6 text-surface-500" />
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-full">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => !uploading && fileInputRef.current?.click()}
                className="text-sm text-brand-400 hover:text-brand-300 font-medium"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Upload photo'}
              </button>
              <p className="text-xs text-surface-500 mt-0.5">JPG, PNG, or WebP. Max 5MB.</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="space-y-4 max-w-md">
          <Input
            label="Display Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />

          <div>
            <label className="block text-sm font-medium text-surface-600 mb-1">Bio</label>
            <textarea
              className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-3 py-2 text-sm text-surface-800 placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all resize-none"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value.slice(0, 500))}
              placeholder="Tell us about yourself..."
              maxLength={500}
            />
            <p className="text-xs text-surface-500 mt-1 text-right">{bio.length}/500</p>
          </div>

          <Button onClick={handleSave} loading={saving}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

function AccountTab({ profile }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-surface-900 mb-4">Account Details</h3>
        <div className="space-y-4 max-w-md">
          <Input label="Email" value={profile.email || ''} disabled />
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-4">
            <p className="text-sm font-medium text-surface-700">Plan</p>
            <p className="text-sm text-surface-600 capitalize">{profile.plan || 'Free'}</p>
          </div>
          <p className="text-xs text-surface-500">
            Account managed via Clerk. Password and connected accounts are handled there.
          </p>
        </div>
      </div>
    </div>
  );
}

function NotificationsTab({ profile, onSave }) {
  const notifications = profile.emailNotifications || {
    contactForm: true,
    weeklyDigest: true,
    productUpdates: false,
  };

  const toggleNotification = async (key) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    await onSave({ emailNotifications: updated });
  };

  const toggleItems = [
    { key: 'contactForm', label: 'Contact Form Messages', description: 'Get notified when someone submits your contact form' },
    { key: 'weeklyDigest', label: 'Weekly Analytics Digest', description: 'Receive a weekly summary of your portfolio views' },
    { key: 'productUpdates', label: 'Product Updates', description: 'Hear about new features and improvements' },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-surface-900 mb-4">Email Notifications</h3>
      <div className="space-y-4 max-w-md">
        {toggleItems.map(({ key, label, description }) => (
          <div key={key} className="flex items-center justify-between py-3 border-b border-white/[0.06]">
            <div>
              <p className="text-sm font-medium text-surface-800">{label}</p>
              <p className="text-xs text-surface-500 mt-0.5">{description}</p>
            </div>
            <button
              type="button"
              onClick={() => toggleNotification(key)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                notifications[key] ? 'bg-brand-500' : 'bg-surface-400'
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  notifications[key] ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DangerTab({ onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div>
      <h3 className="text-lg font-semibold text-error-500 mb-4">Danger Zone</h3>
      <div className="border border-error-500/20 bg-error-500/5 rounded-lg p-4 max-w-md">
        <h4 className="font-medium text-surface-900 mb-1">Delete Account</h4>
        <p className="text-sm text-surface-600 mb-4">
          Permanently delete your account and all portfolios. This action cannot be undone.
        </p>
        <Button variant="danger" size="sm" onClick={() => setShowConfirm(true)}>
          Delete Account
        </Button>
      </div>

      {showConfirm && (
        <ConfirmDialog
          title="Delete Account"
          message="This will permanently delete your account and all portfolios. This cannot be undone. Are you absolutely sure?"
          confirmLabel="Delete My Account"
          onConfirm={onDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default function Settings() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    displayName: '',
    email: '',
    bio: '',
    avatarUrl: '',
    plan: 'free',
    emailNotifications: { contactForm: true, weeklyDigest: true, productUpdates: false },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch {
        // Use defaults
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (updates) => {
    try {
      const data = await updateProfile(updates);
      setProfile((prev) => ({ ...prev, ...data }));
      toast.success('Settings saved!');
    } catch (err) {
      toast.error(err.message || 'Failed to save');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      toast.success('Account deleted');
      window.location.href = '/';
    } catch (err) {
      toast.error(err.message || 'Failed to delete account');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-surface-900 mb-6">Settings</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Tab nav */}
          <div className="md:w-48 shrink-0">
            <nav className="flex md:flex-col gap-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                    activeTab === id
                      ? 'bg-brand-500/10 text-brand-400'
                      : id === 'danger'
                        ? 'text-error-500 hover:bg-error-500/10'
                        : 'text-surface-600 hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab content */}
          <div className="flex-1 bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6">
            {loading ? (
              <p className="text-surface-500">Loading...</p>
            ) : (
              <>
                {activeTab === 'profile' && <ProfileTab profile={profile} onSave={handleSave} />}
                {activeTab === 'account' && <AccountTab profile={profile} />}
                {activeTab === 'notifications' && <NotificationsTab profile={profile} onSave={handleSave} />}
                {activeTab === 'danger' && <DangerTab onDelete={handleDeleteAccount} />}
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
