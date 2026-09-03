// src/components/home/BrandAssuranceStrip.jsx
import React from 'react';
import { Truck, RotateCcw, ShieldCheck, MessageSquare, Clock } from 'lucide-react';
import { BRAND, BUSINESS_CONFIG } from '../../data/siteContent';

export default function BrandAssuranceStrip() {
  return (
    <section className="brand-assurance-section">
      <div className="invi-container">
        <div className="assurance-header-row">
          <span className="editorial-eyebrow">VERIFIED SERVICE STANDARDS</span>
          <h2 className="assurance-title">THE INVI CLIENT COMMITMENT</h2>
        </div>

        <div className="assurance-cards-grid">
          <div className="assurance-card-item">
            <div className="assurance-icon-box">
              <Truck size={20} strokeWidth={1.75} />
            </div>
            <h3 className="assurance-item-title">PAN-INDIA DISPATCH</h3>
            <p className="assurance-item-desc">
              Dispatched within {BUSINESS_CONFIG.dispatchTimeline}. Complimentary shipping on all prepaid orders across India.
            </p>
          </div>

          <div className="assurance-card-item">
            <div className="assurance-icon-box">
              <ShieldCheck size={20} strokeWidth={1.75} />
            </div>
            <h3 className="assurance-item-title">CASH ON DELIVERY</h3>
            <p className="assurance-item-desc">
              Reliable COD option available nationwide with transparent ₹{BUSINESS_CONFIG.codFee} courier handling fee.
            </p>
          </div>

          <div className="assurance-card-item">
            <div className="assurance-icon-box">
              <RotateCcw size={20} strokeWidth={1.75} />
            </div>
            <h3 className="assurance-item-title">7-DAY RETURNS & EXCHANGES</h3>
            <p className="assurance-item-desc">
              Size exchanges processed free of charge. {BUSINESS_CONFIG.returnWindowDays}-day return window for unworn garments.
            </p>
          </div>

          <div className="assurance-card-item">
            <div className="assurance-icon-box">
              <MessageSquare size={20} strokeWidth={1.75} />
            </div>
            <h3 className="assurance-item-title">DIRECT CONCIERGE</h3>
            <p className="assurance-item-desc">
              Human sizing advice and tracking support available {BUSINESS_CONFIG.supportHours} on WhatsApp.
            </p>
            <a
              href={`https://wa.me/${BRAND.whatsappNumber}?text=Hi%20INVI`}
              target="_blank"
              rel="noopener noreferrer"
              className="assurance-concierge-link"
            >
              CHAT WITH CONCIERGE →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
