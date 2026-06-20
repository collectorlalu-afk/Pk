import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import { RefundPolicy, TermsOfService, PrivacyPolicy } from './pages/Legal';
import { CartProvider } from './context/CartContext';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function SuccessPage() {
  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center p-4 selection:bg-white/30">
      <div className="luxury-border p-12 rounded-[2.5rem] text-center bg-card max-w-xl">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight uppercase">Payment Successful</h1>
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
          Your journey starts now. Please check your email for the access links and instructions.
        </p>
        <Link to="/" className="inline-block w-full bg-white text-black hover:bg-neutral-200 py-4 px-8 rounded-2xl font-bold text-lg transition-all">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/refunds" element={<RefundPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </HashRouter>
    </CartProvider>
  );
}

export default App;
