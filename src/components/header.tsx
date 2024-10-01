import Link from "next/link";
import HeaderAuth from "@/src/components/header-auth";
import HeaderAuthMobile from "@/src/components/header-auth-mobile";

import Image from "next/image";
import { ThemeSwitcher, ThemeSwitcherWithText } from "./theme-switcher";
import { Menu } from "lucide-react";

import { Separator } from "./ui/separator";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";

export default function Header() {
  return (
    <header>
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          {/* Logo */}
          <div className="flex gap-5 items-center font-semibold">
            <Link
              href={"/"}
              className="flex items-center gap-5 hover:underline hover:underline-offset-4 text-lg">
              <Image
                src="/logoSchool.png"
                width={70}
                height={70}
                alt="Logo Colegio Los Alpes"
                className="aspect-square object-contain"
              />
              Colegio Los Alpes
            </Link>
          </div>

          {/* Menú en pantallas grandes */}
          <div className="hidden md:items-center gap-5 md:flex">
            <Link
              href={"/"}
              className="hover:underline hover:underline-offset-4">
              Inicio
            </Link>
            <Link
              href={"/contact"}
              className="hover:underline hover:underline-offset-4">
              Contacto
            </Link>
            <Link
              href={"/calendar"}
              className="hover:underline hover:underline-offset-4">
              Calendario
            </Link>
            <Separator orientation="vertical" className="h-[20px]" />
            <ThemeSwitcher />
            <Separator orientation="vertical" className="h-[20px]" />
            <HeaderAuth />
          </div>

          {/* Botón de menú en pantallas pequeñas */}
          <div className="items-center gap-5 flex md:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu size={25} />
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Explorar</SheetTitle>
                  <SheetDescription>
                    <ol>
                      <li>
                        <Link
                          className="hover:underline hover:underline-offset-4"
                          href={"/"}>
                          Inicio
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="hover:underline hover:underline-offset-4"
                          href={"/contact"}>
                          Contacto
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="hover:underline hover:underline-offset-4"
                          href={"/calendar"}>
                          Calendario
                        </Link>
                      </li>
                    </ol>
                  </SheetDescription>
                </SheetHeader>
                <Separator orientation="horizontal" className="my-3" />
                <SheetHeader>
                  <SheetTitle>Cuenta</SheetTitle>
                  <SheetDescription>
                    <HeaderAuthMobile />
                  </SheetDescription>
                </SheetHeader>
                <Separator orientation="horizontal" className="my-3" />
                <SheetHeader>
                  <SheetTitle>Tema</SheetTitle>
                  <SheetDescription>
                    <ThemeSwitcherWithText />
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
