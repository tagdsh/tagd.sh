const items = [
  {
    title: "Pharmaceutical",
    blurb: "DSCSA serialization and drug supply chain verification.",
    href: "/docs/industries/pharma",
    icon: "💊",
  },
  {
    title: "Healthcare",
    blurb: "Medical device traceability and UDI pathways.",
    href: "/docs/industries/healthcare",
    icon: "➕",
  },
  {
    title: "Retail",
    blurb: "Luxury authentication and anti-counterfeit controls.",
    href: "/docs/industries/retail",
    icon: "🏷️",
  },
  {
    title: "Food & Beverage",
    blurb: "Farm-to-shelf traceability and recall operations.",
    href: "/docs/industries/food-beverage",
    icon: "🌾",
  },
  {
    title: "Construction",
    blurb: "Materials compliance and safety certification tracking.",
    href: "/docs/industries/construction",
    icon: "🏗️",
  },
];

export function Industries() {
  return (
    <section className="section section-alt">
      <div className="content-grid">
        <h2>Built for regulated industries</h2>
        <div className="cards-grid industries-grid">
          {items.map((item) => (
            <a className="card industry-card" key={item.title} href={item.href}>
              <span className="industry-icon" aria-hidden="true">
                {item.icon}
              </span>
              <h3>{item.title}</h3>
              <p>{item.blurb}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
