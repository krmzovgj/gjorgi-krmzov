// Section order: hero, statement, calculator, process, contact, footer. The
// calculator sits right after the statement, which ends on "you see the math",
// so the section delivers on that promise immediately. (Work section hidden -
// SelectedWork.tsx still exists, just not rendered here.)
import Header from "./components/Header";
import Hero from "./components/Hero";
import Statement from "./components/Statement";
import HoursCalculator from "./components/HoursCalculator";
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
        <HoursCalculator />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
