import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { createClient } from "@/src/utils/supabase/server";
import { Contact } from "@/types/TableDataBases";
import Link from "next/link";
import { redirect } from "next/navigation";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Dashboard | Colegio Los Alpes",
  description: "Pagina de dashboard del colegio los alpes",
};

export default async function PageDashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: messages, error }: { data: Contact[] | null; error: any } =
    await supabase
      .from("contact")
      .select("*")
      .limit(3)
      .order("id", { ascending: false });

  return (
    <div className="h-full overflow-y-scroll dark:bg-gray-900 rounded-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 dark:text-green-400 px-5 pt-5 text-center md:text-start">
        Hola, Dashboard
      </h2>
      <section className="grid-dashboard gap-6 px-3 mb-4">
        <Card className="grid-dashboard-1 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 p-4">
            <CardTitle className="text-lg font-semibold text-gray-700 dark:text-green-400">
              Mensajes
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
              Lista de los últimos mensajes
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 bg-white dark:bg-gray-900 shadow-sm rounded-lg">
            {messages && (
              <ul className="space-y-3">
                {messages.map((message) => (
                  <li
                    key={message.id}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
                      {message.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {message.subject}
                    </p>
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                      {message.message}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            {error && (
              <p className="text-red-500 dark:text-red-400">
                Error al cargar los mensajes
              </p>
            )}
          </CardContent>
          <CardFooter className="p-4">
            <Link
              href="/dashboard/messages"
              className="text-blue-600 hover:underline dark:text-green-400">
              Ver todos los mensajes
            </Link>
          </CardFooter>
        </Card>

        <Card className="grid-dashboard-2 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 p-4">
            <CardTitle className="text-lg font-semibold text-gray-700 dark:text-green-400">
              Estadísticas
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
              Datos recientes
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-700 dark:text-gray-300">
              Contenido de estadísticas
            </p>
          </CardContent>
          <CardFooter className="p-4">
            <p className="text-gray-500 dark:text-gray-400">
              Footer de estadísticas
            </p>
          </CardFooter>
        </Card>

        <Card className="grid-dashboard-3 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 p-4">
            <CardTitle className="text-lg font-semibold text-gray-700 dark:text-green-400">
              Actividades Recientes
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
              Historial de actividades
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-700 dark:text-gray-300">
              Contenido de actividades recientes
            </p>
          </CardContent>
          <CardFooter className="p-4">
            <p className="text-gray-500 dark:text-gray-400">
              Footer de actividades
            </p>
          </CardFooter>
        </Card>

        <Card className="grid-dashboard-4 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700 p-4">
            <CardTitle className="text-lg font-semibold text-gray-700 dark:text-green-400">
              Configuraciones
            </CardTitle>
            <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
              Opciones de configuración
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-700 dark:text-gray-300">
              Contenido de configuración
            </p>
          </CardContent>
          <CardFooter className="p-4">
            <p className="text-gray-500 dark:text-gray-400">
              Footer de configuraciones
            </p>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
