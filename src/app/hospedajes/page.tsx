import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { CAT_META } from "@/lib/constants";

export const metadata: Metadata = {
  title: CAT_META.hospedaje.plural,
  description: CAT_META.hospedaje.intro,
};

export const revalidate = 3600;

export default function Page() {
  return <CategoryPage cat="hospedaje" />;
}
