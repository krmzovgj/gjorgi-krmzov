// Section order: hero, statement, calculator, faq, contact, footer. The hero
// button scrolls to the calculator (#what-first), which sits right after the
// statement that sets up the question it asks. Work and Process are hidden:
// SelectedWork.tsx and Process.tsx still exist, just not rendered here.
import Header from "./components/Header";
import Hero from "./components/Hero";
import Statement from "./components/Statement";
import AutomateFirst from "./components/AutomateFirst";
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
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
