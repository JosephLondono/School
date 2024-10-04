import LayoutPrincipal from "@/src/components/home/Layout";
import CalendarSection from "@/src/components/home/Calendar/Calendar";
import { createClient } from "@/src/utils/supabase/server";
import { Jost } from "next/font/google";

const JostFont = Jost({
  subsets: ["latin"],
  display: "swap",
});

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Calendario | Colegio Los Alpes",
  description: "Pagina de calendario del colegio los alpes",
};

const Calendar = async () => {
  const supabase = createClient();

  let { data: events, error } = await supabase.from("events").select("*");
  events = events ?? [];
  console.log(events);
  console.log(error);

  return (
    <LayoutPrincipal>
      <section
        className={`mt-7 w-full flex flex-col items-center ${JostFont.className}`}>
        <h1 className="text-4xl font-semibold">Calendario</h1>
        <p className="max-w-[80ch] mt-4">
          ¡Bienvenido al calendario del colegio JL School! Aquí podrás encontrar
          todas las fechas importantes relacionadas con el año escolar,
          vacaciones, eventos y actividades especiales. Mantente informado y
          planifica tu tiempo de la mejor manera.
        </p>
        <CalendarSection events={events} />
      </section>
    </LayoutPrincipal>
  );
};

export default Calendar;
