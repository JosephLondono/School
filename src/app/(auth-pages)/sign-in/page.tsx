import { signInAction } from "@/src/app/actions";
import { FormMessage, Message } from "@/src/components/form-message";
import { SubmitButton } from "@/src/components/submit-button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import Link from "next/link";

import { createClient } from "@/src/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Login({
  searchParams,
}: {
  searchParams: Message;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/protected");
  }
  return (
    <form className="flex-1 flex flex-col min-w-64 mx-auto justify-center">
      <h1 className="text-2xl font-medium">Loguearse</h1>
      <p className="text-sm text-foreground">
        ¿No tienes cuenta?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Registrate
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Correo</Label>
        <Input name="email" placeholder="you@example.com" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Contraseña</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password">
            ¿Contraseña olvidada?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        <SubmitButton pendingText="Signing In..." formAction={signInAction}>
          Loguearse
        </SubmitButton>
        <FormMessage message={searchParams} />
      </div>
    </form>
  );
}
