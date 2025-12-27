import { FiClock, FiLock, FiFileText, FiFrown } from "react-icons/fi";
import { productsCopy } from "../../content";

const ICONS = [FiClock, FiLock, FiFileText, FiFrown];

export default function ProblemSection() {
  const { title, subtitle, items } = productsCopy.problem;

  return (
    <section className="section section-muted section-muted-problem" id="problem">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>

        <div className="grid grid-4">
          {items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <div key={item.title} className="card card-hover card-pad accent-top-red">
                <div className="icon-pill red" aria-hidden="true">
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
