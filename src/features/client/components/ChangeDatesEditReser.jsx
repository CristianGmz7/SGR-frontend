import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import esMx from "dayjs/locale/es-mx";
import { useState } from "react";

export const ChangeDatesEditReser = ({ reservation }) => {

  //se extraen las 6 horas para que coincidan con las que mandó el usuario (en el backend siempre llegaran a cuadrar porque se mandaran con el pequeño desfase)
  const fixedStartDate = dayjs(reservation.reservationStartDate).subtract(6, 'hour');
  const fixedFinishDate = dayjs(reservation.reservationFinishDate).subtract(6, 'hour');

  //se usa la librería dayjs por la variedad de formatos para representar fechas y horas
  const [startDate, setStartDate] = useState(fixedStartDate);
  const [finishDate, setFinishDate] = useState(fixedFinishDate);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={esMx}>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          {/* Inicio Campo de check-in */}
          <div className="flex flex-col gap-2">
            <label htmlFor="check-in" className="text-sm font-medium">
              Nueva fecha de inicio
            </label>
            <DatePicker
              value={startDate}
              // cuando se cambie la fecha se setean en el estado de fecha inicial
              onChange={(newDate) => setStartDate(newDate)}
              // se le coloca una fecha minima y un formato a mostrar
              minDate={dayjs()}
              format="DD/MM/YYYY"
            />
          </div>
          {/* Fin Campo de check-in */}
          {/* Inicio Campo de check-out */}
          <div className="flex flex-col gap-2">
            <label htmlFor="check-out" className="text-sm font-medium">
              Nueva fecha de fin
            </label>
            <DatePicker
              format="DD/MM/YYYY"
              value={finishDate}
              minDate={startDate}
              onChange={(newDate) => setFinishDate(newDate)}
            />
          </div>
          {/* Fin Campo de check-out */}
        </div>
      </LocalizationProvider>
    </>
  );
};
