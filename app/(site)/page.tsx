export default function Home() {
  return (
    <main className="flex flex-1 flex-col justify-center gap-6 px-6 py-24 md:px-16">
      <span className="badge badge-secondary font-bold">NEW BUSINESS DECK</span>
      <h1 className="max-w-2xl text-4xl font-extrabold uppercase leading-tight md:text-6xl">
        Influencer marketing que mueve conversaciones.
      </h1>
      <p className="max-w-xl text-lg text-muted">
        Estrategia, creatividad y tecnología para conectar marcas con personas reales.
      </p>
      <div className="flex flex-wrap gap-3">
        <button className="btn btn-secondary">Explorar deck →</button>
        <button className="btn btn-primary">Contacto →</button>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="badge badge-primary badge-lg">Creatividad</span>
        <span className="badge badge-secondary badge-lg">Data</span>
        <span className="badge badge-accent badge-lg">People</span>
      </div>
    </main>
  );
}
