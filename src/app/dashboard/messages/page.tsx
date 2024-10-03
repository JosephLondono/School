import DataMessage from "@/src/components/Dashboard/messages/data";
import { createClient } from "@/src/utils/supabase/server";

import { redirect } from "next/navigation";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Mensajes Dashboard | Colegio Los Alpes",
  description: "Pagina de mensajes del colegio los alpes",
};

const PageMessages = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  let { data: contacts, error } = await supabase.from("contact").select("*");

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-green-400">
        Mensajes
      </h1>
      <DataMessage contacts={contacts} error={error} />
    </div>
  );
};

export default PageMessages;
