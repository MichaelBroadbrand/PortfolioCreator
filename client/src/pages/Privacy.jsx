import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const sections = [
  {
    title: '1. Information We Collect',
    content: `When you create an account, we collect your email address and display name through our authentication provider (Clerk). When you use our service, we collect the content you add to your portfolios, your theme preferences, and basic usage analytics such as page views. We only collect personal information that is adequate, relevant, and not excessive for the purposes described in this policy, in accordance with the Protection of Personal Information Act (POPIA).`,
  },
  {
    title: '2. Legal Basis for Processing',
    content: `We process your personal information on the following lawful grounds under POPIA and GDPR: (a) your consent, which you provide when creating an account and using the service; (b) contractual necessity, as processing is required to deliver the service you signed up for; and (c) legitimate interest, for analytics and service improvement. You may withdraw your consent at any time by deleting your account, without affecting the lawfulness of processing carried out before withdrawal.`,
  },
  {
    title: '3. How We Use Your Information',
    content: `We use your information to provide and improve the PortfolioBuilder service, including: creating and managing your account, storing and displaying your portfolio content, providing analytics about your portfolio views, sending service-related notifications, and processing payments if you subscribe to a paid plan. We will not use your personal information for purposes other than those stated here without your prior consent.`,
  },
  {
    title: '4. Data Storage & Security',
    content: `Your data is stored securely using industry-standard encryption and security practices. Portfolio content is stored in our database, and uploaded images are stored via our cloud storage provider (Cloudinary). We take reasonable technical and organisational measures to protect your personal information from unauthorised access, loss, or disclosure, as required under Section 19 of POPIA. In the event of a data breach that poses a risk to you, we will notify the Information Regulator and affected users as soon as reasonably possible.`,
  },
  {
    title: '5. Third-Party Services & Cross-Border Transfers',
    content: `We use the following third-party services to operate PortfolioBuilder: Clerk for authentication, Cloudinary for image hosting, and Lemon Squeezy for payment processing. These services may process your data outside of South Africa. In accordance with Section 72 of POPIA, we ensure that any cross-border transfer of personal information is to a jurisdiction with adequate data protection laws, or is necessary to perform our contract with you. Each third-party service has their own privacy policies governing how they handle your data.`,
  },
  {
    title: '6. Your Published Portfolios',
    content: `When you publish a portfolio, the content you've added becomes publicly accessible via your portfolio URL. This includes text, images, and any other content you've added to your portfolio sections. You can unpublish your portfolio at any time to remove public access. Please note that published content may be cached by search engines or third parties, and we cannot control external copies.`,
  },
  {
    title: '7. Cookies & Analytics',
    content: `We use basic analytics to understand how our service is used, including tracking portfolio page views and visitor counts. We do not use third-party tracking cookies or sell your data to advertisers. We do not engage in direct marketing without your explicit opt-in consent.`,
  },
  {
    title: '8. Your Rights',
    content: `Under POPIA and applicable data protection laws, you have the right to: (a) access the personal information we hold about you; (b) request correction of inaccurate information; (c) request deletion of your personal information; (d) object to the processing of your information; and (e) lodge a complaint with the Information Regulator (South Africa) if you believe your rights have been infringed. To exercise any of these rights, contact us at support@portfoliobuilder.com.`,
  },
  {
    title: '9. Data Retention & Deletion',
    content: `We retain your personal information only for as long as necessary to provide the service and fulfil the purposes described in this policy. You can delete your account at any time from the Settings page. When you delete your account, your user data and portfolios are permanently removed from our systems within 30 days. If you need assistance with data deletion, contact us at support@portfoliobuilder.com.`,
  },
  {
    title: '10. Children\u2019s Privacy',
    content: `PortfolioBuilder is not intended for use by children under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child without appropriate consent, we will delete it promptly.`,
  },
  {
    title: '11. Changes to This Policy',
    content: `We may update this privacy policy from time to time. We will notify users of significant changes via email or through the service. Continued use of PortfolioBuilder after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '12. Information Regulator (South Africa)',
    content: `If you have concerns about how we handle your personal information, you may contact the Information Regulator: The Information Regulator (South Africa), JD House, 27 Stiemens Street, Braamfontein, Johannesburg, 2001. Email: enquiries@inforegulator.org.za.`,
  },
  {
    title: '13. Contact Us',
    content: `If you have any questions about this privacy policy or how we handle your data, please contact us at support@portfoliobuilder.com.`,
  },
];

export default function Privacy() {
  return (
    <div>
      <Navbar />

      <section className="min-h-screen bg-surface-50 py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-surface-900 via-brand-300 to-brand-500 bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm text-surface-500">
              Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 md:p-12">
            <p className="text-surface-600 leading-relaxed mb-8">
              At PortfolioBuilder, we take your privacy seriously. This policy explains what information we collect, how we use it, and your rights regarding your data. We are committed to complying with the Protection of Personal Information Act, 2013 (POPIA) of South Africa and applicable international data protection regulations.
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
