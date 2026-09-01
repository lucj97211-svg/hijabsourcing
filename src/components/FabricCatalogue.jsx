import React, { useRef, useState } from "react";
import { COLLECTIONS } from "../data/site.js";
import { useCustomization } from "../features/customization/CustomizationContext.jsx";
import Reveal from "./Reveal.jsx";

export default function FabricCatalogue() {
  const [activeId, setActiveId] = useState(COLLECTIONS[0].id);
  const { setFabricId, setGsm } = useCustomization();
  const tabRefs = useRef([]);

  const active = COLLECTIONS.find((c) => c.id === activeId) || COLLECTIONS[0];

  const onTabKey = (event, index) => {
    const last = COLLECTIONS.length - 1;
    let next = null;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setActiveId(COLLECTIONS[next].id);
    tabRefs.current[next]?.focus();
  };

  const configure = (fabric) => (event) => {
    event.preventDefault();
    setFabricId(fabric.id);
    const mid = Math.round((fabric.gsm[0] + fabric.gsm[1]) / 2 / 5) * 5;
    setGsm(mid);
    document.getElementById("customization")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="section" id="fabrics" data-component="fabric-catalogue">
      <div className="container">
        <Reveal className="section-header">
          <span className="eyebrow">Material index</span>
          <h2>Thirteen base fabrics, each with a working weight band.</h2>
          <p className="lead">
            Every fabric below runs across a range rather than one fixed GSM. Pick the base for its
            hand, then set the weight in the studio — the same yarn behaves very differently at 70
            and at 200 grams.
          </p>
        </Reveal>

        <div className="collection-tabs" role="tablist" aria-label="Fabric collections">
          {COLLECTIONS.map((collection, index) => (
            <button
              key={collection.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              role="tab"
              type="button"
              id={`tab-${collection.id}`}
              aria-selected={activeId === collection.id}
              aria-controls={`panel-${collection.id}`}
              tabIndex={activeId === collection.id ? 0 : -1}
              className={`collection-tab ${activeId === collection.id ? "is-active" : ""}`}
              onClick={() => setActiveId(collection.id)}
              onKeyDown={(e) => onTabKey(e, index)}
            >
              <span>{collection.label}</span>
              <span className="mono collection-tab__count">
                {String(collection.items.length).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>

        {COLLECTIONS.map((collection) => {
          const isActive = collection.id === activeId;
          return (
          <div
            key={collection.id}
            role="tabpanel"
            id={`panel-${collection.id}`}
            aria-labelledby={`tab-${collection.id}`}
            tabIndex={0}
            hidden={!isActive}
            className="fabric-panel"
          >
            <ul className="fabric-grid">
              {collection.items.map((fabric, index) => (
                <Reveal as="li" key={fabric.id} delay={index % 3} className="fabric-card-wrap">
                  <a
                    className="fabric-card"
                    href="#customization"
                    onClick={configure(fabric)}
                    data-component="fabric-card"
                  >
                    <span className="fabric-card__media">
                      <img
                        src={fabric.image}
                        alt={`Macro detail of ${fabric.name} fabric`}
                        loading={isActive ? "eager" : "lazy"}
                      />
                    </span>
                    <span className="fabric-card__head">
                      <span className="mono fabric-card__index">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="fabric-card__name">{fabric.name}</span>
                    </span>
                    <span className="fabric-card__feel">{fabric.handFeel}</span>
                    <span className="mono fabric-card__gsm">
                      {fabric.gsm[0]}&ndash;{fabric.gsm[1]} GSM
                    </span>
                    <span className="fabric-card__tags">
                      {fabric.tags.map((tag) => (
                        <span className="fabric-tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </span>
                    <span className="fabric-card__cta mono">Configure this weight &rarr;</span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
          );
        })}
      </div>
    </section>
  );
}
