import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { business, navItems, pageMeta } from "@/lib/site";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 950);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    const meta = pageMeta[location] ?? pageMeta["/"];
    document.title = meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", meta.description);
  }, [location]);

  return (
    <div className="site-root">
      {loading && <LoadingScreen />}
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <main>{children}</main>
      <Footer />
      <Link href="/appointment" className="mobile-book-bar">Book appointment <ArrowUpRight size={15} /></Link>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="loading-screen" aria-label="Loading Salon Oval">
      <div className="loading-orbit" aria-hidden="true"><span /></div>
      <p>Salon Oval</p>
      <span className="loading-note">Beauty in motion</span>
    </div>
  );
}

function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const cursor = document.querySelector<HTMLElement>(".oval-cursor");
    if (!cursor) return;
    const move = (event: MouseEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };
    const down = () => cursor.classList.add("is-down");
    const up = () => cursor.classList.remove("is-down");
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, [data-cursor]")) cursor.classList.add("is-hovering");
    };
    const out = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("a, button, [data-cursor]")) cursor.classList.remove("is-hovering");
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);

  return <span className="oval-cursor" aria-hidden="true"><span>View</span></span>;
}

function ScrollProgress() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>(".scroll-progress");
    if (!bar) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" aria-hidden="true" />;
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className={`site-nav ${open ? "is-open" : ""}`}>
      <div className="nav-inner">
        <Link href="/" className="wordmark" onClick={() => setOpen(false)} aria-label="Salon Oval home">
          <span className="wordmark-mark" aria-hidden="true" />
          <span>OVAL</span>
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => <Link key={item.href} href={item.href} className={location === item.href ? "active" : ""}>{item.label}</Link>)}
        </nav>
        <div className="nav-actions">
          <Link href="/appointment" className="nav-book">Book now <ArrowUpRight size={15} /></Link>
          <button type="button" className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <div className="nav-orbit-line" aria-hidden="true" />
      <div className="menu-overlay" aria-hidden={!open}>
        <div className="menu-overlay-inner">
          <div className="menu-kicker">Navigation / 2026</div>
          <div className="menu-center-orbit"><span>O</span></div>
          <div className="menu-links">
            {navItems.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><small>0{index + 1}</small>{item.label}<ArrowUpRight size={17} /></Link>)}
          </div>
          <div className="menu-footer"><span>Bandaragama, Sri Lanka</span><a href={`tel:${business.phone.replaceAll(" ", "")}`}><Phone size={14} /> {business.phone}</a></div>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-orbit" aria-hidden="true" />
      <div className="container footer-top">
        <div>
          <p className="eyebrow">Salon Oval / Bandaragama</p>
          <h2>Beauty<br /><em>in motion.</em></h2>
        </div>
        <Link href="/appointment" className="circle-cta" data-cursor="Book"><span>Book<br />appointment</span><ArrowUpRight size={19} /></Link>
      </div>
      <div className="container footer-grid">
        <div className="footer-col"><span className="footer-label">Visit</span><address>{business.address.map((line) => <span key={line}>{line}</span>)}</address></div>
        <div className="footer-col"><span className="footer-label">Speak</span><a href={`tel:${business.phone.replaceAll(" ", "")}`}>{business.phone}</a><a href={business.mapUrl} target="_blank" rel="noreferrer">Google Business Profile <ArrowUpRight size={13} /></a></div>
        <div className="footer-col"><span className="footer-label">Explore</span><Link href="/services">Services</Link><Link href="/collection">Collection</Link><Link href="/gallery">Gallery</Link></div>
        <div className="footer-col"><span className="footer-label">Follow the orbit</span><p className="footer-copy">A visual home for your next look. Service details and availability are confirmed directly by the salon.</p></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Salon Oval</span><span>Made for personal style.</span><span>Scroll to begin ↗</span></div>
    </footer>
  );
}
