// Section order: hero, statement, what-to-automate-first, process, faq,
// contact, footer. The triage sits right after the statement, which ends on "you see
// the math", so the section delivers on that promise immediately. (Work section hidden -
// SelectedWork.tsx still exists, just not rendered here.)
import Header from "./components/Header";
import Hero from "./components/Hero";
import Statement from "./components/Statement";
import AutomateFirst from "./components/AutomateFirst";
import Process from "./components/Process";
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
        <AutomateFirst />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
