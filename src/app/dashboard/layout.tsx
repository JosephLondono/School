"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PiBooksLight,
  PiChalkboardTeacherLight,
  PiStar,
  PiStudent,
} from "react-icons/pi";
import { IoHomeOutline } from "react-icons/io5";
import { FaCog } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { IoIosCalendar } from "react-icons/io";

import { Separator } from "@/src/components/ui/separator";
import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/src/components/theme-switcher";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sizeIcon = 20;
  const menuItems = [
    {
      label: "Inicio",
      icon: <IoHomeOutline size={sizeIcon} />,
      href: "/dashboard",
    },
    {
      label: "Profesores",
      icon: <PiChalkboardTeacherLight size={sizeIcon} />,
      href: "/dashboard/teachers",
    },
    {
      label: "Cursos",
      icon: <PiBooksLight size={sizeIcon} />,
      href: "/dashboard/courses",
    },
    {
      label: "Calificaciones",
      icon: <PiStar size={sizeIcon} />,
      href: "/dashboard/grades",
    },
    // {
    //   label: "Asistencias",
    //   icon: <IoIosCalendar size={sizeIcon} />,
    //   href: "/dashboard/attendances",
    // },
    {
      label: "Mensajes",
      icon: <FaRegMessage size={sizeIcon} />,
      href: "/dashboard/messages",
    },
  ];
  const pathName = usePathname();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <main className="flex h-screen bg-green-100 dark:bg-green-900">
      {/* Sidebar */}
      <aside
        className={`
        min-w-[256px] fixed md:static inset-y-0 left-0 z-10
        w-64 md:w-64 flex flex-col items-center h-screen
        bg-green-200 dark:bg-green-800
        transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 ease-in-out
      `}>
        {/* Botón de toggle del sidebar */}
        <button
          className="md:hidden absolute top-0 right-0 z-20 text-black p-1 rounded-md"
          onClick={toggleSidebar}>
          <RiCloseLine size={24} />
        </button>

        <div className="my-5 flex flex-col justify-center items-center">
          <h1 className="text-2xl text-green-900 dark:text-green-100">
            Panel de control
          </h1>
          <div className="w-full flex flex-col items-center mt-2">
            <Image
              src="/logoSchool.png"
              alt="logo"
              width={100}
              height={100}
              className="aspect-[3/2]"
              priority={true}
            />
            <span className="text-lg text-green-900 dark:text-green-100">
              Colegio Los Alpes
            </span>
          </div>
        </div>
        <Separator className="bg-green-700 dark:bg-green-300 w-[50%]" />
        <nav className="w-full mt-2 overflow-y-auto flex-grow">
          <ul>
            {menuItems.map(({ label, href, icon }) => (
              <li
                key={label}
                className={`w-full py-3 px-4 text-lg ${
                  pathName === href
                    ? "bg-green-500 dark:bg-green-700 text-white"
                    : "bg-green-300 dark:bg-green-600 text-green-900 dark:text-green-100"
                }`}>
                <Link
                  href={href}
                  className="flex items-center gap-2"
                  onClick={() => setIsSidebarOpen(false)}>
                  <span>{label}</span>
                  {icon}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto mb-4 w-full">
          <Separator className="bg-green-700 dark:bg-green-300 w-[50%] mb-2 mx-auto" />
          <div className="w-full flex justify-center items-center gap-4">
            <ThemeSwitcher />
            <FaCog
              size={sizeIcon}
              className="text-green-900 dark:text-green-100"
            />
          </div>
        </div>
      </aside>

      {/* Botón de menú para móviles (fuera del sidebar) */}
      <button
        className={`md:hidden fixed top-4 left-4 z-20 bg-green-500 text-white p-2 rounded-md ${isSidebarOpen ? "hidden" : "block"}`}
        onClick={toggleSidebar}>
        {!isSidebarOpen ? <RiMenu3Line size={24} /> : null}
      </button>

      {/* Contenido principal */}
      <section className="flex-grow bg-green-50 dark:bg-green-900 h-screen overflow-y-auto text-green-900 dark:text-green-100 p-4 md:p-8">
        {children}
      </section>
    </main>
  );
}
