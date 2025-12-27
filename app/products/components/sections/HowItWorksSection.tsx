import { productsCopy } from "../../content";
import InfoDotDiagram from "../InfoDotDiagram";
import ProcessFlowSchema from "../ProcessFlowSchema";

export default function HowItWorksSection() {
  const { title, subtitle } = productsCopy.demo;

  return (
    <section className="section section-how-it-works" id="demo">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>

        <ProcessFlowSchema />

        <InfoDotDiagram />
      </div>
    </section>
  );
}
