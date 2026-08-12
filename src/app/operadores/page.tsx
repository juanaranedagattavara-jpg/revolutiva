import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { CAT_META } from "@/lib/constants";

export const metadata: Metadata = {
  title: CAT_META.guiado.plural,
  description: CAT_META.guiado.intro,
};

export const revalidate = 3600;

export default function Page() {
  return <CategoryPage cat="guiado" />;
}
