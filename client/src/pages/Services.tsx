import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { business, serviceItems } from "@/lib/site";
import { AmbientOrb, ImageCaption, MagneticLink, PageHero, Reveal, SafeImage, SectionLabel } from "@/components/Primitives";

export default function Services() {
  return <div className="page services-page"><PageHero eyebrow="Salon Oval / 02" title={<><span>Your style.</span><em>Your signature.</em></>} intro="A considered menu of shape, tone, movement, and care. Service availability and details can be edited by the salon team." /><ServiceGrid /><ServiceNote /></div>;
}

function ServiceGrid() {
  return <section className="service-list section-cream"><div className="container"><SectionLabel index="01">The service edit</SectionLabel><div className="service-list-grid">{serviceItems.map((service) => <TiltCard key={service.number} service={service} />)}</div></div></section>;
}

function TiltCard({ service }: { service: (typeof serviceItems)[number] }) {
  const ref = useRef<HTMLElement>(null);
  return <article ref={ref} className="service-detail-card" onMouseMove={(event) => { const card = ref.current; const rect = card?.getBoundingClientRect(); if (!card || !rect) return; const x = (event.clientX - rect.left) / rect.width - 0.5; const y = (event.clientY - rect.top) / rect.height - 0.5; card.style.setProperty("--tilt-x", `${y * -6}deg`); card.style.setProperty("--tilt-y", `${x * 8}deg`); }} onMouseLeave={() => { if (ref.current) { ref.current.style.setProperty("--tilt-x", "0deg"); ref.current.style.setProperty("--tilt-y", "0deg"); } }} data-cursor="Explore">
    <div className="service-detail-visual"><SafeImage src={service.image} alt={`${service.label} editorial placeholder`} /><div className="service-detail-shade" /><span>{service.number}</span><ArrowUpRight size={19} /></div>
    <div className="service-detail-copy"><div><p className="eyebrow">{service.label}</p><h3>{service.title}</h3></div><p>{service.description}</p></div>
  </article>;
}

function ServiceNote() {
  return <section className="service-note scene-dark"><AmbientOrb /><div className="container service-note-inner"><div><p className="eyebrow">A living menu</p><h2>Good looks<br /><em>move.</em></h2></div><div><p className="body-copy">Salon Oval can use this space for confirmed service descriptions, timing, and pricing when ready. No rates or availability are assumed here.</p><MagneticLink href="/appointment">Ask about a service</MagneticLink></div></div><div className="container service-note-foot"><span>Editable content / no invented claims</span><span>{business.phone}</span></div></section>;
}
