import { useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCards from './components/ProductCards';
import FAQ from './components/FAQ';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';

// Simple Router-like state
const getPath = () => window.location.pathname;

function AppContent() {
  const path = getPath();

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  if (path === '/success') {
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
          <a href="/Pk/" className="inline-block w-full bg-white text-black hover:bg-neutral-200 py-4 px-8 rounded-2xl font-bold text-lg transition-all">
            Back to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 font-sans antialiased">
      <Navbar />
      
      <main className="pt-20">
        <div className="bg-grid absolute inset-0 pointer-events-none opacity-50" />
        
        <div id="products">
          <ProductCards />
        </div>

        <TrustSection />
        
        <FAQ />
        
        <MobileStickyBar />
      </main>

      <Footer />
      <Cart />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
