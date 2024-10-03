import { forgotPasswordAction } from "@/src/app/actions";
import { FormMessage, Message } from "@/src/components/form-message";
import { SubmitButton } from "@/src/components/submit-button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import Link from "next/link";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Olvide la contraseña | Colegio Los Alpes",
  description: "Pagina de olvido de contraseña del colegio los alpes",
};

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  return (
    <>
      <form className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto justify-center">
        <div>
          <h1 className="text-2xl font-medium">Restablecer contraseña</h1>
          <p className="text-sm text-secondary-foreground">
            ¿Ya tienes una cuenta?{" "}
            <Link className="text-primary underline" href="/sign-in">
              Logearse
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Correo</Label>
          <Input name="email" placeholder="you@example.com" required />
          <SubmitButton formAction={forgotPasswordAction}>
            Restablecer contraseña
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
