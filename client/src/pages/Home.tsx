import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Play, Plus } from "lucide-react";
import { Link } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AmbientOrb, ImageCaption, MagneticLink, OrbitalMark, OvalButton, ParallaxMedia, Reveal, SafeImage, ScrollHint, SectionLabel } from "@/components/Primitives";
import { business, collectionItems, images, serviceItems } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return <div className="home-page"><HeroScene /><IntroScene /><CinemaScene /><ServicesScene /><TransformationScene /><CollectionScene /><StyleSplit /><InteriorScene /><LocationScene /></div>;
}

function HeroScene() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(ref);
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro.fromTo(q(".hero-kicker"), { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 1 })
        .fromTo(q(".hero-title-line"), { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.09 }, "-=0.35")
        .fromTo(q(".hero-oval-wrap"), { scale: 0.84, opacity: 0, rotate: -8 }, { scale: 1, opacity: 1, rotate: 0, duration: 1.35 }, "-=0.75")
        .fromTo(q(".hero-side-note, .hero-cta-row, .scroll-hint"), { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.1 }, "-=0.4");
      gsap.to(q(".hero-portrait"), { yPercent: -8, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q(".hero-oval-wrap"), { rotate: 12, scale: 1.23, yPercent: 17, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q(".hero-title"), { yPercent: -32, opacity: 0.2, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q(".hero-orbital-copy"), { xPercent: -100, rotate: -20, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty("--mouse-x", `${x * 10}px`);
      document.documentElement.style.setProperty("--mouse-y", `${y * 10}px`);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section ref={ref} className="hero-scene scene-dark">
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-orbiting-dot dot-a" aria-hidden="true" />
      <div className="hero-orbiting-dot dot-b" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker"><span className="micro-dot" /> Salon Oval / Bandaragama · Sri Lanka</p>
          <h1 className="hero-title"><span className="hero-title-line">Beauty</span><span className="hero-title-line serif">in motion.</span></h1>
          <p className="hero-side-note">A modern salon experience designed around style, beauty, and individuality.</p>
          <div className="hero-cta-row"><OvalButton href="/services">Enter the oval</OvalButton><Link href="/services" className="text-link">Explore services <ArrowUpRight size={15} /></Link></div>
        </div>
        <div className="hero-stage" aria-label="Editorial placeholder image of a salon look">
          <div className="hero-oval-wrap"><div className="hero-oval-ring ring-one" /><div className="hero-oval-ring ring-two" /><div className="hero-portrait"><SafeImage src={images.hero} alt="Editorial placeholder portrait for Salon Oval" loading="eager" /></div><div className="hero-glint glint-one" /><div className="hero-glint glint-two" /></div>
          <div className="hero-orbital-copy">OVAL / STYLE / MOTION / OVAL / STYLE / MOTION /</div>
        </div>
        <div className="hero-meta"><span>01</span><span>02 — 14</span><span className="hero-meta-line" /></div>
        <ScrollHint />
      </div>
    </section>
  );
}

function IntroScene() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".intro-orbit", { rotate: 360, duration: 34, repeat: -1, ease: "none" });
      gsap.fromTo(".intro-title", { rotateX: 70, y: 80, opacity: 0 }, { rotateX: 0, y: 0, opacity: 1, duration: 1.1, ease: "power4.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <section ref={ref} className="intro-scene section-cream"><div className="container intro-inner"><SectionLabel index="02">Enter the oval</SectionLabel><div className="intro-copy"><h2 className="intro-title">Enter<br /><em>the oval.</em></h2><p>Come for the ritual of a new look. Stay for the feeling that follows.</p><MagneticLink href="/about">The idea behind Oval</MagneticLink></div><div className="intro-orbit"><span /><span /><span /></div><div className="intro-foot"><span>Personal style / 01</span><span>Bandaragama / 12530</span><span>Scroll to move through space <ArrowDown size={14} /></span></div></div></section>;
}

function CinemaScene() {
  const [playing, setPlaying] = useState(false);
  return <section className="cinema-scene scene-dark"><div className="cinema-media"><SafeImage src={images.interior} alt="Editorial placeholder for a luxury salon interior" /><div className="cinema-shade" /></div><div className="container cinema-content"><SectionLabel index="03">Cinematic salon video</SectionLabel><h2>Where style<br /><em>comes alive.</em></h2><div className="cinema-bottom"><p>Use this space for your salon film — a living portrait of tools, texture, and transformation.</p><button type="button" className="play-button" onClick={() => setPlaying(true)} aria-label="Play salon film"><Play size={17} fill="currentColor" /><span>Play the film</span></button></div></div>{playing && <div className="video-modal" role="dialog" aria-modal="true" aria-label="Salon film"><button type="button" className="modal-close" onClick={() => setPlaying(false)}>Close <Plus size={17} /></button><div className="video-placeholder"><SafeImage src={images.interior} alt="Editorial placeholder salon film still" /><div><p className="eyebrow">Salon Oval film / placeholder</p><h3>A visual space for the real Salon Oval film.</h3><p>Replace this fallback with /assets/videos/salon.mp4 when the final video is available.</p></div></div></div>}</section>;
}

function ServicesScene() {
  return <section className="services-scene section-cream"><div className="container"><SectionLabel index="04">The Oval services</SectionLabel><div className="services-heading"><h2>Find your<br /><em>next shape.</em></h2><p>Editable service directions for the Salon Oval team to refine with confirmed details.</p></div><div className="orbit-services">{serviceItems.slice(0, 5).map((service, index) => <Link href="/services" className={`orbit-card orbit-card-${index + 1}`} key={service.number}><span className="orbit-card-number">{service.number}</span><div className="orbit-card-image"><SafeImage src={service.image} alt={`${service.label} editorial placeholder`} /></div><strong>{service.label}</strong><ArrowUpRight size={16} /></Link>)}<div className="orbit-core"><OrbitalMark size="small" label="O" /><span>Explore<br />the orbit</span></div></div><div className="section-after"><span>Hover to change the atmosphere</span><MagneticLink href="/services">View all services</MagneticLink></div></div></section>;
}

function TransformationScene() {
  const [position, setPosition] = useState(52);
  return <section className="transformation-scene scene-dark"><div className="container"><SectionLabel index="05">Editorial study / placeholder</SectionLabel><div className="transformation-grid"><div className="transformation-copy"><p className="eyebrow">One look.</p><h2>A whole new<br /><em>feeling.</em></h2><p className="body-copy">A before / after canvas for confirmed Salon Oval work. The imagery below is an editorial placeholder, not a client transformation.</p><OvalButton href="/appointment" inverted>Start your enquiry</OvalButton></div><div className="compare-wrap" style={{ "--split": `${position}%` } as React.CSSProperties}><div className="compare-image compare-after"><SafeImage src={images.women} alt="Editorial after placeholder" /></div><div className="compare-image compare-before"><SafeImage src={images.men} alt="Editorial before placeholder" /></div><div className="compare-label before">Before</div><div className="compare-label after">After</div><input aria-label="Before and after image comparison" type="range" min="5" max="95" value={position} onChange={(event) => setPosition(Number(event.target.value))} /><div className="compare-handle" aria-hidden="true"><span>↔</span></div></div></div></div></section>;
}

function CollectionScene() {
  return <section className="collection-scene section-cream"><div className="container"><SectionLabel index="06">The Oval collection</SectionLabel><div className="collection-heading"><h2>A style<br /><em>in orbit.</em></h2><p>A fashion-led edit of directions to use as a starting point for your next appointment.</p></div><div className="collection-grid">{collectionItems.slice(0, 4).map((item, index) => <Link href="/collection" className={`collection-card card-${index + 1}`} key={item.number}><div className="collection-card-image"><SafeImage src={item.image} alt={`${item.name} editorial placeholder`} /></div><div className="collection-card-caption"><span>{item.number}</span><div><strong>{item.name}</strong><small>{item.description}</small></div><ArrowUpRight size={16} /></div></Link>)}</div><div className="section-after"><span>Classic / Modern / Signature / Bold</span><MagneticLink href="/collection">Open the collection</MagneticLink></div></div></section>;
}

function StyleSplit() {
  return <section className="style-split scene-dark"><div className="style-half style-men"><SafeImage src={images.men} alt="Editorial placeholder men's hairstyle" /><div className="style-overlay" /><div className="style-content"><span className="style-index">07 / For him</span><h2>For<br /><em>him.</em></h2><Link href="/collection">Explore men's styles <ArrowUpRight size={15} /></Link></div></div><div className="style-half style-women"><SafeImage src={images.women} alt="Editorial placeholder women's hairstyle" /><div className="style-overlay" /><div className="style-content"><span className="style-index">08 / For her</span><h2>For<br /><em>her.</em></h2><Link href="/collection">Explore women's styles <ArrowUpRight size={15} /></Link></div></div></section>;
}

function InteriorScene() {
  return <section className="interior-scene section-cream"><div className="container"><SectionLabel index="09">Salon experience</SectionLabel><div className="interior-heading"><h2>Step<br /><em>inside.</em></h2><p>From the first reflection to the final detail, the space is part of the look.</p></div><div className="interior-frame"><ParallaxMedia src={images.interior} alt="Editorial placeholder for Salon Oval interior" /><div className="interior-overlay"><span>Entrance / styling floor / light</span><span>Replace with real salon imagery</span></div></div></div></section>;
}

function LocationScene() {
  return <section className="location-scene scene-dark"><div className="location-orbit" aria-hidden="true"><span /></div><div className="container location-inner"><SectionLabel index="10">Find Salon Oval</SectionLabel><div className="location-grid"><div><p className="eyebrow">Your next look starts here.</p><h2>Meet us<br /><em>in Bandaragama.</em></h2></div><div className="location-card"><span className="footer-label">The address</span><address>{business.address.map((line) => <span key={line}>{line}</span>)}</address><div className="location-actions"><a href={`tel:${business.phone.replaceAll(" ", "")}`}>Call now <ArrowUpRight size={15} /></a><a href={business.mapUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={15} /></a></div></div></div><div className="location-final"><Link href="/appointment" className="final-cta">Request an appointment <ArrowUpRight size={21} /></Link><span>Enquiries are reviewed directly by the salon.</span></div></div></section>;
}
