import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  Smartphone,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  const LinksFast = [
    {
      title: "Sobre Nosotros",
      href: "/",
    },
    {
      title: "Contactanos",
      href: "/contact",
    },
    {
      title: "Calendario",
      href: "/calendar",
    },
    {
      title: "Ingresar",
      href: "/sign-in",
    },
    {
      title: "Registrarse",
      href: "/sign-up",
    },
  ];
  const Information = {
    street: "Calle 123",
    neighborhood: "Avenida 123",
    city: "Ibague - Tolima",
    contact: {
      email: "colegiolosalpes@losalpes.edu.co",
      Landline: "(608) 265123123",
      Phone: "+57 3213213213",
    },
  };
  const SocialMedia = [
    {
      title: "Facebook",
      href: "https://www.facebook.com",
      icon: <Facebook />,
    },
    {
      title: "Instagram",
      href: "https://www.instagram.com",
      icon: <Instagram />,
    },
    {
      title: "Twitter",
      href: "https://www.twitter.com",
      icon: <Twitter />,
    },
    {
      title: "Youtube",
      href: "https://www.youtube.com",
      icon: <Youtube />,
    },
  ];
  return (
    <footer className="w-full text-xs gap-8 py-12 bg-[#019e1bee] mt-4 text-white">
      <div className="w-4/5 mx-auto grid grid-cols-3 justify-center justify-items-center">
        <div>
          <span className="text-2xl relative">
            Enlaces Rapidos
            <hr className="w-full absolute border-t-[3px]" />
            <hr className="w-[50px] absolute border-t-[3px] border-[#00fd09] z-20 right-0" />
          </span>
          <ul className="mt-4">
            {LinksFast.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.href}
                  className="text-base text-white/90 hover:underline hover:underline-offset-2">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="text-2xl relative">
            Informacion
            <hr className="w-full absolute border-t-[3px]" />
            <hr className="w-[50px] absolute border-t-[3px] border-[#00fd09] z-20 right-0" />
          </span>
          <ul className="mt-4 flex flex-col gap-1">
            <li className="text-base text-white/90">
              <p className="h-[19px]">{Information.street}</p>
            </li>
            <li className="text-base text-white/90">
              <p className="h-[19px]">{Information.neighborhood}</p>
            </li>
            <li className="text-base text-white/90">{Information.city}</li>
          </ul>
          <span className="block mt-4 text-xl">Contactos</span>
          <ul className="mt-3 flex flex-col gap-1">
            <li className="flex gap-2 text-base items-center text-white/90">
              <span>
                <Mail size={19} />
              </span>
              <p className="h-[19px]">{Information.contact.email}</p>
            </li>
            <li className="flex gap-2 text-base items-center text-white/90">
              <span>
                <Smartphone size={19} />
              </span>
              <p className="h-[19px]">{Information.contact.Phone}</p>
            </li>
            <li className="flex gap-2 text-base items-center text-white/90">
              <span>
                <Phone size={19} />
              </span>
              <p className="h-[19px]">{Information.contact.Landline}</p>
            </li>
          </ul>
        </div>
        <div>
          <span className="text-2xl relative">
            Redes Sociales
            <hr className="w-full absolute border-t-[3px]" />
            <hr className="w-[50px] absolute border-t-[3px] border-[#00fd09] z-20 right-0" />
          </span>
          <ul className="mt-4 flex gap-4 justify-center">
            {SocialMedia.map((social) => (
              <li key={social.title}>
                <Link href={social.href} target="_blank">
                  <span className="text-2xl">
                    {social.icon}
                    <span className="sr-only">{social.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
