import React from "react";

export function WelcomeSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-4xl">
        <div className="text-sm tracking-[0.22em] text-white/60">WELCOME</div>
        <h2 className="mt-3 text-3xl md:text-4xl">
          Welcome to Elite Visa Global
        </h2>

        <div className="mt-6 space-y-5 text-white/70 leading-relaxed">
          <p>
            Elite Visa Global (EVG) is a premium Visa, Tours & Travel
            consultancy, created for individuals and families ready to follow
            their dreams beyond borders—with clarity, confidence, and
            professional guidance.
          </p>

          <p>
            In a world shaped by complex immigration rules and global
            regulations, EVG transforms ambition into structured, achievable
            pathways. From international education and short-term travel to
            business mobility, pilgrimage, and leisure journeys, we ensure every
            step is compliant, considered, and purposeful.
          </p>

          <p>
            Our approach is consultative, not transactional. We listen before we
            advise, assess before we recommend, and prepare every application
            with precision and integrity.
          </p>

          <p>
            At Elite Visa Global, dreams are not rushed—they are guided.
            <br />
            <span className="text-[color:var(--evg-gold)] font-medium">
              Follow your dreams. We’ll help you reach them.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
