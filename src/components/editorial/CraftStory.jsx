// src/components/editorial/CraftStory.jsx
import React from 'react';

export default function CraftStory({ navigate }) {
  return (
    <section
      id="craft-story-section"
      className="scroll-reveal craft-story-section"
    >
      <div className="invi-container">
        {/* Section Header */}
        <div className="craft-header-box">
          <span className="craft-label-badge">
            ENGINEERED COMFORT • BANGALORE ATELIER
          </span>
          <h2 className="craft-main-title">THE FABRIC ARCHITECTURE</h2>
          <p className="craft-sub-title">
            Two signature textile foundations designed for effortless daily rotation.
          </p>
        </div>

        {/* 2-Column Split Editorial Showcase (Clean 1-column on mobile, 2-column on desktop) */}
        <div className="craft-cards-grid">
          {/* Pillar 1: 240 GSM French Terry */}
          <div className="craft-card">
            <div className="craft-card-media">
              <img
                src="https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID04889_2.jpg?v=1786608762"
                alt="240 GSM French Terry Cotton"
                loading="lazy"
              />
              <span className="craft-card-badge">
                HEAVYWEIGHT COTTON
              </span>
            </div>

            <div className="craft-card-content">
              <div>
                <h3 className="craft-card-title">
                  FRENCH TERRY LOOSE FIT
                </h3>
                <p className="craft-card-desc">
                  Pre-shrunk combed cotton with interior loopback structure. Retains its architectural silhouette wash after wash.
                </p>
                <div className="craft-card-features">
                  <span>• 100% Combed Cotton</span>
                  <span>• Dropped Shoulders</span>
                  <span>• Ribbed Collar</span>
                </div>
              </div>

              <button
                className="btn-primary craft-card-btn"
                onClick={() => navigate('shop', { category: 'T-Shirts' })}
              >
                SHOP T-SHIRTS (₹799–₹899) →
              </button>
            </div>
          </div>

          {/* Pillar 2: 60/40 French Linen Blend */}
          <div className="craft-card">
            <div className="craft-card-media">
              <img
                src="https://cdn.shopify.com/s/files/1/0600/9425/1070/files/SID09193.jpg?v=1783428338"
                alt="60/40 French Linen Blend Shirt"
                loading="lazy"
              />
              <span className="craft-card-badge">
                AIR-COOLED LINEN
              </span>
            </div>

            <div className="craft-card-content">
              <div>
                <h3 className="craft-card-title">
                  60/40 FRENCH LINEN
                </h3>
                <p className="craft-card-desc">
                  Micro-textured linen-cotton weave allowing continuous airflow in high humidity while maintaining crisp tailoring.
                </p>
                <div className="craft-card-features">
                  <span>• 60% French Linen</span>
                  <span>• Relaxed Collar</span>
                  <span>• Anti-Crease</span>
                </div>
              </div>

              <button
                className="btn-primary craft-card-btn"
                onClick={() => navigate('shop', { category: 'Shirts' })}
              >
                SHOP LINEN SHIRTS (₹1,099) →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
