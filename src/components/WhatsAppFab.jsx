import React from "react";
import { CONTACT } from "../data/site.js";

const WA_URL = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Hello, I'm interested in placing a hijab fabric order. Could you please share more details?"
)}`;

export default function WhatsAppFab() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noreferrer noopener"
      className="wa-fab"
      aria-label="Chat with us on WhatsApp"
    >
      {/* Official WhatsApp logo mark */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="28"
        height="28"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill="currentColor"
          d="M24 4C13 4 4 13 4 24c0 3.6 1 7 2.7 9.9L4 44l10.4-2.7A19.9 19.9 0 0 0 24 44c11 0 20-9 20-20S35 4 24 4Zm0 36.5a16.4 16.4 0 0 1-8.4-2.3l-.6-.4-6.2 1.6 1.7-6-.4-.6A16.4 16.4 0 1 1 24 40.5ZM34 29c-.5-.3-3-1.5-3.4-1.6-.5-.2-.8-.3-1.2.2s-1.3 1.6-1.6 2c-.3.3-.6.4-1.1.1a13.8 13.8 0 0 1-4-2.5 15 15 0 0 1-2.8-3.5c-.3-.5 0-.8.2-1l1-1.2c.2-.3.3-.5.4-.8 0-.3 0-.6-.1-.8l-1.6-3.8c-.4-1-.9-1-1.2-1h-1c-.3 0-.8.1-1.3.6C17 16.4 15.5 18 15.5 21s2.1 6 2.4 6.4c.3.3 4.1 6.3 10 8.8 1.4.6 2.5 1 3.3 1.2 1.4.4 2.7.4 3.7.2 1.1-.2 3.4-1.4 3.9-2.7.5-1.3.5-2.4.3-2.6-.1-.3-.5-.4-1-.7Z"
        />
      </svg>
      <span className="wa-fab__label">WhatsApp</span>
    </a>
  );
}
