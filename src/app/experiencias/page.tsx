import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { CAT_META } from "@/lib/constants";

export const metadata: Metadata = {
  title: CAT_META.experiencia.plural,
  description: CAT_META.experiencia.intro,
};

export const revalidate = 3600;

export default function Page() {
  return <CategoryPage cat="experiencia" />;
}
