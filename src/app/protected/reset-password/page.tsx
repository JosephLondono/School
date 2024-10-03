import { resetPasswordAction } from "@/src/app/actions";
import { FormMessage, Message } from "@/src/components/form-message";
import { SubmitButton } from "@/src/components/submit-button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

import { createClient } from "@/src/utils/supabase/server";
import { redirect } from "next/navigation";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Restablecer contraseña | Colegio Los Alpes",
  description: "Pagina de restablecer contraseña del colegio los alpes",
};

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }
  return (
    <form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
      <h1 className="text-2xl font-medium">Restablecer Contraseña</h1>
      <p className="text-sm text-foreground/60">
        Por favor escribe tu nueva contraseña.
      </p>
      <Label htmlFor="password">Nueva Contraseña</Label>
      <Input
        type="password"
        name="password"
        placeholder="New password"
        required
      />
      <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
      />
      <SubmitButton formAction={resetPasswordAction}>
        Restablecer Contraseña
      </SubmitButton>
      <FormMessage message={searchParams} />
    </form>
  );
}
