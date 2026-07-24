// Section order: hero, statement, process, contact, footer. (Work section
// hidden - SelectedWork.tsx still exists, just not rendered here.)
import Header from "./components/Header";
import Hero from "./components/Hero";
import Statement from "./components/Statement";
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
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
