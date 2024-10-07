import { redirect } from "next/navigation";
import { createClient } from "@/src/utils/supabase/server";
import { Course } from "@/types/TableDataBases";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { ChevronsRight } from "lucide-react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Cursos Dashboard | Colegio Los Alpes",
  description: "Pagina de cursos del colegio los alpes",
};

const degreeOrder = ["Sexto", "Septimo", "Octavo", "Noveno", "Decimo", "Once"];

const PageCourses = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: courses, error } = await supabase
    .from("courses")
    .select(
      `id,
      name,
      degree_id (
        id,
        name
      ),
      teacher_id (
        name
    )`
    )
    .order("name", {
      ascending: true,
    });

  if (error) {
    console.error("Error fetching courses:", error);
    return <div>Error loading courses</div>;
  }

  // Ensure courses is of type Course[]
  const typedCourses: Course[] = courses as unknown as Course[];

  // Group courses by degree name
  const coursesByDegree = typedCourses.reduce(
    (acc, course) => {
      const degreeName = course.degree_id.name;
      if (!acc[degreeName]) {
        acc[degreeName] = [];
      }
      acc[degreeName].push(course);
      return acc;
    },
    {} as Record<string, Course[]>
  );

  // Sort the degrees based on the predefined order
  const sortedDegrees = Object.keys(coursesByDegree).sort(
    (a, b) => degreeOrder.indexOf(a) - degreeOrder.indexOf(b)
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-green-400">
        Cursos
      </h1>
      <Accordion type="single" collapsible className="w-4/5 mx-auto">
        {sortedDegrees.map((degreeName, index) => (
          <AccordionItem key={degreeName} value={`item-${index + 1}`}>
            <AccordionTrigger>{degreeName}</AccordionTrigger>
            <AccordionContent>
              <ul className="pl-6">
                {coursesByDegree[degreeName].map((course) => (
                  <li
                    key={course.id}
                    className="flex gap-1 justify-between text-base">
                    <div className="flex items-center gap-2">
                      <ChevronsRight />
                      {course.name}
                    </div>
                    <div className="">
                      <span className="font-semibold">Profesor: </span>
                      <span className="text-sm">{course.teacher_id.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PageCourses;
