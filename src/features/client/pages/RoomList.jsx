//Aquí se muestran la lista de habitaciones disponibles para un hotel en especifico
//existen funcionalidades de agregar habitaciones a la reserva, filtros de fecha, botón para ver reserva

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, Pagination } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRoomList } from "../hooks/useRoomList";
import esMx from "dayjs/locale/es-mx";
import CircularProgress from "@mui/material/CircularProgress";
import { useReservation } from "../contexts/reservationContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import RoomCard from "../components/RoomCard";

export const RoomList = () => {
  // el estado "page" almacena el número de pagina
  const [page, setPage] = useState(1);

  const { selectedRooms, toggleRoomSelection, isRoomSelected, setDayInterval } =
    useReservation();

  //Crear variable de estado para las fecha inicial y final
  let sDate = new Date();
  let fDate = new Date(sDate);
  //por default la fecha final sea un dia mayor que la inicial
  fDate.setDate(sDate.getDate() + 1);

  //se usa la librería dayjs por la variedad de formatos para representar fechas y horas
  const [startDate, setStartDate] = useState(dayjs(sDate));
  const [finishDate, setFinishDate] = useState(dayjs(fDate));

  //Almacena las fechas de filtro   ¿?  (convertidas a formato ISO)
  const [filter, setFilter] = useState({
    startDate: null,
    finishDate: null,
  });

  const { hotelId } = useParams();
  // obtiene el id del de la URL hotel usando useParams, esto viene cuando se da click en ver habitaciones en HotelCard
  // de los parámetros que vienen en la URL trae el id del hotel que se seleccionó
  // esto se ve reflejado en routes/ClientRouter
  //<Route path="/roomList/:hotelId" element={<RoomList />} />
  //el valor de /:hotelId el valor de :hotelId se va a sustituir por el que se coloque en la URL

  //se le pasa la info del numero de pagina actual, las fechas de filtro y el id del hotel
  //este devuelve un array en el que se encuentra, el error, loading y la data
  const [{ error, loading, data }] = useRoomList({
    page: page,
    filterStartDate: filter?.startDate,
    filterEndDate: filter?.finishDate,
    hotelId: hotelId,
  });
    //se le pasa la info del numero de pagina actual, las fechas de filtro y el id del hotel
  //este devuelve un array en el que se encuentra, el error, loading y la data

  //si todo funciona bien de la respuesta de useRoomList se extrae:
  //en este caso nuestra data del API se encontraba dentro de otra data, por eso va anidada 
  const rooms = data?.data?.items?.rooms; //Arreglo con datos de habitaciones disponibles
  const hotel = data?.data?.items?.hotel; //objeto con la info del hotel
  const pagination = data?.data;    //información de la pagina

  // Función para manejar la validación y aplicar el filtro de fechas
  const handleFilterClick = () => {
    //verifica que fecha inicio no se mayor que fecha fin
    if (startDate > finishDate) {

      toast.warn("La fecha de inicio no puede ser mayor a la fecha de fin");
      return;
    }

    //si todo sale bien actualiza el intervalo de fechas en el contexto
    setDayInterval(startDate, finishDate);
    //setea el filtro local convierte fechas a formato ISO y almacena el estado de filter
    setFilter({
      startDate: startDate.toISOString(),
      finishDate: finishDate.toISOString(),
    });
  };

  return (
    //LocalizationProvider para configurar el idioma de los DatePickers
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={esMx}>
      <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6">
        {/* Inicio del div que sirve para agrupar */}
        <div className="grid gap-6 md:gap-8">
          {/* Inicio de div información hotel y campos de check-in y check-out*/}
          <div className="flex flex-col gap-4">
            {/* Nombre del hotel */}
            <h2 className="text-2xl font-bold tracking-tight">
              {hotel?.name}{" "}
            </h2>
            {/* Descripción del hotel */}
            <p className="text-muted-foreground">{hotel?.description}</p>

            {/* Inicio Campos de check-in, check-out y botón de filtrar */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              {/* Inicio Campo de check-in */}
              <div className="flex flex-col gap-2">
                <label htmlFor="check-in" className="text-sm font-medium">
                  Fecha inicio
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
                  Fecha Fin
                </label>
                <DatePicker
                  format="DD/MM/YYYY"
                  value={finishDate}
                  minDate={startDate}
                  onChange={(newDate) => setFinishDate(newDate)}
                />
              </div>
              {/* Fin Campo de check-out */}
              {/* Inicio Botón de filtrar */}
              <Button onClick={handleFilterClick} variant="contained">
                Filtrar
              </Button>
              {/* Fin Botón de filtrar */}
            </div>
            {/* Fin Campos de check-in, check-out y botón de filtrar */}
          </div>
          {/* Fin de div información hotel y campos de check-in y check-out*/}


          {/* Inicio de contenedor de habitaciones por paginación */}
          {/* Si la petición del filtro aun esta en curso mostrar carga de la página */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <CircularProgress />
            </div>
          ) : (
            // si no esta cargando mostrar el contenido del listado de las habitaciones
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rooms?.map((room) => (
                <RoomCard key={room.id} 
                  room={room} 
                  //los siguientes dos métodos vienen del context, verifica si la habitación esta agregada o no
                  //y si fue clicqueada o no
                  isRoomSelected={isRoomSelected}
                  toggleRoomSelection={toggleRoomSelection} 
                />
              ))}
            </div>
          )}
          {/* Fin de contenedor de habitaciones por paginación */}


          {/* Inicio Botón implementado cuando se selecciona habitaciones */}
          {/* Este botón solo aparece si hay al menos una habitación seleccionada */}
          {selectedRooms.length > 0 && (
            <div className="mt-8">
              {/* la siguiente vinculación se encuentra dentro del context, por lo que los estados
              aun quedan guardados, como el de fechas, habitaciones seleccionadas */}
              {/* Importante, este botón de Ver Reserva se redirige a ReservationList con la
              URL del hotel, este botón redirige a <Route path="/ReservationList/:hotelId" element={<ReservationList />} />
              sustituyendo :hotelId por el id del hotelId seleccionado*/}
              <Link to={`/ReservationList/${hotelId}`}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    // esto se agrego por si el usuario entra y no le da filtrar, se coloquen
                    //las fechas que viene por defecto
                    setDayInterval(startDate, finishDate);
                  }}
                >
                  Ver Reserva
                </Button>
              </Link>
            </div>
          )}
          {/* Fin Botón implementado cuando se selecciona habitaciones */}
        </div>
        {/* Fin del div que sirve para agrupar */}
        <div className="flex mt-5 justify-center">
          <Pagination
            count={pagination?.totalPages}
            page={pagination?.currentPage}
            onChange={(_event, page) => setPage(page)}
            key={pagination?.currentPage}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
};
