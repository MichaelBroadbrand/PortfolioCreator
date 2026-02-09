import { useState } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';

export default function ContactForm({ slug, theme }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const colorScheme = theme?.colorScheme || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('All fields are required');
      return;
    }
    setError('');
    setSending(true);
    try {
      const { submitContactForm } = await import('../../services/publicService');
      await submitContactForm(slug, form);
      setSent(true);
    } catch (err) {
      setError(err.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center py-8">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
          style={{ backgroundColor: `${colorScheme.primary}20` }}
        >
          <Check className="w-6 h-6" style={{ color: colorScheme.primary }} />
        </div>
        <p className="font-semibold" style={{ color: colorScheme.text }}>Message sent!</p>
        <p className="text-sm mt-1" style={{ color: `${colorScheme.text}80` }}>
          Thanks for reaching out. I'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <input
          type="text"
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
          style={{
            borderColor: `${colorScheme.text}20`,
            color: colorScheme.text,
            backgroundColor: `${colorScheme.background}`,
          }}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition-all"
          style={{
            borderColor: `${colorScheme.text}20`,
            color: colorScheme.text,
            backgroundColor: colorScheme.background,
          }}
        />
      </div>
      <div>
        <textarea
          placeholder="Your message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 resize-none transition-all"
          style={{
            borderColor: `${colorScheme.text}20`,
            color: colorScheme.text,
            backgroundColor: colorScheme.background,
          }}
        />
      </div>
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}
      <button
        type="submit"
        disabled={sending}
        className="w-full py-2.5 rounded-lg text-white text-sm font-medium transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        style={{ backgroundColor: colorScheme.primary }}
      >
        <Send className="w-4 h-4" />
        {sending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
