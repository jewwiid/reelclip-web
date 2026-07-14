import Image from "next/image";

const USE_CASES = [
  {
    title: "Podcasters",
    description: "Find the moments worth sharing.",
    image: "/audience/podcasters.webp",
    alt: "Podcaster reviewing a recording at a desk",
  },
  {
    title: "Coaches",
    description: "Pull out the plays worth replaying.",
    image: "/audience/coaches.webp",
    alt: "Coach reviewing a practice recording on a basketball court",
  },
  {
    title: "Everyday vloggers",
    description: "Keep the moments that make the cut.",
    image: "/audience/everyday-vloggers.webp",
    alt: "Woman casually filming a day-in-the-life video in her kitchen",
  },
  {
    title: "Travel vloggers",
    description: "Turn days away into clips worth posting.",
    image: "/audience/travel-vloggers.webp",
    alt: "Woman filming a travel video on a coastal street",
  },
];

export function ForCreators() {
  return (
    <section id="for" className="relative border-t border-hairline px-6 py-20 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl sm:mb-16">
          <div className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent">
            Made for your footage
          </div>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Make more from every recording.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 sm:gap-6">
          {USE_CASES.map((useCase) => (
            <article
              key={useCase.title}
              className="group overflow-hidden rounded-2xl border border-hairline bg-surface"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={useCase.image}
                  alt={useCase.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="mb-2 text-xl font-bold">{useCase.title}</h3>
                <p className="leading-relaxed text-text-muted">{useCase.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
