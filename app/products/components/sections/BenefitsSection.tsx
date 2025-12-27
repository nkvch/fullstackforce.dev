import { FiClock, FiHeart, FiSettings, FiShield, FiTarget, FiTrendingUp } from "react-icons/fi";
import { productsCopy } from "../../content";

const ICONS = [FiClock, FiTarget, FiHeart, FiShield, FiSettings, FiTrendingUp];

export default function BenefitsSection() {
  const { title, subtitle, items } = productsCopy.benefits;

  return (
    <section className="section section-muted section-benefits" id="benefits">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>

        <div className="grid grid-3">
          {items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div key={item.title} className="card card-hover card-pad accent-top-green">
                <div className="icon-pill green" aria-hidden="true">
                  <Icon />
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


