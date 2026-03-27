import { useEffect, useRef, useState } from "react";
import "./about.css";

export default function About() {
  const [count, setCount] = useState({
    year: 0,
    models: 0,
    satisfaction: 0
  });

  const [start, setStart] = useState(false);
  const sectionRef = useRef(null);

  // detectar quando entra na tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // animação dos números
  useEffect(() => {
    if (!start) return;

    const duration = 1500;
    const startTime = Date.now();

    const targets = {
      year: 2018,
      models: 300,
      satisfaction: 100
    };

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = easeOut(Math.min(elapsed / duration, 1));

      setCount({
        year: Math.floor(progress * targets.year),
        models: Math.floor(progress * targets.models),
        satisfaction: Math.floor(progress * targets.satisfaction)
      });

      if (progress === 1) clearInterval(interval);
    }, 16);

    return () => clearInterval(interval);
  }, [start]);

  return (
    <section className="about">
      <div className="container about-container" ref={sectionRef}>

        {/* IMAGEM */}
        <div className="about-image">
          <img src="https://placehold.co/800x900" alt="about" />
        </div>

        {/* TEXTO */}
        <div className="about-content">
          <span className="subtitle">NOSSA FILOSOFIA</span>

          <h2>
            Beleza que celebra <span>você</span> todos os dias
          </h2>

          <p>
            A Bellagi nasceu da crença de que toda mulher merece sentir-se
            extraordinária, não só em ocasiões especiais.
          </p>

          <p>
            Nossas peças são desenhadas para abraçar cada curva com elegância.
          </p>

          <div className="stats">
            <div>
              <strong>{count.year}</strong>
              <span>Fundada em</span>
            </div>

            <div>
              <strong>{count.models}+</strong>
              <span>Modelos criados</span>
            </div>

            <div>
              <strong>{count.satisfaction}%</strong>
              <span>Satisfação</span>
            </div>
          </div>

          <a href="#" className="link">
            Conheça nossa história →
          </a>
        </div>

      </div>
    </section>
  );
}