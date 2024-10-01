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
      icon: <List size={35} color="white" />,
    },
    {
      title: "Respeto",
      description:
        "En el colegio fomentamos el respeto mutuo entre estudiantes, profesores y el personal.",
      icon: <HeartHandshake size={35} color="white" />,
    },
    {
      title: "Trabajo en equipo",
      description:
        "Los estudiantes aprenden la importancia de colaborar con sus compañeros para alcanzar metas comunes.",
      icon: <Users size={35} color="white" />,
    },
    {
      title: "Esfuerzo",
      description:
        "Los estudiantes se esfuerzan constantemente por mejorar su desempeño académico.",
      icon: <GraduationCap size={35} color="white" />,
    },
    {
      title: "Solidaridad",
      description:
        "Los estudiantes aprenden a ser solidarios con los demás y a ayudar a quienes más lo necesitan.",
      icon: <Handshake size={35} color="white" />,
    },
    {
      title: "Honestidad",
      description:
        "Los estudiantes aprenden la importancia de ser honestos y de actuar con integridad en todo momento.",
      icon: <LockOpen size={35} color="white" />,
    },
  ];

  const isCentered = values.length % 4 === 2; // Para centrar si hay 2 valores sobrantes

  return (
    <div className="w-full mt-5 mb-5 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl text-[#0ced41] font-medium dark:text-[#0ced41] mb-6">
        Valores Institucionales
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {values.map(({ title, description, icon }, index) => (
          <div
            key={index}
            className={`bg-[#fffbe6] dark:bg-gray-800 rounded-lg px-4 py-4 w-full shadow-lg shadow-lime-300/80 dark:shadow-none ${
              isCentered && index >= values.length - 2
                ? index === values.length - 2
                  ? "lg:col-start-2"
                  : "lg:col-start-3"
                : ""
            }`}>
            <div className="bg-[#019e1b7a] dark:bg-gray-700 w-fit p-3 rounded-full flex items-center justify-center mb-3">
              {icon}
            </div>
            <h3 className="text-xl text-lime-600 font-semibold dark:text-lime-400 mb-2">
              {title}
            </h3>
            <p className="text-lime-600/70 font-medium dark:text-lime-500 flex-grow">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstitutionalValues;
