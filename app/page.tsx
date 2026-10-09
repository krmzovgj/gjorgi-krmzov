// Section order: hero, statement, journey, faq, contact, footer. The hero
// button scrolls to the journey (#how), which follows one demo request from
// the form to the call right after the statement promises exactly that.
// Work, Process and the calculator are hidden: SelectedWork.tsx, Process.tsx
// and AutomateFirst.tsx still exist (the calculator still runs /hours), just
// not rendered here.
import Header from "./components/Header";
import Hero from "./components/Hero";
import Statement from "./components/Statement";
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
        <Journey />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
