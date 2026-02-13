import { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useToast } from '../context/ThemeContext';

export default function Contact() {
  const toast = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all fields.');
      return;
    }
    setSending(true);
    // Simulate send — wire up to a real endpoint later
    setTimeout(() => {
      toast.success('Message sent! We\'ll get back to you soon.');
      setForm({ name: '', email: '', message: '' });
      setSending(false);
    }, 1000);
  };

  return (
    <div>
      <Navbar />

      <section className="min-h-screen bg-surface-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-surface-900 via-brand-300 to-brand-500 bg-clip-text text-transparent mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-surface-600 max-w-xl mx-auto">
              Have a question, feedback, or just want to say hi? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6 hover:border-white/[0.12] transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-surface-900 mb-1">Email</h3>
              <p className="text-sm text-surface-500">support@portfoliobuilder.com</p>
            </div>
            <div className="text-center bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6 hover:border-white/[0.12] transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-surface-900 mb-1">Response Time</h3>
              <p className="text-sm text-surface-500">Usually within 24 hours</p>
            </div>
            <div className="text-center bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-xl p-6 hover:border-white/[0.12] transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center mx-auto mb-4">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-surface-900 mb-1">Feedback</h3>
              <p className="text-sm text-surface-500">We read every message</p>
            </div>
          </div>

          <div className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 md:p-12 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-surface-900 mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
              />
              <div>
                <label className="block text-sm font-medium text-surface-600 mb-1">Message</label>
                <textarea
                  className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] px-3 py-2 text-sm text-surface-800 placeholder:text-surface-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500/50 transition-all resize-none"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we help?"
                  maxLength={2000}
                />
              </div>
              <Button type="submit" loading={sending} className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
