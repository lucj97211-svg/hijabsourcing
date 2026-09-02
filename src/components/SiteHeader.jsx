import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CONTACT, NAV } from "../data/site.js";
import BrandMark from "./BrandMark.jsx";

export default function SiteHeader() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const drawerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close drawer and scroll to section when on the home page */
  const goAnchor = (id) => (event) => {
    event.preventDefault();
    setOpen(false);
    if (isHome) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `#${id}`);
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const firstLink = drawerRef.current?.querySelector("a, button");
    firstLink?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function NavItem({ item, onClick }) {
    if (item.type === "anchor") {
      return (
        <a href={item.href} onClick={goAnchor(item.id)}>
          {item.label}
        </a>
      );
    }
    return (
      <NavLink
        to={item.href}
        className={({ isActive }) => (isActive ? "is-active" : undefined)}
        onClick={onClick}
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <>
      <div className="utility-strip" data-component="utility-strip">
        <div className="container utility-strip__inner">
          <div className="utility-strip__contacts mono">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <span aria-hidden="true">·</span>
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              WhatsApp {CONTACT.phone}
            </a>
          </div>
          <p className="utility-strip__tagline mono">{CONTACT.tagline}</p>
        </div>
      </div>

      <header
        className={`site-header ${condensed ? "is-condensed" : ""}`}
        data-component="site-header"
      >
        <div className="container site-header__inner">
          <Link className="wordmark" to="/" aria-label={`${CONTACT.brand} home`}>
            <BrandMark />
            <span className="wordmark__text">
              <strong>Hijab Sourcing</strong>
              <span className="mono wordmark__sub">Jersey &amp; Modal Mill</span>
            </span>
          </Link>

          <nav className="site-nav" aria-label="Main">
            {NAV.map((item) => (
              <NavItem key={item.id} item={item} onClick={() => setOpen(false)} />
            ))}
          </nav>

          <div className="site-header__actions">
            <NavLink className="btn btn--solid btn--sm site-header__cta" to="/contact">
              Request a Quote
            </NavLink>
            <button
              ref={triggerRef}
              type="button"
              className="nav-toggle"
              aria-expanded={open}
              aria-controls="mobile-drawer"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span className={`nav-toggle__bars ${open ? "is-open" : ""}`} aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="drawer-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
      )}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        className={`mobile-drawer ${open ? "is-open" : ""}`}
        data-component="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
      >
        <nav className="mobile-drawer__nav">
          {NAV.map((item) => (
            <NavItem key={item.id} item={item} onClick={() => setOpen(false)} />
          ))}
        </nav>
        <div className="mobile-drawer__contact">
          <span className="mono muted">Direct contact</span>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer noopener">
            WhatsApp {CONTACT.phone}
          </a>
        </div>
        <NavLink
          className="btn btn--solid btn--block"
          to="/contact"
          onClick={() => setOpen(false)}
        >
          Request a Quote
        </NavLink>
      </div>
    </>
  );
}
