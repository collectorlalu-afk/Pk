import Navbar from '../components/Navbar';
import Ticker from '../components/Ticker';
import Footer from '../components/Footer';
import Cart from '../components/Cart';
import { motion } from 'framer-motion';

const LegalPage = ({ title, content }: { title: string; content: React.ReactNode }) => {
  return (
    <div className="bg-black min-h-screen text-white font-sans antialiased">
      <Ticker />
      <Navbar />
      <main className="pt-40 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-12 uppercase">{title}</h1>
          <div className="prose prose-invert max-w-none prose-neutral">
            {content}
          </div>
        </motion.div>
      </main>
      <Footer />
      <Cart />
    </div>
  );
};

export const RefundPolicy = () => (
  <LegalPage
    title="Refund Policy"
    content={
      <div className="space-y-6 text-neutral-400 leading-relaxed font-medium">
        <p>Last Updated: June 2026</p>
        <p>Since PK Sells provides non-tangible, irrevocable digital goods, we do not issue refunds for any of our vendor directories once the order is confirmed and the product is sent.</p>
        <p>As a customer, you are responsible for understanding this upon purchasing any item at our site. We only make exceptions for this rule when the product appears to be not-as-described on a case-by-case basis at our sole discretion.</p>
        <h2 className="text-white text-2xl font-bold mt-12 mb-4 uppercase">Technical Issues</h2>
        <p>If you experience any issues receiving or downloading our products, please contact our support team immediately at support@pksells.com. We will ensure that you receive the product you paid for.</p>
      </div>
    }
  />
);

export const TermsOfService = () => (
  <LegalPage
    title="Terms of Service"
    content={
      <div className="space-y-6 text-neutral-400 leading-relaxed font-medium">
        <p>Last Updated: June 2026</p>
        <p>Welcome to PK Sells. By accessing our website and purchasing our digital products, you agree to comply with and be bound by the following terms and conditions.</p>
        <h2 className="text-white text-2xl font-bold mt-12 mb-4 uppercase">1. Digital Products</h2>
        <p>All products sold on PK Sells are digital directories. No physical goods will be shipped. Access is granted instantly via email or direct download after payment confirmation.</p>
        <h2 className="text-white text-2xl font-bold mt-12 mb-4 uppercase">2. Use License</h2>
        <p>Upon purchase, PK Sells grants you a personal, non-exclusive, non-transferable license to use the directory for your own reselling business. Redistribution or resale of our directories is strictly prohibited.</p>
        <h2 className="text-white text-2xl font-bold mt-12 mb-4 uppercase">3. Disclaimer</h2>
        <p>While we vet every vendor in our directory, PK Sells does not guarantee specific profit margins or business success. Your success depends on your own execution and market conditions.</p>
      </div>
    }
  />
);

export const PrivacyPolicy = () => (
  <LegalPage
    title="Privacy Policy"
    content={
      <div className="space-y-6 text-neutral-400 leading-relaxed font-medium">
        <p>Last Updated: June 2026</p>
        <p>At PK Sells, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.</p>
        <h2 className="text-white text-2xl font-bold mt-12 mb-4 uppercase">Information Collection</h2>
        <p>We collect information you provide directly to us when you make a purchase, such as your name, email address, and payment information (processed securely via Stripe or PayPal).</p>
        <h2 className="text-white text-2xl font-bold mt-12 mb-4 uppercase">Use of Information</h2>
        <p>We use your information to fulfill your orders, provide customer support, and send you occasional updates about our services (you can opt out at any time).</p>
        <h2 className="text-white text-2xl font-bold mt-12 mb-4 uppercase">Data Protection</h2>
        <p>We implement a variety of security measures to maintain the safety of your personal information. We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>
      </div>
    }
  />
);
