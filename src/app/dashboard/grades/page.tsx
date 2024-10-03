import { redirect } from "next/navigation";
import { createClient } from "@/src/utils/supabase/server";

const PageGrades = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  return <div>Hola Calificaciones</div>;
};
export default PageGrades;
