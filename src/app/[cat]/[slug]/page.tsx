import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CAT_BY_SLUG, CAT_META } from "@/lib/constants";
import { getListingBySlug, getRelatedListings } from "@/lib/queries";
import { listingPrice } from "@/lib/types";
import LevelBadge from "@/components/LevelBadge";
import ListingCard from "@/components/ListingCard";
import ListingDetailBody from "@/components/ListingDetailBody";
import BookingSidebar from "@/components/BookingSidebar";

export const revalidate = 3600;

interface Params {
  cat: string;
  slug: string;
}

async function resolveListing(params: Params) {
  const category = CAT_BY_SLUG[params.cat];
  if (!category) return null;
  const item = await getListingBySlug(params.slug);
  if (!item || item.category !== category) return null;
  return item;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const item = await resolveListing(await params);
  if (!item) return {};
  return {
    title: item.nombre,
    description: item.descripcion,
    openGraph: {
      title: item.nombre,
      description: item.descripcion,
      images: item.foto ? [item.foto] : undefined,
    },
  };
}

export default async function ListingDetailPage({ params }: { params: Promise<Params> }) {
  const p = await params;
  const item = await resolveListing(p);
  if (!item) notFound();

  const m = CAT_META[item.category];
  const price = listingPrice(item);
  const related = await getRelatedListings(item.id, item.pais, item.category);

  const jsonLdType = item.category === "hospedaje" ? "LodgingBusiness" : item.category === "guiado" ? "LocalBusiness" : "TouristTrip";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": jsonLdType,
    name: item.nombre,
    description: item.descripcion,
    image: item.foto ?? undefined,
    address: {
      "@type": "PostalAddress",
      addressRegion: item.territorio,
      addressCountry: item.pais,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="wrap">
        <Link href={`/${m.slug}`} className="crumb">
          ← {m.plural}
        </Link>
      </div>
      <section style={{ padding: "18px 0 0" }}>
        <div className="wrap">
          <div className="detail-hero">
            {item.foto && <Image src={item.foto} alt={item.nombre} fill priority sizes="100vw" style={{ objectFit: "cover" }} />}
            <div className="wrap dh-body">
              <span className="card-cat" style={{ position: "static", display: "inline-block", marginBottom: "14px" }}>
                {m.tag}
              </span>
              <div style={{ color: "#ece5d6", fontWeight: 600, letterSpacing: ".04em" }}>
                {item.territorio} · {item.pais}
              </div>
              <h1>{item.nombre}</h1>
              <div style={{ marginTop: "8px" }}>
                <LevelBadge nivel={item.nivel} />
              </div>
            </div>
          </div>

          <div className="detail-grid">
            <div>
              <div className="story-block">
                <h3>
                  <span className="ic">❝</span>Descripción
                </h3>
                <p>{item.descripcion}</p>
              </div>
              <ListingDetailBody item={item} />

              <div className="story-block">
                <h3>
                  <span className="ic">✦</span>Evidencias
                </h3>
                <p className="muted" style={{ marginBottom: "8px" }}>
                  Prácticas verificables que respaldan su nivel regenerativo.
                </p>
                {item.evidencias.map((e) => (
                  <div className="evidence" key={e}>
                    <span className="ck">✓</span>
                    <span>{e}</span>
                  </div>
                ))}
              </div>

              {!!item.galeria.length && (
                <div className="story-block">
                  <h3>
                    <span className="ic">◳</span>Galería
                  </h3>
                  <div className="gallery">
                    {item.galeria.map((g) => (
                      <Image src={g} alt="" width={500} height={500} loading="lazy" key={g} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <BookingSidebar item={item} price={price} />
          </div>

          {!!related.length && (
            <div style={{ margin: "60px 0 20px" }}>
              <h2 style={{ textAlign: "center" }}>También en la red viva</h2>
              <div className="grid" style={{ marginTop: "30px" }}>
                {related.map((it) => (
                  <ListingCard item={it} key={it.id} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
