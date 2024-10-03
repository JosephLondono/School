import { redirect } from "next/navigation";
import { createClient } from "@/src/utils/supabase/server";

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
