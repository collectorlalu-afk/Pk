const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-sm">PK</span>
              </div>
              <span className="text-xl font-black text-white tracking-tighter uppercase">Sells</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs text-center md:text-left">
              Premium vendor-link directory for serious resellers. Verified suppliers, instant access.
            </p>
          </div>

          <div className="flex gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-900 text-center text-xs text-neutral-600">
          <p>© {new Date().getFullYear()} PK Sells. All rights reserved. Not affiliated with Instagram, Facebook, or Meta.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
