import Hero from "@/src/components/hero";
import { InstitutionalValues } from "@/src/components/home/InstitutionalValues";
import LayoutPrincipal from "../components/home/Layout";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Pagina Principal | Colegio Los Alpes",
  description: "Pagina principal del colegio los alpes",
};

export default async function Index() {
  return (
    <>
      <LayoutPrincipal>
        <Hero />
        <InstitutionalValues />
      </LayoutPrincipal>
    </>
  );
}
