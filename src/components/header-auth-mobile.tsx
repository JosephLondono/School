import { signOutAction } from "@/src/app/actions";
import { hasEnvVars } from "@/src/utils/supabase/check-env-vars";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/src/utils/supabase/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { CircleUser } from "lucide-react";
import { Separator } from "./ui/separator";

export default async function AuthButton() {
  const {
    data: { user },
  } = await createClient().auth.getUser();
  if (!hasEnvVars) {
    return (
      <>
        <div className="flex items-center gap-4">
          <p className="font-semibold">Invitado | Error</p>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <CircleUser />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/sign-in">Loguearse</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/sign-up">Registrarse</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </>
    );
  }
  return user ? (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <p className="font-semibold">{user.email?.split("@")[0]}</p>
      <Separator orientation="horizontal" className="sm:hidden" />
      <Separator orientation="vertical" className="h-[20px] hidden" />
      <Separator orientation="vertical" className="h-[20px] hidden sm:block" />
      <form action={signOutAction}>
        <Button type="submit" variant="ghost" className="p-0 h-fit">
          Salir
        </Button>
      </form>
    </div>
  ) : (
    // usuarios no logeados
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <p className="font-semibold">Invitado</p>
      <Separator orientation="horizontal" className="sm:hidden" />
      <Separator orientation="vertical" className="h-[20px] hidden" />
      <Separator orientation="vertical" className="h-[20px] hidden sm:block" />
      <Link
        href="/sign-in"
        className="hover:underline hover:underline-offset-4">
        Loguearse
      </Link>
      <Separator orientation="vertical" className="h-[20px] hidden sm:block" />
      <Link
        href="/sign-up"
        className="hover:underline hover:underline-offset-4">
        Registrarse
      </Link>
    </div>
  );
}
