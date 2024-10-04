"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";
import { type Event } from "@/types/TableDataBases";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/src/components/ui/tooltip";
import { Maximize2 } from "lucide-react";

export default function CalendarPage({ events }: { events: Event[] }) {
  const renderEventContent = (eventInfo: any) => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="event-item">
            <span className="event-title">{eventInfo.event.title}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-gray-200 border border-gray-500 dark:bg-gray-800 text-black dark:text-white text-sm p-2 rounded-md max-w-xs z-[99999999999]">
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
        .event-item,
        .fc-more-link {
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
        .fc-more-link {
          cursor: pointer;
          display: block;
          text-align: center;
          border-radius: 4px;
          background-color: #16a34a;
          color: #ffffff;
        }
        .fc-more-link:hover {
          background-color: white;
          color: #16a34a;
        }
        .fc .fc-daygrid-more-link:hover {
          background-color: #16a34a;
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
        .dark .fc-more-link {
          color: rgb(209, 250, 229);
        }
      `}</style>
      <FullCalendar
        locale={esLocale}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={events.map((event) => ({ ...event, id: event.id.toString() }))}
        eventContent={renderEventContent}
        eventDisplay="block"
        eventBackgroundColor="#16a34a"
        eventBorderColor="#16a34a"
        eventTextColor="#ffffff"
        dayMaxEvents={3}
        moreLinkContent={
          <p className="cursor-pointer px-2 bg-[#dcfce7] text-[#166534] text-[0.8rem] font-semibold rounded dark:bg-[#065f46] dark:text-textEvent h-[20px] flex items-center justify-center :hover:bg-[#16a34a] dark:hover:bg-[#16a34a] gap-1">
            Ver más <Maximize2 size={11} />
          </p>
        }
        height="auto"
      />
    </div>
  );
}
