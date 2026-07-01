import "../styles/main.css";

import Navbar from "../components/Navbar";
import CounterSection from "../components/CounterSection";
import SuccessCases from "../components/SuccessCases";
import TrustedBy from "../components/TrustedBy";
import Service from "../components/Service";
import AboutUs from "../components/AboutUs";
import News from "../components/News";
import Globe from "../components/Globe";
import Leaders from "../components/Leaders";
import Map from "../components/Map";
import Contact from "../components/Contact";

export default function MainPage() {
  return (
    <div className="main_wrapper">
      <Navbar />

      <section className="video_section" id="Main">
        <video autoPlay muted loop playsInline>
          <source src="/TRAILER BETR MEDIA 10.mp4" type="video/mp4" />
          Tu navegador no soporta este video.
        </video>
      </section>

      <CounterSection />

      <section id="SuccessCases">
        <SuccessCases />
      </section>

      <TrustedBy />

      <section id="Service">
        <Service />
      </section>

      <section id="AboutUs">
        <AboutUs />
      </section>

      <section id="News">
        <News />
      </section>

      <section id="Globe">
        <Globe />
      </section>

      <section id="Leaders">
        <Leaders />
      </section>

      <Map />

      <section id="Contact">
        <Contact />
      </section>
    </div>
  );
}