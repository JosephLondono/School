import { redirect } from "next/navigation";
import { createClient } from "@/src/utils/supabase/server";
import { type Teacher } from "@/types/TableDataBases";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

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

  const { data: teachers, error }: { data: Teacher[] | null; error: any } =
    await supabase.from("teachers").select("*");
  console.log(teachers);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-green-400">
        Profesores
      </h1>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Lista de todos los profesores.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[15ch] bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                  Nombre
                </TableHead>
                <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                  Documento
                </TableHead>
                <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                  Correo
                </TableHead>
                <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                  Telefono
                </TableHead>
                <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                  Nivel Academico
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers &&
                teachers.map(
                  ({
                    id,
                    name,
                    email,
                    id_document,
                    phone,
                    Academic_Degree,
                  }) => (
                    <TableRow
                      key={id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <TableCell className="font-medium dark:text-gray-300">
                        {name}
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        {id_document}
                      </TableCell>
                      <TableCell className="text-blue-600 dark:text-green-400">
                        {email}
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        {phone}
                      </TableCell>
                      <TableCell className="max-w-[40ch] dark:text-gray-300">
                        {Academic_Degree}
                      </TableCell>
                    </TableRow>
                  )
                )}
              {error && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-red-500 dark:text-red-400">
                    Ha occurido un error.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default PageTeacher;
