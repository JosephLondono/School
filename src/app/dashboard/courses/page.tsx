import { redirect } from "next/navigation";
import { createClient } from "@/src/utils/supabase/server";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Cursos Dashboard | Colegio Los Alpes",
  description: "Pagina de cursos del colegio los alpes",
};

const PageStudent = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  return <div>Hola Courses</div>;
};
export default PageStudent;
