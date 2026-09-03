// src/components/home/BrandPhilosophy.jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function BrandPhilosophy({ navigate }) {
  return (
    <section className="brand-philosophy-section">
      <div className="invi-container">
        <div className="philosophy-inner-wrapper">
          <div className="philosophy-eyebrow-center">
            <span>INDIAN VERSATILE INDIVIDUAL</span>
          </div>

          <h2 className="philosophy-giant-quote">
            “CLOTHING IS NOT JUST FABRIC.<br className="desktop-break" />
            IT IS AN EXTENSION OF WHO YOU ARE.”
          </h2>

          <p className="philosophy-lead-body">
            INVI was founded on the conviction that everyday luxury should never demand rigid formality.
            We construct garments for the adaptive, ambitious Indian individual—blending oversized architectural
            streetwear drape with time-honored natural textiles. Whether through our heavyweight 240 GSM French Terry
            or breathable 60/40 French linen blends, each piece is engineered for effortless daily rotation.
          </p>

          <div className="philosophy-mantra-box">
            <span className="mantra-line">BE VERSATILE. BE MORE. BE INVI.</span>
          </div>

          <div className="philosophy-pillars-row">
            <div className="philosophy-pillar-card">
              <span className="pillar-index">I</span>
              <h4 className="pillar-heading">ARCHITECTURAL DRAPE</h4>
              <p className="pillar-text">Cut with deliberate shoulder drops and structured collars to maintain silhouette integrity.</p>
            </div>

            <div className="philosophy-pillar-card">
              <span className="pillar-index">II</span>
              <h4 className="pillar-heading">PREMIUM SUBSTANCE</h4>
              <p className="pillar-text">Combed high-twist loopback cotton and breathable linen blends engineered for the Indian climate.</p>
            </div>

            <div className="philosophy-pillar-card">
              <span className="pillar-index">III</span>
              <h4 className="pillar-heading">ALWAYS BE MORE</h4>
              <p className="pillar-text">Every release is created in strictly limited numbers to protect authenticity and personal style.</p>
            </div>
          </div>

          <div className="philosophy-cta-wrapper">
            <button
              type="button"
              className="btn-primary philosophy-btn"
              onClick={() => navigate('about')}
            >
              <span>DISCOVER THE INVI UNIVERSE</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
