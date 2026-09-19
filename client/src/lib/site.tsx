export const business = {
  name: "Salon Oval",
  shortName: "OVAL",
  tagline: "Beauty in motion.",
  address: ["On the DFCC Bank,", "63/1/A,", "Bandaragama 12530,", "Sri Lanka"],
  phone: "+94 78 887 6876",
  mapUrl: "https://maps.app.goo.gl/EkYCj356EcDmAxg77",
} as const;

export const images = {
  hero: "/manus-storage/salon-oval-hero_030e5751.jpg",
  interior: "/manus-storage/salon-oval-interior_5f9475a4.jpg",
  women: "/manus-storage/salon-oval-women_74e3b6b1.jpg",
  men: "/manus-storage/salon-oval-men_fb911972.jpg",
} as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Collection", href: "/collection" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const serviceItems = [
  { number: "01", label: "Haircut", title: "The cut", description: "Precision, proportion, and a finish that feels like you.", image: images.women },
  { number: "02", label: "Styling", title: "The shape", description: "A considered silhouette for the day, the night, or the in-between.", image: images.hero },
  { number: "03", label: "Hair color", title: "The tone", description: "Dimension and movement, composed around your natural rhythm.", image: images.women },
  { number: "04", label: "Hair treatments", title: "The ritual", description: "Care-led moments designed to bring softness and shine back into focus.", image: images.interior },
  { number: "05", label: "Bridal", title: "The moment", description: "An elevated look for a day that deserves its own frame.", image: images.hero },
  { number: "06", label: "Men's grooming", title: "The detail", description: "Modern, clean, and quietly confident. Service list subject to confirmation.", image: images.men },
] as const;

export const collectionItems = [
  { number: "01", name: "Classic", description: "Quiet structure. Endless polish.", image: images.women },
  { number: "02", name: "Modern", description: "A new line with an easy attitude.", image: images.men },
  { number: "03", name: "Signature", description: "The look people remember.", image: images.hero },
  { number: "04", name: "Bold", description: "More shape. More presence.", image: images.women },
  { number: "05", name: "Elegant", description: "Soft light, considered movement.", image: images.interior },
  { number: "06", name: "Textured", description: "A little undone. Entirely intentional.", image: images.men },
] as const;

export const galleryItems = [
  { id: "01", label: "Studio portrait", image: images.hero, aspect: "portrait" },
  { id: "02", label: "The styling floor", image: images.interior, aspect: "wide" },
  { id: "03", label: "Modern texture", image: images.men, aspect: "portrait" },
  { id: "04", label: "Color study", image: images.women, aspect: "portrait" },
  { id: "05", label: "The oval light", image: images.interior, aspect: "square" },
  { id: "06", label: "Editorial shape", image: images.hero, aspect: "wide" },
  { id: "07", label: "For him", image: images.men, aspect: "portrait" },
  { id: "08", label: "For her", image: images.women, aspect: "portrait" },
] as const;

export const pageMeta: Record<string, { title: string; description: string }> = {
  "/": { title: "Salon OVAL Bandaragama | Modern Hair & Beauty Salon", description: "Salon OVAL in Bandaragama, Sri Lanka — a modern salon experience focused on style, beauty and personal expression." },
  "/services": { title: "Services — Salon OVAL", description: "Explore the editable service menu for Salon OVAL in Bandaragama." },
  "/collection": { title: "The Oval Collection — Salon OVAL", description: "A fashion-led collection of hair style directions from Salon OVAL." },
  "/gallery": { title: "Gallery — Salon OVAL", description: "See the visual world of Salon OVAL through an editorial gallery." },
  "/about": { title: "About — Salon OVAL", description: "The idea behind Salon OVAL, a modern salon in Bandaragama focused on personal style." },
  "/appointment": { title: "Appointment — Salon OVAL", description: "Request an appointment enquiry with Salon OVAL in Bandaragama." },
  "/contact": { title: "Contact — Salon OVAL", description: "Find Salon OVAL at On the DFCC Bank, 63/1/A, Bandaragama 12530, Sri Lanka." },
};

export function addressLines() {
  return business.address.map((line) => <span key={line}>{line}</span>);
}
