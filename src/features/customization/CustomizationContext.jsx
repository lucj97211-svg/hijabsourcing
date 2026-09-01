import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ALL_FABRICS } from "../../data/site.js";
import { gsmZone } from "./gsm.js";

const CustomizationContext = createContext(null);

const DEFAULT_FABRIC = ALL_FABRICS.find((f) => f.id === "modal-40s") || ALL_FABRICS[0];

export function CustomizationProvider({ children }) {
  const [fabricId, setFabricId] = useState(DEFAULT_FABRIC.id);
  const [gsm, setGsm] = useState(120);
  const [logo, setLogo] = useState(null); // { name, url, width, height }
  const [carriers, setCarriers] = useState(["woven-label", "hang-tag"]);

  const fabric = useMemo(
    () => ALL_FABRICS.find((f) => f.id === fabricId) || DEFAULT_FABRIC,
    [fabricId]
  );

  const toggleCarrier = useCallback((id) => {
    setCarriers((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }, []);

  const specLine = useMemo(() => {
    const parts = [fabric.name.toUpperCase(), `${gsm} GSM`];
    if (logo) parts.push(`LOGO ON ${carriers.length || 0} CARRIER${carriers.length === 1 ? "" : "S"}`);
    return parts.join("  ·  ");
  }, [fabric, gsm, logo, carriers]);

  const specText = useMemo(() => {
    const zone = gsmZone(gsm);
    const lines = [
      `Fabric: ${fabric.name} (${fabric.gsm[0]}\u2013${fabric.gsm[1]} GSM range)`,
      `Target weight: ${gsm} GSM \u2014 ${zone.label.toLowerCase()} weight`,
      "Shade: to be confirmed \u2014 send a Pantone code or a physical swatch and we will lab-dip to match",
    ];
    if (logo) {
      const names = carriers.length ? carriers.join(", ") : "none selected yet";
      lines.push(`Branding: logo supplied (${logo.name}) for ${names}`);
    } else {
      lines.push("Branding: no logo uploaded yet");
    }
    return lines.join("\n");
  }, [fabric, gsm, logo, carriers]);

  const value = useMemo(
    () => ({
      fabric,
      fabricId,
      setFabricId,
      gsm,
      setGsm,
      logo,
      setLogo,
      carriers,
      toggleCarrier,
      specLine,
      specText,
    }),
    [fabric, fabricId, gsm, logo, carriers, toggleCarrier, specLine, specText]
  );

  return (
    <CustomizationContext.Provider value={value}>{children}</CustomizationContext.Provider>
  );
}

export function useCustomization() {
  const ctx = useContext(CustomizationContext);
  if (!ctx) throw new Error("useCustomization must be used inside CustomizationProvider");
  return ctx;
}
