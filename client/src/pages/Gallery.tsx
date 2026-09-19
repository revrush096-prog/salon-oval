import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { galleryItems } from "@/lib/site";
import { PageHero, SafeImage, SectionLabel } from "@/components/Primitives";

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const close = () => setActive(null);
  const next = () => setActive((value) => value === null ? 0 : (value + 1) % galleryItems.length);
  const previous = () => setActive((value) => value === null ? galleryItems.length - 1 : (value - 1 + galleryItems.length) % galleryItems.length);
  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(); if (event.key === "ArrowRight") next(); if (event.key === "ArrowLeft") previous(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [active]);

  return <div className="page gallery-page"><PageHero eyebrow="Salon Oval / 04" title={<><span>See the</span><em>difference.</em></>} intro="A visual archive for looks, space, and motion. All imagery is currently editorial placeholder content pending Salon Oval’s own campaign set." /><section className="gallery-board section-cream"><div className="container"><div className="gallery-board-top"><SectionLabel index="01">Visual archive / placeholder</SectionLabel><span>Click an image to open / {String(galleryItems.length).padStart(2, "0")} frames</span></div><div className="gallery-masonry">{galleryItems.map((item, index) => <button type="button" className={`gallery-tile ${item.aspect}`} key={item.id} onClick={() => setActive(index)} data-cursor="Open"><SafeImage src={item.image} alt={`${item.label} editorial placeholder`} /><div className="gallery-tile-overlay"><span>{item.id} / {item.label}</span><ArrowUpRight size={17} /></div></button>)}</div></div></section>{active !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery lightbox"><button className="lightbox-close" type="button" onClick={close} aria-label="Close gallery"><X size={21} /> Close</button><button className="lightbox-nav prev" type="button" onClick={previous} aria-label="Previous image"><ArrowLeft /></button><div className="lightbox-image"><SafeImage src={galleryItems[active].image} alt={galleryItems[active].label} /></div><button className="lightbox-nav next" type="button" onClick={next} aria-label="Next image"><ArrowRight /></button><div className="lightbox-meta"><span>{galleryItems[active].label}</span><span>{String(active + 1).padStart(2, "0")} / {String(galleryItems.length).padStart(2, "0")}</span></div></div>}</div>;
}
