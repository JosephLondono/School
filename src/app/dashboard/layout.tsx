"use client";
import Image from "next/image";
import Link from "next/link";
import {
  PiBooksLight,
  PiChalkboardTeacherLight,
  PiStar,
  PiStudent,
} from "react-icons/pi";

import { IoHomeOutline } from "react-icons/io5";
import { FaCalendarCheck, FaCog } from "react-icons/fa";
import { Separator } from "@/src/components/ui/separator";

import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/src/components/theme-switcher";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sizeIcon = 20;
  const menuItems = [
    {
      label: "Inicio",
      icon: <IoHomeOutline size={sizeIcon} />,
      href: "/dashboard",
    },
    {
      label: "Estudiantes",
      icon: <PiStudent size={sizeIcon} />,
      href: "/dashboard/students",
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
    {
      label: "Asistencias",
      icon: <FaCalendarCheck size={sizeIcon} />,
      href: "/dashboard/attendances",
    },
  ];
  const pathName = usePathname();

  return (
    <main className="flex h-screen bg-green-100 dark:bg-green-900">
      <aside className="w-64 flex flex-col items-center h-screen bg-green-200 dark:bg-green-800">
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
        <Separator className="bg-green-700 dark:bg-green-300 w-[90%]" />
        <nav className="w-full mt-2">
          <ul>
            {menuItems.map(({ label, href, icon }) => (
              <li
                key={label}
                className={`w-full py-3 px-4 text-lg ${
                  pathName === href
                    ? "bg-green-500 dark:bg-green-700 text-white"
                    : "bg-green-300 dark:bg-green-600 text-green-900 dark:text-green-100"
                }`}>
                <Link href={href} className="flex items-center gap-2">
                  <span>{label}</span>
                  {icon}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <Separator className="bg-green-700 dark:bg-green-300 w-[90%]" />
          <div className="w-full flex justify-center items-center mt-2">
            <ThemeSwitcher />
            <FaCog size={sizeIcon} />
          </div>
        </div>
      </aside>
      <section className="flex-grow bg-green-50 dark:bg-green-900 h-screen text-green-900 dark:text-green-100">
        {children}
      </section>
    </main>
  );
}
