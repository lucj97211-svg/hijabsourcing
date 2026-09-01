import React, { useMemo, useRef, useState } from "react";
import { ALL_FABRICS, CONTACT } from "../data/site.js";
import { useCustomization } from "../features/customization/CustomizationContext.jsx";
import Reveal from "./Reveal.jsx";

const QUANTITIES = [
  "Sampling only",
  "Under 500 pieces",
  "500 – 2,000 pieces",
  "2,000 – 10,000 pieces",
  "Over 10,000 pieces",
  "Roll goods (by metre)",
];

export default function InquiryForm() {
  const { specText, fabric, logo } = useCustomization();
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    fabric: "",
    quantity: "",
    message: "",
  });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const summaryRef = useRef(null);

  const errors = useMemo(() => {
    const e = {};
    if (!values.name.trim()) e.name = "Please tell us your name.";
    if (!values.email.trim()) e.email = "We need an email address to reply to.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      e.email = "That email address does not look complete.";
    return e;
  }, [values]);

  const showError = (field) => (touched[field] || submitted) && errors[field];

  const set = (field) => (event) =>
    setValues((v) => ({ ...v, [field]: event.target.value }));

  const blur = (field) => () => setTouched((t) => ({ ...t, [field]: true }));

  const body = useMemo(() => {
    const lines = [
      `Name: ${values.name || "—"}`,
      `Company: ${values.company || "—"}`,
      `Country: ${values.country || "—"}`,
      `Fabric of interest: ${values.fabric || fabric.name}`,
      `Estimated quantity: ${values.quantity || "—"}`,
      "",
      "Configuration from the customization studio:",
      specText,
      "",
      "Message:",
      values.message || "—",
    ];
    if (logo) lines.push("", `(Logo file to attach: ${logo.name})`);
    return lines.join("\n");
  }, [values, specText, fabric, logo]);

  const submit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) {
      window.setTimeout(() => summaryRef.current?.focus(), 0);
      return;
    }
    const subject = `Hijab fabric inquiry — ${values.company || values.name}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const whatsappHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    `Hello, I would like a quote.\n\n${specText}`
  )}`;

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="section section--tint" id="contact" data-component="inquiry-form">
      <div className="container inquiry-layout">
        <Reveal className="inquiry-intro">
          <span className="eyebrow">Start your project</span>
          <h2>Send us your requirements.</h2>
          <p className="lead">
            Tell us the fabric, weight and shade you have in mind — or just describe the product and
            we will suggest a base. We reply within one working day, Monday to Saturday, Shanghai
            time.
          </p>
          <ul className="inquiry-direct">
            <li>
              <span className="mono muted">Email</span>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li>
              <span className="mono muted">Phone / WhatsApp</span>
              <a href={whatsappHref} target="_blank" rel="noreferrer noopener">
                {CONTACT.phone}
              </a>
            </li>
          </ul>
          <a className="btn btn--outline" href={whatsappHref} target="_blank" rel="noreferrer noopener">
            Message us on WhatsApp
          </a>
        </Reveal>

        <Reveal className="inquiry-form-wrap" delay={1}>
          <form className="inquiry-form" onSubmit={submit} noValidate>
            {submitted && Object.keys(errors).length > 0 && (
              <div className="error-summary" ref={summaryRef} tabIndex={-1} role="alert">
                <h3 className="error-summary__title">Please check these fields</h3>
                <ul>
                  {Object.entries(errors).map(([field, msg]) => (
                    <li key={field}>
                      <a href={`#inq-${field}`}>{msg}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="field-row">
              <label className="field">
                <span className="field__label">Name *</span>
                <input
                  id="inq-name"
                  className="field__input"
                  value={values.name}
                  onChange={set("name")}
                  onBlur={blur("name")}
                  aria-invalid={showError("name") ? "true" : "false"}
                  aria-describedby={showError("name") ? "err-name" : undefined}
                />
                {showError("name") && (
                  <span className="field__error" id="err-name">
                    {errors.name}
                  </span>
                )}
              </label>
              <label className="field">
                <span className="field__label">Email *</span>
                <input
                  id="inq-email"
                  type="email"
                  className="field__input"
                  value={values.email}
                  onChange={set("email")}
                  onBlur={blur("email")}
                  aria-invalid={showError("email") ? "true" : "false"}
                  aria-describedby={showError("email") ? "err-email" : undefined}
                />
                {showError("email") && (
                  <span className="field__error" id="err-email">
                    {errors.email}
                  </span>
                )}
              </label>
            </div>

            <div className="field-row">
              <label className="field">
                <span className="field__label">Company</span>
                <input
                  id="inq-company"
                  className="field__input"
                  value={values.company}
                  onChange={set("company")}
                />
              </label>
              <label className="field">
                <span className="field__label">Country</span>
                <input
                  id="inq-country"
                  className="field__input"
                  value={values.country}
                  onChange={set("country")}
                />
              </label>
            </div>

            <div className="field-row">
              <label className="field">
                <span className="field__label">Fabric of interest</span>
                <select
                  id="inq-fabric"
                  className="field__input"
                  value={values.fabric}
                  onChange={set("fabric")}
                >
                  <option value="">Use my studio configuration ({fabric.name})</option>
                  {ALL_FABRICS.map((f) => (
                    <option key={f.id} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                  <option value="Not sure yet">Not sure yet — please advise</option>
                </select>
              </label>
              <label className="field">
                <span className="field__label">Estimated quantity</span>
                <select
                  id="inq-quantity"
                  className="field__input"
                  value={values.quantity}
                  onChange={set("quantity")}
                >
                  <option value="">Select a range</option>
                  {QUANTITIES.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="spec-summary" data-component="inquiry-spec-summary">
              <span className="mono muted">Your configuration</span>
              <pre className="spec-summary__pre mono">{specText}</pre>
              <a className="linkish" href="#customization">
                Edit configuration
              </a>
            </div>

            <label className="field">
              <span className="field__label">Message</span>
              <textarea
                id="inq-message"
                className="field__input field__input--area"
                rows={5}
                value={values.message}
                onChange={set("message")}
                placeholder="Tell us about the product, your target market, and anything you have already tried."
              />
            </label>

            <div className="form-actions">
              <button type="submit" className="btn btn--solid">
                Send inquiry by email
              </button>
              <button type="button" className="btn btn--ghost" onClick={copyAll}>
                {copied ? "Copied" : "Copy inquiry"}
              </button>
            </div>

            <p className="mono form-note">
              Sending opens your email client with everything filled in. Attach your tech pack or
              logo file there — nothing is uploaded from this page.
            </p>

            {sent && (
              <p className="form-sent" role="status">
                Your email client should now be open with the inquiry ready to send. If nothing
                happened, use <strong>Copy inquiry</strong> and paste it into an email to{" "}
                {CONTACT.email}.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
