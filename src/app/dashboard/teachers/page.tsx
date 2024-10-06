import { redirect } from "next/navigation";
import { createClient } from "@/src/utils/supabase/server";
import { type Teacher } from "@/types/TableDataBases";

import DataTeachers from "@/src/components/Dashboard/teachers/data";
import { Message } from "@/src/components/form-message";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Profesores dashboard | Colegio Los Alpes",
  description: "Pagina de profesores del colegio los alpes",
};

const PageTeacher = async ({ searchParams }: { searchParams: Message }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: teachers, error }: { data: Teacher[] | null; error: any } =
    await supabase
      .from("teachers")
      .select("*")
      .order("id", { ascending: true });

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-green-400">
        Profesores
      </h1>
      <DataTeachers
        teachers={teachers}
        error={error}
        searchParams={searchParams}
      />
    </div>
  );
};
export default PageTeacher;
