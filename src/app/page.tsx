import Hero from "@/src/components/hero";
import { InstitutionalValues } from "@/src/components/home/InstitutionalValues";
import LayoutPrincipal from "../components/home/Layout";

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
