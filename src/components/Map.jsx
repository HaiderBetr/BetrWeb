import "../styles/map.css";

export default function Map() {
  return (
    <section className="map-section">
      <h2 className="map-title">NUESTRAS SEDES</h2>
      <div className="map-container">
        <div className="map-item">
          <h3 className="title-map">FLORIDABLANCA - COLOMBIA</h3>
          <div className="map-frame">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7919.112131028298!2d-73.1300677!3d7.0613315!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e683f47de945d43%3A0x703efa09d6196cc8!2sBetr%20Media!5e0!3m2!1ses!2sco!4v1756390230390!5m2!1ses!2sco"
              title="Sede Colombia"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="map-item">
          <h3 className="title-map">CRISTAL DR. - FLORIDA EE.UU.</h3>
          <div className="map-frame">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d892.1504082173915!2d-81.8615154064955!3d26.565062736891996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88db6bd30d9e13dd%3A0x6fa488977af09b6d!2sBetrmedia!5e0!3m2!1ses!2sco!4v1756389037346!5m2!1ses!2sco"
              title="Sede USA"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
