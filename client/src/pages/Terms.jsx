import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using PortfolioBuilder, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service.`,
  },
  {
    title: '2. Description of Service',
    content: `PortfolioBuilder is a web-based platform that allows users to create, customise, and publish professional portfolio websites. We offer both free and paid subscription plans with varying features.`,
  },
  {
    title: '3. User Accounts',
    content: `You must create an account to use PortfolioBuilder. You are responsible for maintaining the security of your account and for all activities that occur under your account. You must provide accurate information when creating your account.`,
  },
  {
    title: '4. User Content',
    content: `You retain ownership of all content you create and upload to PortfolioBuilder, including text, images, and other media. By publishing a portfolio, you grant us a limited licence to host and display your content as part of the service. You are solely responsible for the content you publish and must ensure it does not violate any laws or third-party rights.`,
  },
  {
    title: '5. Acceptable Use',
    content: `You agree not to use PortfolioBuilder to: publish illegal, harmful, or offensive content; infringe on intellectual property rights; distribute malware or spam; attempt to gain unauthorised access to our systems; or use the service in any way that could damage or impair it for other users.`,
  },
  {
    title: '6. Paid Subscriptions',
    content: `Paid plans are billed on a recurring monthly basis. You can cancel your subscription at any time, and you will retain access to paid features until the end of your current billing period. Refunds are handled on a case-by-case basis.`,
  },
  {
    title: '7. Service Availability',
    content: `We strive to keep PortfolioBuilder available at all times, but we do not guarantee uninterrupted access. We may perform maintenance or updates that temporarily affect availability. We are not liable for any losses resulting from service downtime.`,
  },
  {
    title: '8. Intellectual Property',
    content: `The PortfolioBuilder platform, including its design, templates, code, and branding, is owned by us and protected by intellectual property laws. You may not copy, modify, or distribute any part of the platform without our written permission.`,
  },
  {
    title: '9. Limitation of Liability',
    content: `PortfolioBuilder is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the service. Our total liability shall not exceed the amount you have paid us in the 12 months preceding the claim.`,
  },
  {
    title: '10. Account Termination',
    content: `We reserve the right to suspend or terminate your account if you violate these terms. You may delete your account at any time from the Settings page. Upon termination, your data will be permanently deleted.`,
  },
  {
    title: '11. Changes to Terms',
    content: `We may update these terms from time to time. We will notify users of significant changes via email or through the service. Continued use of PortfolioBuilder after changes constitutes acceptance of the updated terms.`,
  },
  {
    title: '12. Contact',
    content: `If you have any questions about these Terms of Service, please contact us at support@portfoliobuilder.com.`,
  },
];

export default function Terms() {
  return (
    <div>
      <Navbar />

      <section className="min-h-screen bg-surface-50 py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-surface-900 via-brand-300 to-brand-500 bg-clip-text text-transparent mb-4">
              Terms of Service
            </h1>
            <p className="text-sm text-surface-500">
              Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 md:p-12">
            <p className="text-surface-600 leading-relaxed mb-8">
              These terms govern your use of PortfolioBuilder. Please read them carefully before using the service.
            </p>

            <div className="space-y-8">
              {sections.map(({ title, content }) => (
                <div key={title}>
                  <h2 className="text-lg font-semibold text-surface-900 mb-2">{title}</h2>
                  <p className="text-surface-600 leading-relaxed text-sm">{content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
