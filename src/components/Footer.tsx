import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black py-32 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-black rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                <img src="vault-logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-black text-white tracking-tighter uppercase">Vendor</span>
                <span className="text-xl font-black text-white/40 tracking-tighter uppercase leading-[0.5]">Vault</span>
              </div>
            </div>
            <p className="text-neutral-500 text-sm max-w-sm leading-relaxed font-bold uppercase tracking-tight">
              The world's most exclusive directory for high-margin reselling. Verified suppliers, instant digital delivery.
            </p>
          </div>

          <div>
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">Platform</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-neutral-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Directory</Link></li>
              <li><Link to="/contact" className="text-neutral-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Support</Link></li>
              <li><a href="#" className="text-neutral-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Instagram</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">Legal</h3>
            <ul className="space-y-4">
              <li><Link to="/terms" className="text-neutral-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-neutral-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Privacy Policy</Link></li>
              <li><Link to="/refunds" className="text-neutral-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-neutral-600 text-[10px] font-black uppercase tracking-[0.2em]">© {new Date().getFullYear()} VendorVault. All rights reserved.</p>
          <p className="text-neutral-600 text-[10px] uppercase tracking-[0.2em] font-black">Elite Reselling Infrastructure</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
