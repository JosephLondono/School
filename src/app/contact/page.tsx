import LayoutPrincipal from "@/src/components/home/Layout";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { SubmitButton } from "@/src/components/submit-button";
import { contactAction } from "@/src/app/actions";
import { FormMessage, Message } from "@/src/components/form-message";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Pagina de contacto | Colegio Los Alpes",
  description: "Pagina de contacto del colegio los alpes",
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <LayoutPrincipal>
      <div className="flex flex-col items-center py-12 px-6">
        <h1 className="text-3xl font-bold mb-4">¿Quieres contactarnos?</h1>
        <p className="text-center mb-8 text-gray-600">
          Si tienes alguna duda o inquietud, completa el siguiente formulario y
          nos pondremos en contacto contigo.
        </p>
        <form className="w-full max-w-lg">
          <div className="flex flex-col gap-4 mb-6">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name="name"
              placeholder="Tu nombre"
              required
              autoComplete="off"
            />

            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              placeholder="you@example.com"
              required
            />

            <Label htmlFor="subject">Asunto</Label>
            <Input
              id="subject"
              name="subject"
              placeholder="Motivo de tu mensaje"
              autoComplete="off"
              required
            />

            <Label htmlFor="message">Mensaje</Label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="border rounded-md p-2 max-h-32 h-20"
              placeholder="Escribe tu mensaje aquí"
              required></textarea>
          </div>
          <SubmitButton pendingText="Enviando..." formAction={contactAction}>
            Enviar Mensaje
          </SubmitButton>
          {searchParams && (
            <div className="mt-3">
              <FormMessage message={searchParams} />
            </div>
          )}
        </form>
      </div>
    </LayoutPrincipal>
  );
}
