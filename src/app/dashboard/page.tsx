import { createClient } from "@/src/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function PageDashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  return <div>Hola Dashboard</div>;
}
