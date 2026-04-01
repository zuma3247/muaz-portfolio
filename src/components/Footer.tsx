import { Github, Linkedin, Mail } from "lucide-react";
import logoImage from "figma:asset/b0989652989926fe92b786073197f74a529bda75.png";

interface FooterProps {
  onNavigate: (section: "hub" | "about" | "work-experience" | "contact" | "leadership" | "design" | "technology" | "websterleads") => void;
  activeSection?: string;
}

export function Footer({ onNavigate, activeSection }: FooterProps) {
  const getNavClass = (section: string) => {
    return `transition-colors ${activeSection === section ? 'text-burnt-orange' : 'hover:text-burnt-orange'}`;
  };

  return (
    <footer className="w-full bg-[#0a0e1a] border-t border-white/10 py-8 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <button 
            onClick={() => onNavigate("hub")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-md overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center p-1 group-hover:border-burnt-orange/50 transition-colors">
              <img src={logoImage} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-white font-semibold tracking-wide text-sm group-hover:text-burnt-orange transition-colors">
              MUAZ
            </span>
          </button>
          <p className="text-white/40 text-xs">
            © 2025 Muaz Mohammed
          </p>
        </div>

        {/* Center: Quick Links */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/60">
          <button onClick={() => onNavigate("about")} className={getNavClass("about")}>About</button>
          <button onClick={() => onNavigate("work-experience")} className={getNavClass("work-experience")}>Work</button>
          <button onClick={() => onNavigate("contact")} className={getNavClass("contact")}>Contact</button>
          <button onClick={() => onNavigate("leadership")} className={getNavClass("leadership")}>Leadership</button>
          <button onClick={() => onNavigate("design")} className={getNavClass("design")}>Design</button>
          <button onClick={() => onNavigate("technology")} className={getNavClass("technology")}>Technology</button>
          <button onClick={() => onNavigate("websterleads")} className={getNavClass("websterleads")}>WebsterLEADS</button>
        </nav>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/zuma3247"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-burnt-orange/20 hover:text-burnt-orange transition-colors border border-white/10 hover:border-burnt-orange/50"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/muazuddin-mohammed"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-burnt-orange/20 hover:text-burnt-orange transition-colors border border-white/10 hover:border-burnt-orange/50"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:muazuddin12@gmail.com"
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-burnt-orange/20 hover:text-burnt-orange transition-colors border border-white/10 hover:border-burnt-orange/50"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
