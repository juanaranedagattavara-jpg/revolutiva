import Link from "next/link";
import Image from "next/image";
import { CAT_META, clp, priceUnit } from "@/lib/constants";
import { listingPrice, listingR, type Listing } from "@/lib/types";
import LevelBadge from "./LevelBadge";
import RChips from "./RChips";

export default function ListingCard({ item }: { item: Listing }) {
  const m = CAT_META[item.category];
  const price = listingPrice(item);
  return (
    <Link href={`/${m.slug}/${item.slug}`} className="card">
      <div className="card-img">
        {item.foto && (
          <Image
            src={item.foto}
            alt={item.nombre}
            width={700}
            height={525}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        <span className="card-cat">{m.tag}</span>
      </div>
      <div className="card-body">
        <div className="card-loc">{item.territorio}</div>
        <h3>{item.nombre}</h3>
        <p className="card-desc">{item.descripcion}</p>
        <RChips R={listingR(item)} />
        <div className="card-foot" style={{ marginTop: "14px" }}>
          <LevelBadge nivel={item.nivel} />
          <span className="card-price">
            {clp(price)} <small>{priceUnit(item.category)}</small>
          </span>
        </div>
      </div>
    </Link>
  );
}
