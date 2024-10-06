"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { type Teacher } from "@/types/TableDataBases";
import { teacherCreate, teacherUpdate, teacherDelete } from "@/src/app/actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Separator } from "@/src/components/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import { FormMessage, Message } from "@/src/components/form-message";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@pheralb/toast";
import { Label } from "../../ui/label";

const DataTeachers = ({
  searchParams,
  teachers,
  error,
}: {
  teachers: Teacher[] | null;
  error: any;
  searchParams: Message & { success?: string };
}) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [filterText, setFilterText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const filteredTeachers = useMemo(() => {
    if (!teachers) return [];
    return teachers.filter((teacher) => {
      const searchText = filterText.toLowerCase();
      return (
        teacher.name.toLowerCase().includes(searchText) ||
        teacher.email.toLowerCase().includes(searchText) ||
        teacher.id_document.toString().toLowerCase().includes(searchText) ||
        (teacher.phone && teacher.phone.toLowerCase().includes(searchText)) ||
        (teacher.academic_degree &&
          teacher.academic_degree.toLowerCase().includes(searchText))
      );
    });
  }, [teachers, filterText]);

  useEffect(() => {
    setSubmitting(false);
    if (searchParams.success == "Profesor Eliminado correctamente") {
      toast.success({ text: "Profesor eliminado correctamente" });
      router.push("/dashboard/teachers");
    }
    if (searchParams.success == "Profesor creado correctamente") {
      toast.success({ text: "Profesor creado correctamente" });
      if (formRef.current) {
        formRef.current.reset(); // reinicia el formulario después de crear el evento
      }
    }
  }, [searchParams]);

  const handleDialogOpen = () => {
    router.push("/dashboard/teachers");
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <div className="flex my-2 gap-3 px-3">
        <input
          type="text"
          placeholder="Filtrar por nombre, documento, correo, teléfono o nivel académico..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full px-2 py-0 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <Dialog onOpenChange={handleDialogOpen}>
          <DialogTrigger className="w-fit h-full px-2 py-0 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center">
            Agregar profesor
            <CirclePlus size={17} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar profesor</DialogTitle>
              <DialogDescription>
                Aquí puedes agregar un nuevo profesor.
                <Separator className="dark:bg-green-300 bg-green-700 w-[75%] my-3 mx-auto" />
                <form
                  className="space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm"
                  action={teacherCreate}
                  ref={formRef}>
                  <div>
                    <Label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nombre
                    </Label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="id_document"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      No. Documento
                    </Label>
                    <div className="relative">
                      <input
                        type="text"
                        id="id_document"
                        name="id_document"
                        className="w-full px-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Correo
                    </Label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Teléfono
                    </Label>
                    <div className="">
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="w-full px-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="academic_degree"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Nivel Académico
                    </Label>
                    <div className="">
                      <input
                        type="text"
                        id="academic_degree"
                        name="academic_degree"
                        className="w-full px-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-2 rounded-md mt-3 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    onClick={() => setSubmitting(true)}>
                    {submitting ? "Enviando..." : "Agregar profesor"}
                  </button>
                  <FormMessage message={searchParams} />
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Separator className="dark:bg-green-300 bg-green-700 w-[90%] mb-3" />
            Lista de todos los profesores.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[15ch] bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                Nombre
              </TableHead>
              <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                Documento
              </TableHead>
              <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                Correo
              </TableHead>
              <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                Teléfono
              </TableHead>
              <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                Nivel Académico
              </TableHead>
              <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300 text-center">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.map(
              ({ id, name, email, id_document, phone, academic_degree }) => (
                <TableRow
                  key={id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <TableCell className="font-medium dark:text-gray-300">
                    {name}
                  </TableCell>
                  <TableCell className="dark:text-gray-300">
                    {id_document}
                  </TableCell>
                  <TableCell className="text-blue-600 dark:text-green-400">
                    {email}
                  </TableCell>
                  <TableCell className="dark:text-gray-300">{phone}</TableCell>
                  <TableCell className="max-w-[40ch] dark:text-gray-300">
                    {academic_degree}
                  </TableCell>
                  <TableCell className="dark:text-gray-300 text-center">
                    <section className="flex gap-3 justify-center">
                      <Dialog onOpenChange={handleDialogOpen}>
                        <DialogTrigger>
                          <Pencil size={15} />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar profesor</DialogTitle>
                            <DialogDescription>
                              Puedes modificar este profesor.
                              <Separator className="dark:bg-green-300 bg-green-700 w-[75%] my-3 mx-auto" />
                              <form
                                className="space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm"
                                action={teacherUpdate}>
                                <input
                                  type="text"
                                  name="id"
                                  value={id}
                                  hidden
                                  readOnly
                                />
                                <div>
                                  <Label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Nombre
                                  </Label>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      id="name"
                                      name="name"
                                      className="w-full px-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                      defaultValue={name}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label
                                    htmlFor="id_document"
                                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    No. Documento
                                  </Label>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      id="id_document"
                                      name="id_document"
                                      className="w-full px-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                      defaultValue={id_document}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Correo
                                  </Label>
                                  <div className="relative">
                                    <input
                                      type="email"
                                      id="email"
                                      name="email"
                                      className="w-full px-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                      defaultValue={email}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label
                                    htmlFor="phone"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Teléfono
                                  </Label>
                                  <div className="">
                                    <input
                                      type="text"
                                      id="phone"
                                      name="phone"
                                      className="w-full px-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                      defaultValue={phone}
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label
                                    htmlFor="academic_degree"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Nivel Académico
                                  </Label>
                                  <div className="">
                                    <input
                                      type="text"
                                      id="academic_degree"
                                      name="academic_degree"
                                      className="w-full px-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                      defaultValue={academic_degree}
                                    />
                                  </div>
                                </div>
                                <button
                                  type="submit"
                                  className="w-full bg-green-500 text-white p-2 rounded-md mt-3 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                  onClick={() => setSubmitting(true)}>
                                  {submitting
                                    ? "Guardando..."
                                    : "Guardar profesor"}
                                </button>
                                <FormMessage message={searchParams} />
                              </form>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                      <Dialog onOpenChange={handleDialogOpen}>
                        <DialogTrigger>
                          <Trash2 size={15} />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Eliminar profesor</DialogTitle>
                            <DialogDescription>
                              ¿Estás seguro de que deseas eliminar este
                              profesor? Esta acción no se puede deshacer.
                              <div className="flex justify-end gap-2 mt-4">
                                <DialogClose asChild>
                                  <Button
                                    variant="secondary"
                                    className="bg-gray-300 dark:bg-gray-700">
                                    Cancelar
                                  </Button>
                                </DialogClose>
                                <form action={teacherDelete}>
                                  <input hidden name="id" value={id} readOnly />
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    type="submit"
                                    className="h-full"
                                    onClick={() => setSubmitting(true)}>
                                    {submitting
                                      ? "Eliminando..."
                                      : "Eliminar profesor"}
                                  </Button>
                                </form>
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </section>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTeachers;
