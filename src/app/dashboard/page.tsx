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
    <div className="h-full overflow-y-scroll">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Hola, Dashboard</h2>
      <section className="grid-dashboard gap-6">
        <Card className="grid-dashboard-1 bg-white shadow-md rounded-lg">
          <CardHeader className="border-b border-gray-200 p-4">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Mensajes
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Lista de los ultimos mensajes
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 bg-white shadow-sm rounded-lg">
            {messages && (
              <ul className="space-y-3">
                {messages!.map((message) => (
                  <li
                    key={message.id}
                    className="p-3 bg-gray-50 rounded-md border border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {message.name}
                    </p>
                    <p className="text-sm text-gray-500">{message.subject}</p>
                    <p className="mt-1 text-sm text-gray-700">
                      {message.message}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            {error && (
              <p className="text-red-500">Error al cargar los mensajes</p>
            )}
          </CardContent>

          <CardFooter className="p-4">
            <Link
              href="/dashboard/messages"
              className="text-blue-600 hover:underline">
              Ver todos los mensajes
            </Link>
          </CardFooter>
        </Card>

        <Card className="grid-dashboard-2 bg-white shadow-md rounded-lg">
          <CardHeader className="border-b border-gray-200 p-4">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Estadísticas
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Datos recientes
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-700">Contenido de estadísticas</p>
          </CardContent>
          <CardFooter className="p-4">
            <p className="text-gray-500">Footer de estadísticas</p>
          </CardFooter>
        </Card>

        <Card className="grid-dashboard-3 bg-white shadow-md rounded-lg">
          <CardHeader className="border-b border-gray-200 p-4">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Actividades Recientes
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Historial de actividades
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-700">Contenido de actividades recientes</p>
          </CardContent>
          <CardFooter className="p-4">
            <p className="text-gray-500">Footer de actividades</p>
          </CardFooter>
        </Card>

        <Card className="grid-dashboard-4 bg-white shadow-md rounded-lg">
          <CardHeader className="border-b border-gray-200 p-4">
            <CardTitle className="text-lg font-semibold text-gray-700">
              Configuraciones
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Opciones de configuración
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-gray-700">Contenido de configuración</p>
          </CardContent>
          <CardFooter className="p-4">
            <p className="text-gray-500">Footer de configuraciones</p>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}
