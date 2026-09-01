import React from "react";
import { CONTACT, COLLECTIONS, NAV } from "../data/site.js";
import BrandMark from "./BrandMark.jsx";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
      <path
        d="M14.5 8.5h2.2V5.6h-2.4c-2.4 0-3.8 1.4-3.8 3.9v1.6H8.3v3h2.2V21h3.1v-6.9h2.3l.4-3h-2.7V9.8c0-.9.3-1.3 1.2-1.3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SiteFooter() {
  const year = new Date().getFullYear();
  const go = (id) => (event) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="site-footer" data-component="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <span className="footer-brand__mark">
            <BrandMark size={34} />
          </span>
          <p className="footer-brand__name">Hijab Sourcing</p>
          <p className="footer-brand__line">
            Jersey and modal hijab fabric, knitted, dyed and finished in one mill for brands
            building their own label.
          </p>
        </div>

        <nav className="footer-col" aria-label="Fabrics">
          <h2 className="mono footer-col__title">Fabrics</h2>
          <ul>
            {COLLECTIONS.map((c) => (
              <li key={c.id}>
                <a href="#fabrics" onClick={go("fabrics")}>
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Sections">
          <h2 className="mono footer-col__title">Explore</h2>
          <ul>
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} onClick={go(n.id)}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h2 className="mono footer-col__title">Direct contact</h2>
          <ul>
            <li>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <a href={`tel:${CONTACT.phoneRaw}`}>{CONTACT.phone}</a>
            </li>
            <li>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                WhatsApp
              </a>
            </li>
          </ul>
          <ul className="footer-social">
            <li>
              <a
                className="social-btn"
                href="#"
                aria-label="Instagram (link coming soon)"
                title="Instagram — link coming soon"
              >
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a
                className="social-btn"
                href="#"
                aria-label="Facebook (link coming soon)"
                title="Facebook — link coming soon"
              >
                <FacebookIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-legal">
        <p>
          &copy; {year} Hijab Sourcing. All rights reserved.
        </p>
        <p className="mono">HIJABSOURCING.COM · JERSEY &amp; MODAL · OEM / ODM</p>
      </div>
    </footer>
  );
}
