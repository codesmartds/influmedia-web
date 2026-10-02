import type { Metadata } from "next";
import { getPayload } from "payload";
import config from "@payload-config";
import { CreatorApplicationForm } from "@/components/creators/CreatorApplicationForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal, RevealItem } from "@/components/transitions/Reveal";
import { PageTransition } from "@/components/transitions/PageTransition";

export const metadata: Metadata = {
  title: "Creadores | Influmedia",
  description: "Aplica al roster de Influmedia y trabaja con las marcas líderes de Centroamérica y el Caribe.",
};

// Why a creator joins; drawn from the deck's talent pitch.
const benefits = [
  { title: "Marcas líderes", text: "Campañas con marcas de consumo, belleza y retail en toda la región." },
  { title: "Nosotros negociamos", text: "Negociación, contratos y calendario sin intermediarios: tú te enfocas en crear." },
  { title: "Exclusividad por categoría", text: "Convenios que protegen tu valor frente a la competencia de tu categoría." },
  { title: "Datos para crecer", text: "Reportes de cada campaña para entender qué funciona con tu audiencia." },
];

export default async function CreatorsPage() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({ collection: "categories", limit: 50, sort: "name", depth: 0 });
  const categories = docs.map((c) => ({ id: c.id, name: c.name }));

  return (
    <PageTransition>
      <PageHeader eyebrow="Creadores" title="Crea con las marcas que mueven la región.">
        Únete al roster de Influmedia: más de 30 creadores exclusivos en lifestyle, comedia, moda, entretenimiento, fitness,
        deporte, gaming, tech y automotriz.
      </PageHeader>

      <section className="mx-auto w-full max-w-[96rem] px-6 pb-20 pt-8 md:px-[4.7%]">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal as="ul" className="flex flex-col gap-4 self-start lg:sticky lg:top-28">
            {benefits.map((b) => (
              <RevealItem as="li" key={b.title} className="rounded-2xl border border-base-300 bg-base-200 p-6">
                <h2 className="text-lg font-bold uppercase">{b.title}</h2>
                <p className="mt-2 leading-snug text-base-content/75">{b.text}</p>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal>
            <RevealItem as="h2" className="text-2xl font-bold">
              Aplica al roster
            </RevealItem>
            <RevealItem as="p" className="mt-2 text-base-content/70">
              Revisamos cada perfil. Si encaja con lo que buscan nuestras marcas, te contactamos.
            </RevealItem>
            <RevealItem className="mt-8">
              <CreatorApplicationForm categories={categories} />
            </RevealItem>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
