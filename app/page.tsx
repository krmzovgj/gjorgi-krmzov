import Header from "./components/Header";
import Hero from "./components/Hero";
import Statement from "./components/Statement";
import SelectedWork from "./components/SelectedWork";
import Process from "./components/Process";
import Background from "./components/Background";
import Principles from "./components/Principles";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <SelectedWork />
        <Process />
        <Background />
        <Principles />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
