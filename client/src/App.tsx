import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteChrome } from "./components/SiteChrome";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Collection from "./pages/Collection";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Appointment from "./pages/Appointment";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { business } from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["HairSalon", "LocalBusiness"],
  name: business.name,
  telephone: business.phone,
  address: { "@type": "PostalAddress", streetAddress: "On the DFCC Bank, 63/1/A", addressLocality: "Bandaragama", postalCode: "12530", addressCountry: "LK" },
  sameAs: [business.mapUrl],
  url: business.mapUrl,
};

function Router() {
  return <Switch><Route path="/" component={Home} /><Route path="/services" component={Services} /><Route path="/collection" component={Collection} /><Route path="/gallery" component={Gallery} /><Route path="/about" component={About} /><Route path="/appointment" component={Appointment} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="dark"><TooltipProvider><Toaster /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><SiteChrome><Router /></SiteChrome></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
