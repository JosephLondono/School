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
        <TooltipContent className="bg-gray-800 text-white text-sm p-2 rounded-md max-w-xs z-10">
          <p>{eventInfo.event.extendedProps.description}</p>
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <div className="w-4/5 mt-10">
      <style jsx global>{`
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
          background-color: #e0e0e0;
          color: #333;
        }
        .event-bullet {
          margin-right: 4px;
          color: limegreen;
          font-size: 1.4rem;
        }
        .event-title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 600;
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
      />
    </div>
  );
}
