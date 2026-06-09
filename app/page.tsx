// Section order: hero, statement, audit, work, process, contact, footer.
import Header from "./components/Header";
import Hero from "./components/Hero";
import Statement from "./components/Statement";
import AuditStrip from "./components/AuditStrip";
import SelectedWork from "./components/SelectedWork";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <AuditStrip />
        <SelectedWork />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
