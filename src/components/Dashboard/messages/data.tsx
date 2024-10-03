"use client";
import React, { useState, useMemo } from "react";
import { type Contact } from "@/types/TableDataBases";

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

const DataMessage = ({
  contacts,
  error,
}: {
  contacts: Contact[] | null;
  error: any;
}) => {
  const [filterText, setFilterText] = useState("");

  const filteredContacts = useMemo(() => {
    if (!contacts) return [];
    return contacts.filter((contact) => {
      const searchText = filterText.toLowerCase();
      return (
        contact.name.toLowerCase().includes(searchText) ||
        contact.email.toLowerCase().includes(searchText) ||
        contact.subject.toLowerCase().includes(searchText) ||
        contact.created_at.toLowerCase().includes(searchText)
      );
    });
  }, [contacts, filterText]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <input
          type="text"
          placeholder="Filtrar por nombre, correo, asunto o fecha..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Separator className="dark:bg-green-300 bg-green-700 w-[90%] mb-3" />
            Lista de todos los mensajes.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px] bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                Fecha
              </TableHead>
              <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                Nombre
              </TableHead>
              <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                Correo
              </TableHead>
              <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                Asunto
              </TableHead>
              <TableHead className="bg-gray-100 dark:bg-gray-700 dark:text-green-300">
                Mensaje
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map(
              ({ id, created_at, name, email, subject, message }) => (
                <TableRow
                  key={id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <TableCell className="font-medium dark:text-gray-300">
                    {created_at}
                  </TableCell>
                  <TableCell className="dark:text-gray-300">{name}</TableCell>
                  <TableCell className="text-blue-600 dark:text-green-400">
                    {email}
                  </TableCell>
                  <TableCell className="dark:text-gray-300">
                    {subject}
                  </TableCell>
                  <TableCell className="max-w-[40ch] dark:text-gray-300">
                    {message}
                  </TableCell>
                </TableRow>
              )
            )}
            {filteredContacts.length === 0 && !error && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center dark:text-gray-300">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
            {error && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-red-500 dark:text-red-400">
                  Ha ocurrido un error.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataMessage;
