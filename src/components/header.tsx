import Link from "next/link";
import React from "react";
import HeaderAuth from "@/src/components/header-auth";
import Image from "next/image";
import { ThemeSwitcher } from "./theme-switcher";

export default function Header() {
  return (
    <header>
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-semibold">
            <Link
              href={"/"}
              className="flex items-center gap-5 hover:underline hover:underline-offset-4 text-lg">
              <Image
                src="/logoSchool.png"
                width={80}
                height={80}
                alt="Logo Colegio Los Alpes"
                className="aspect-square object-contain"
              />
              Colegio Los Alpes
            </Link>
          </div>
          <div className="flex items-center gap-5">
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
            |
            <ThemeSwitcher />
            |
            <HeaderAuth />
          </div>
        </div>
      </nav>
    </header>
  );
}
