import {
  GraduationCap,
  Handshake,
  HeartHandshake,
  List,
  LockOpen,
  Users,
} from "lucide-react";

interface Value {
  title: string;
  description: string;
  icon: JSX.Element;
}

export const InstitutionalValues = () => {
  const values: Value[] = [
    {
      title: "Responsabilidad",
      description:
        "Los estudiantes asumen el compromiso de cumplir con sus deberes académicos y personales.",
      icon: <List size={35} />,
    },
    {
      title: "Respeto",
      description:
        "En el colegio fomentamos el respeto mutuo entre estudiantes, profesores y el personal.",
      icon: <HeartHandshake size={35} />,
    },
    {
      title: "Trabajo en equipo",
      description:
        "Los estudiantes aprenden la importancia de colaborar con sus compañeros para alcanzar metas comunes.",
      icon: <Users size={35} />,
    },
    {
      title: "Esfuerzo",
      description:
        "Los estudiantes se esfuerzan constantemente por mejorar su desempeño académico.",
      icon: <GraduationCap size={35} />,
    },
    {
      title: "Solidaridad",
      description:
        "Los estudiantes aprenden a ser solidarios con los demás y a ayudar a quienes más lo necesitan.",
      icon: <Handshake size={35} />,
    },
    {
      title: "Honestidad",
      description:
        "Los estudiantes aprenden la importancia de ser honestos y de actuar con integridad en todo momento.",
      icon: <LockOpen size={35} />,
    },
  ];

  const isCentered = values.length % 4 === 2;

  return (
    <div className="w-full mt-5 mb-5">
      <h2 className="text-3xl text-[#0ced41] font-medium">
        Valores Institucionales
      </h2>

      <article className="grid grid-cols-4 mt-7 gap-x-32 gap-y-7">
        {values.map(({ title, description, icon }, index) => (
          <section
            key={index}
            className={`bg-[#fffbe6] rounded-lg px-4 py-4 w-64 shadow-lg shadow-lime-300/80 ${
              isCentered && index >= values.length - 2
                ? index === values.length - 2
                  ? "col-start-2"
                  : "col-start-3"
                : ""
            }`}>
            <div className="bg-[#019e1b7a] w-fit p-3 rounded-full">{icon}</div>
            <div className="mt-2">
              <p className="text-xl text-lime-600 font-semibold">{title}</p>
            </div>
            <div>
              <p className="text-lime-600/70 font-medium">{description}</p>
            </div>
          </section>
        ))}
      </article>
    </div>
  );
};
