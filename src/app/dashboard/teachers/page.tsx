import { redirect } from "next/navigation";
import { createClient } from "@/src/utils/supabase/server";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Profesores dashboard | Colegio Los Alpes",
  description: "Pagina de profesores del colegio los alpes",
};

const PageTeacher = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  return <div>Hola Teachers</div>;
};
export default PageTeacher;
