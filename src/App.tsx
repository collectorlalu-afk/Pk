import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

// Simple Router-like state
const getPath = () => window.location.pathname;

function App() {
  const path = getPath();

  // Smooth scroll behavior
  useEffect(() => {
    const handleScroll = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleScroll as any);
    });

    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleScroll as any);
      });
    };
  }, []);

  if (path === '/success') {
    return (
      <div className="bg-background min-h-screen text-white flex items-center justify-center p-4">
        <div className="glass-panel p-12 rounded-[3rem] text-center neon-border max-w-xl">
          <div className="w-20 h-20 bg-accent-green/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-gray-400 text-lg mb-10">
            Check your email for access instructions. Your journey to reselling success starts now.
          </p>
          <a href="/" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all inline-block">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen text-white selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <Features />
        
        {/* Final CTA Mid-section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-primary/5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="glass-panel p-12 rounded-[3rem] text-center neon-border bg-gradient-to-r from-primary/10 via-accent-purple/10 to-accent-blue/10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to stop guessing and start earning?</h2>
              <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                Join 5,000+ resellers who have already skipped the supplier-hunt and gone straight to profit.
              </p>
              <button 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-black hover:bg-gray-200 px-10 py-4 rounded-2xl font-bold text-xl transition-all shadow-xl"
              >
                Get Instant Access
              </button>
            </div>
          </div>
        </section>

        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
