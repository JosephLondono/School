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
    <div className="flex items-center gap-4">
      <p className="font-semibold">{user.email?.split("@")[0]}</p>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CircleUser />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/dashboard" className="block w-full">
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0">
            <form action={signOutAction} className="w-full">
              <Button
                type="submit"
                variant="ghost"
                className="w-full text-left py-1 px-2 h-fit block">
                Salir
              </Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <p className="font-semibold">Invitado</p>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CircleUser />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/sign-in" className="block w-full">
              Loguearse
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/sign-up" className="block w-full">
              Registrarse
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    // <div className="flex gap-2">
    //   <Button asChild size="sm" variant={"outline"}>
    //     <Link href="/sign-in">Loguearse</Link>
    //   </Button>
    //   <Button asChild size="sm" variant={"default"}>
    //     <Link href="/sign-up">Registrarse</Link>
    //   </Button>
    // </div>
  );
}
