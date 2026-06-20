import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-sm">PK</span>
              </div>
              <span className="text-xl font-black text-white tracking-tighter uppercase">Sells</span>
            </div>
            <p className="text-neutral-500 text-lg max-w-sm leading-relaxed font-medium">
              The world's most exclusive directory for high-margin reselling. Verified suppliers, instant digital delivery.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Platform</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-neutral-500 hover:text-white transition-colors text-sm font-medium">Directory</Link></li>
              <li><Link to="/contact" className="text-neutral-500 hover:text-white transition-colors text-sm font-medium">Support</Link></li>
              <li><a href="#" className="text-neutral-500 hover:text-white transition-colors text-sm font-medium">Instagram</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><Link to="/terms" className="text-neutral-500 hover:text-white transition-colors text-sm font-medium">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-neutral-500 hover:text-white transition-colors text-sm font-medium">Privacy Policy</Link></li>
              <li><Link to="/refunds" className="text-neutral-500 hover:text-white transition-colors text-sm font-medium">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 text-xs font-medium">© {new Date().getFullYear()} PK Sells. All rights reserved.</p>
          <p className="text-neutral-600 text-[10px] uppercase tracking-widest font-bold">Elite Reselling Infrastructure</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
