import Navbar from '../components/Navbar';
import Ticker from '../components/Ticker';
import ProductCards from '../components/ProductCards';
import FAQ from '../components/FAQ';
import TrustSection from '../components/TrustSection';
import Footer from '../components/Footer';
import MobileStickyBar from '../components/MobileStickyBar';
import Cart from '../components/Cart';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';

function Home() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/30 font-sans antialiased">
      <Ticker />
      <Navbar />
      
      <main>
        <Hero />
        
        <div id="products">
          <ProductCards />
        </div>

        <Features />

        <TrustSection />
        
        <Testimonials />

        <FAQ />
        
        <MobileStickyBar />
      </main>

      <Footer />
      <Cart />
    </div>
  );
}

export default Home;
