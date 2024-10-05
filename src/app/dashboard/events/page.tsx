import { redirect } from "next/navigation";
import { createClient } from "@/src/utils/supabase/server";

import DataEvents from "@/src/components/Dashboard/events/data";

import { Message } from "@/src/components/form-message";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Eventos Dashboard | Colegio Los Alpes",
  description: "Pagina de eventos del dashboard",
};

const PageEvents = async ({ searchParams }: { searchParams: Message }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  let { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("id", { ascending: true });

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-green-400">
        Eventos
      </h1>
      <DataEvents events={events} error={error} searchParams={searchParams} />
    </div>
  );
};
export default PageEvents;
