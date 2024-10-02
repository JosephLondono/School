import { Footer } from "../Footer";
import Header from "../header";

export default function LayoutPrincipal({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-[89vh] flex flex-col items-center w-4/5 mx-auto">
        {children}
      </main>
      <Footer />
    </>
  );
}
