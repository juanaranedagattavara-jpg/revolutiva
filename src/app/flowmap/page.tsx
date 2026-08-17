import type { Metadata } from "next";
import FlowMapApp from "@/components/flowmap/FlowMapApp";

export const metadata: Metadata = {
  title: "FlowMap de Turismo Regenerativo",
  description: "Autodiagnóstico para Organizaciones Vivas — evalúa tu organización turística en los cuatro elementos y las cinco R del marco FlowMap de la IGTR.",
};

export default function FlowMapPage() {
  return <FlowMapApp />;
}
