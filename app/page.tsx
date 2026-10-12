// Section order: hero, statement, system, journey, faq, contact, footer.
// The system grid shows what happens to a demo request at a glance; the hero
// button scrolls past it to the journey (#how), which follows one request
// from the form to the call.
// Work, Process and the calculator are hidden: SelectedWork.tsx, Process.tsx
// and AutomateFirst.tsx still exist (the calculator still runs /hours), just
// not rendered here.
import Header from "./components/Header";
import Hero from "./components/Hero";
import Statement from "./components/Statement";
import SystemGrid from "./components/SystemGrid";
import Journey from "./components/Journey";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <SystemGrid />
        <Journey />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
