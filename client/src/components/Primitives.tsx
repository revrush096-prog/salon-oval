import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return <div className="section-label"><span>{index}</span><span>{children}</span><span className="section-label-line" /></div>;
}

export function PageHero({ eyebrow, title, intro, image, align = "left" }: { eyebrow: string; title: React.ReactNode; intro?: string; image?: string; align?: "left" | "right" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".page-hero-title > *", { y: 54, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power4.out" });
      gsap.fromTo(".page-hero-copy", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
      if (image) gsap.fromTo(".page-hero-image", { scale: 1.12, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, [image]);

  return (
    <section ref={ref} className={`page-hero ${align === "right" ? "align-right" : ""}`}>
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="page-hero-title">{title}</h1>
          {intro && <p className="page-hero-intro">{intro}</p>}
        </div>
        {image && <div className="page-hero-image oval-frame"><SafeImage src={image} alt="Salon Oval editorial placeholder" loading="eager" /></div>}
      </div>
    </section>
  );
}

export function OrbitalMark({ size = "large", label = "OVAL" }: { size?: "small" | "large"; label?: string }) {
  return <div className={`orbital-mark orbital-${size}`} aria-hidden="true"><span className="orbit orbit-a" /><span className="orbit orbit-b" /><span className="orbit orbit-c" /><span className="orbital-letter">{label}</span></div>;
}

export function MagneticLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <Link href={href} className={`magnetic-link ${className}`} data-cursor="View"><span>{children}</span><ArrowUpRight size={16} /></Link>;
}

export function OvalButton({ href, children, inverted = false }: { href: string; children: React.ReactNode; inverted?: boolean }) {
  return <Link href={href} className={`oval-button ${inverted ? "inverted" : ""}`} data-cursor="Explore"><span>{children}</span><ArrowUpRight size={15} /></Link>;
}

export function ScrollHint({ label = "Scroll to explore" }: { label?: string }) {
  return <div className="scroll-hint"><span>{label}</span><ArrowDown size={14} /></div>;
}

export function SafeImage({ src, alt, className = "", loading = "lazy", ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={src} alt={alt} className={className} loading={loading} {...props} onError={(event) => { event.currentTarget.style.display = "none"; }} />;
}

export function ImageCaption({ number, title, detail }: { number: string; title: string; detail: string }) {
  return <div className="image-caption"><span>{number}</span><div><strong>{title}</strong><small>{detail}</small></div><Plus size={17} /></div>;
}

export function ParallaxMedia({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to("img", { yPercent: -10, ease: "none", scrollTrigger: { trigger: ref.current, scrub: true, start: "top bottom", end: "bottom top" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <div ref={ref} className={`parallax-media ${className}`}><SafeImage src={src} alt={alt} /></div>;
}

export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 82%", once: true } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

export function AmbientOrb({ className = "" }: { className?: string }) { return <div className={`ambient-orb ${className}`} aria-hidden="true" />; }
