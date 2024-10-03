import { redirect } from "next/navigation";
import { createClient } from "@/src/utils/supabase/server";

const PageStudent = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  return <div>Hola Students</div>;
};
export default PageStudent;
