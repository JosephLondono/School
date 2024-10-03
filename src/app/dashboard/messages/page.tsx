import { createClient } from "@/src/utils/supabase/server";
import { type Contact } from "@/types/TableDataBases";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

const PageMessages = async () => {
  const supabase = createClient();

  let { data: contacts, error }: { data: Contact[] | null; error: any } =
    await supabase.from("contact").select("*");

  console.log(contacts, error);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-green-400">
        Mensajes
      </h1>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableCaption className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Lista de todos los mensajes.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px] bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                  Fecha
                </TableHead>
                <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                  Nombre
                </TableHead>
                <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                  Correo
                </TableHead>
                <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                  Asunto
                </TableHead>
                <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                  Mensaje
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts &&
                contacts.map(
                  ({ id, created_at, name, email, subject, message }) => (
                    <TableRow
                      key={id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <TableCell className="font-medium dark:text-gray-300">
                        {created_at}
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        {name}
                      </TableCell>
                      <TableCell className="text-blue-600 dark:text-green-400">
                        {email}
                      </TableCell>
                      <TableCell className="dark:text-gray-300">
                        {subject}
                      </TableCell>
                      <TableCell className="max-w-[40ch] truncate dark:text-gray-300">
                        {message}
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PageMessages;
