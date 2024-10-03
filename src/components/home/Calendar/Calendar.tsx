"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/src/components/ui/tooltip";

export default function CalendarPage() {
  const events = [
    {
      title: "Futbol 5",
      date: "2024-10-01",
      description: "Torneo Futbol 5 en el coliseo de la institucion",
    },
    {
      title: "Dia de la indenpendencia",
      date: "2024-10-02",
      description: "Celebracion del dia de la independencia",
    },
    {
      title: "Dia de la raza",
      date: "2024-10-01",
      description: "Celebracion del dia de la raza",
    },
    {
      title: "Dia de la madre",
      date: "2024-10-18",
      description: "Celebracion del dia de la madre",
    },
    {
      title: "Dia del maestro",
      date: "2024-10-25",
      description: "Celebracion del dia del maestro",
    },
  ];

  const renderEventContent = (eventInfo: any) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="event-item">
            <span className="event-bullet">•</span>
            <span className="event-title">{eventInfo.event.title}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-green-500 dark:bg-green-100 text-white dark:text-green-800 text-sm p-2 rounded-md max-w-xs z-10">
          <p>{eventInfo.event.extendedProps.description}</p>
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <div className="w-4/5 mt-10">
      <style jsx global>{`
        .fc .fc-daygrid-day-top {
          flex-direction: row;
        }
        .fc .fc-day-other .fc-daygrid-day-top {
          opacity: 0.5;
        }
        .fc .fc-button-primary {
          background-color: #16a34a;
          border-color: #16a34a;
        }
        .fc .fc-button-primary:not(:disabled).fc-button-active,
        .fc .fc-button-primary:not(:disabled):active {
          background-color: #15803d;
          border-color: #15803d;
        }
        .fc-daygrid-event-harness {
          margin-bottom: 2px;
        }
        .event-item {
          display: flex;
          align-items: center;
          font-size: 0.8rem;
          padding: 0px 7px;
          margin: 1px 0;
          border-radius: 4px;
          background-color: #dcfce7;
          color: #166534;
        }
        .event-bullet {
          margin-right: 4px;
          color: #16a34a;
          font-size: 1.4rem;
        }
        .event-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 600;
        }
        .fc .fc-day-today {
          background-color: #bbf7d0 !important;
        }

        /* Estilos para modo oscuro */

        .dark .fc-day-today {
          background-color: rgba(74, 222, 128, 0.2) !important;
        }
        .dark .fc-col-header-cell-cushion,
        .dark .fc-daygrid-day-number {
          color: #ecfdf5;
        }
        .dark .fc-button-primary {
          background-color: #22c55e;
          border-color: #22c55e;
        }
        .dark .fc-button-primary:not(:disabled).fc-button-active,
        .dark .fc-button-primary:not(:disabled):active {
          background-color: #16a34a;
          border-color: #16a34a;
        }
        .dark .event-item {
          background-color: #065f46;
          color: #d1fae5;
        }
        .dark .event-bullet {
          color: #34d399;
        }
        .dark .fc th {
          background-color: #111827;
        }
      `}</style>
      <FullCalendar
        locale={esLocale}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={events}
        eventContent={renderEventContent}
        eventDisplay="block"
        eventBackgroundColor="#16a34a"
        eventBorderColor="#16a34a"
      />
    </div>
  );
}
