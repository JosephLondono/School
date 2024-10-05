"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { Badge } from "@/src/components/ui/badge";
import { type Event } from "@/types/TableDataBases";
import {
  eventContactEdit,
  eventContactDelete,
  eventContactCreate,
} from "@/src/app/actions";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Separator } from "../../ui/separator";

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
import { Label } from "../../ui/label";
import { FormMessage, Message } from "@/src/components/form-message";
import { Button } from "../../ui/button";

import { toast } from "@pheralb/toast";

const DataEvents = ({
  searchParams,
  events,
  error,
}: {
  events: Event[] | null;
  error: any;
  searchParams: Message & { success?: string };
}) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null); // referencia al formulario

  const [filterText, setFilterText] = useState("");
  const [submiting, setSubmiting] = useState(false);

  const filteredEvents = useMemo(() => {
    if (!events) return [];
    return events.filter((event) => {
      const searchText = filterText.toLowerCase();
      return (
        event.title.toLowerCase().includes(searchText) ||
        event.description.toLowerCase().includes(searchText) ||
        event.date.toLowerCase().includes(searchText)
      );
    });
  }, [events, filterText]);

  useEffect(() => {
    setSubmiting(false);
    if (searchParams.success == "Evento Eliminado correctamente") {
      toast.success({ text: "Evento eliminado correctamente" });
      router.push("/dashboard/events");
    }
    if (searchParams.success == "Evento creado correctamente") {
      toast.success({ text: "Evento creado correctamente" });
      if (formRef.current) {
        formRef.current.reset(); // reinicia el formulario después de crear el evento
      }
    }
  }, [searchParams]);

  const handleDialogOpen = () => {
    router.push("/dashboard/events");
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <div className="flex my-2 gap-3">
        <input
          type="text"
          placeholder="Filtrar por titulo, descripcion o fecha..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full px-2 py-0 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <Dialog onOpenChange={handleDialogOpen}>
          <DialogTrigger className="w-fit h-full px-2 py-0 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center">
            Agregar evento
            <CirclePlus size={17} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar evento</DialogTitle>
              <DialogDescription>
                Aquí puedes agregar un nuevo evento.
                <Separator className="dark:bg-green-300 bg-green-700 w-[75%] my-3 mx-auto" />
                <form
                  className="space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm"
                  action={eventContactCreate}
                  ref={formRef} // referencia del formulario
                >
                  <div>
                    <Label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Título
                    </Label>
                    <div className="relative">
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="w-full px-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Descripción
                    </Label>
                    <div className="relative">
                      <textarea
                        id="description"
                        name="description"
                        className="w-full px-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none max-h-32 min-h-20"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="date"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Fecha
                    </Label>
                    <div className="relative">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className="w-full px-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      className="h-5 w-5 text-green-600 dark:text-green-400 dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:ring-2 rounded-md checked:bg-green-600 dark:checked:bg-green-500"
                    />
                    <Label
                      htmlFor="featured"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Importante
                    </Label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-2 rounded-md mt-3 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    onClick={() => {
                      setSubmiting(true);
                    }}>
                    {submiting ? "Enviando..." : "Agregar evento"}
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
            Lista de todos los eventos.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px] bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                Titulo
              </TableHead>
              <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                Descripción
              </TableHead>
              <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                Fecha
              </TableHead>
              <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300 text-center">
                Importante
              </TableHead>
              <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300 text-center">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEvents.map(
              ({ id, title, date, description, featured }) => (
                <TableRow
                  key={id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <TableCell className="font-medium dark:text-gray-300 w-[20ch]">
                    {title}
                  </TableCell>
                  <TableCell className="text-blue-600 dark:text-green-400 max-w-[30ch]">
                    {description}
                  </TableCell>
                  <TableCell className="dark:text-gray-300 w-[14ch]">
                    {date}
                  </TableCell>
                  <TableCell className="max-w-[40ch] dark:text-gray-300 text-center">
                    {featured ? (
                      <Badge className="bg-green-500">Importante</Badge>
                    ) : (
                      <Badge className="bg-gray-500 dark:bg-slate-300">
                        Normal
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="dark:text-gray-300 text-center">
                    <section className="flex gap-3 justify-center">
                      <Dialog onOpenChange={handleDialogOpen}>
                        <DialogTrigger>
                          <Pencil size={15} />
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar evento</DialogTitle>
                            <DialogDescription>
                              Puedes modificar este evento.
                              <Separator className="dark:bg-green-300 bg-green-700 w-[75%] my-3 mx-auto" />
                              <form
                                className="space-y-6 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm"
                                action={eventContactEdit}>
                                <input hidden name="id" value={id} readOnly />
                                <div>
                                  <Label
                                    htmlFor="title"
                                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Título
                                  </Label>
                                  <div className="relative">
                                    <input
                                      type="text"
                                      id="title"
                                      name="title"
                                      defaultValue={title}
                                      className="w-full px-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Descripción
                                  </Label>
                                  <div className="relative">
                                    <textarea
                                      id="description"
                                      name="description"
                                      defaultValue={description}
                                      className="w-full px-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none max-h-32 min-h-20"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <Label
                                    htmlFor="date"
                                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Fecha
                                  </Label>
                                  <div className="relative">
                                    <input
                                      type="date"
                                      id="date"
                                      name="date"
                                      defaultValue={date}
                                      className="w-full px-4 p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    />
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <input
                                    type="checkbox"
                                    id="featured"
                                    name="featured"
                                    defaultChecked={featured}
                                    className="h-5 w-5 text-green-600 dark:text-green-400 dark:bg-gray-700 dark:border-gray-600 focus:ring-green-500 focus:ring-2 rounded-md checked:bg-green-600 dark:checked:bg-green-500"
                                  />
                                  <Label
                                    htmlFor="featured"
                                    className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Importante
                                  </Label>
                                </div>
                                <button
                                  type="submit"
                                  className="w-full bg-green-500 text-white p-2 rounded-md mt-3 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                  onClick={() => {
                                    setSubmiting(true);
                                  }}>
                                  {submiting
                                    ? "Guardando..."
                                    : "Guardar evento"}
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
                            <DialogTitle>Eliminar evento</DialogTitle>
                            <DialogDescription>
                              ¿Estás seguro de que deseas eliminar este evento?
                              Esta acción no se puede deshacer.
                              <div className="flex justify-end gap-2 mt-4">
                                <DialogClose asChild>
                                  <Button
                                    variant="secondary"
                                    className="bg-gray-300 dark:bg-gray-700">
                                    Cancelar
                                  </Button>
                                </DialogClose>
                                <form action={eventContactDelete}>
                                  <input hidden name="id" value={id} readOnly />
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    type="submit"
                                    className="h-full"
                                    onClick={() => setSubmiting(true)}>
                                    {submiting
                                      ? "Eliminando..."
                                      : "Eliminar evento"}
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

export default DataEvents;
