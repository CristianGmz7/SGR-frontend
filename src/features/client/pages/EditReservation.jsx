import { Link } from "react-router-dom";
import { useEditReservation } from "../contexts/reservationEditContext";
import { formatDate } from "../../../shared/utils/format-date";
import { RoomReservationCard } from "../components/RoomReservationCard";
import { AdditioServReservationCard } from "../components/AdditioServReservationCard";
import { ChangeDatesEditReser } from "../components/ChangeDatesEditReser";

export const EditReservation = () => {
  const {
    state: { reservation, action },
  } = useEditReservation();

  const renderActionComponent = (action) => {
    switch (action) {
      case "Change-Dates":
        return <ChangeDatesEditReser reservation={reservation}/>;
      case "Add-Rooms":
        return <p>Agregar habitaciones</p>;
      case "Remove-Rooms":
        return <p>Quitar habitaciones</p>;
      case "Add-Additional-Services":
        return <p>Agregar servicios adicionales</p>;
      case "Remove-Additional-Services":
        return <p>Quitar servicios adicionales</p>;
      default:
        return <p>Selecciona una acción válida.</p>;
    }
  };

  // esto tiene que ir en un hook de RoomReservation
  const calculateDays = (reservationStartDate, reservationFinishDate) => {
    const startDate = new Date(reservationStartDate);
    let finishDate = new Date(reservationFinishDate);

    // Normaliza ambas fechas a la medianoche, solo se necesita calcular los días
    startDate.setHours(0, 0, 0, 0);
    finishDate.setHours(0, 0, 0, 0);

    if (startDate.getTime() === finishDate.getTime()) {
      // Agrega un día a finishDate
      finishDate.setDate(finishDate.getDate() + 1);
    }

    const differenceInTime = finishDate - startDate;

    // Convertir la diferencia de milisegundos a días
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // 1000 ms/s * 3600 s/h * 24 h/d

    return differenceInDays; // Retornar la cantidad de días
  };

  return (
    <>
      <Link
        //a medida se coloquen numeros se regresa la cantidad de "nodos" que se especifique
        to={-1}
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
      >
        <ChevronLeftIcon className="w-5 h-5" />
        Regresar
      </Link>

      {Object.keys(reservation).length > 0 ? (
        // esto evalua que reservation tenga al menos una key y no sea un objeto vacio
        <section className="border rounded-lg p-6 mb-6 shadow-md bg-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Reserva: {reservation.reservationId}
        </h2>
        <div className="flex justify-between text-gray-600 mb-6">
          <p>Inicio: {formatDate(reservation.reservationStartDate)}</p>
          <p>Fin: {formatDate(reservation.reservationFinishDate)}</p>
        </div>
        <div className="flex justify-between text-gray-600 mb-6">
          <p>
            Total dias:{" "}
            {calculateDays(
              reservation.reservationStartDate,
              reservation.reservationFinishDate
            )}
          </p>
        </div>
        <h3 className="text-md font-bold text-gray-700 mb-2">Habitaciones</h3>
  
        {/* Card de Lista de habitaciones de reserva */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {reservation.reservationRoomsInfoList.map((room) => (
            <RoomReservationCard key={room.roomId} room={room} />
          ))}
        </div>
  
        {/* Card de Lista de servicios adicionales de reserva */}
        <h3 className="text-md font-bold mt-4 text-gray-700 mb-2">
          Servicios Adicionales
        </h3>
        {reservation?.reservationAdditionalServicesInfoList?.length ? (
          reservation.reservationAdditionalServicesInfoList.map((aS) => (
            <AdditioServReservationCard
              key={aS.additionalServiceId}
              aS={aS}
            />
          ))
        ) : (
          <div className="border rounded-lg p-4 shadow-md bg-white hover:bg-gray-50 transition-colors mb-2">
            <p className="text-gray-700">
              No hay servicios adicionales para esta reserva
            </p>
          </div>
        )}
  
        <p className="font-bold mt-4 text-gray-800">
          Total Reserva = ${reservation.reservationPrice}
        </p>
      </section>
      ) : (
        <div className="border rounded-lg p-4 shadow-md bg-white hover:bg-blue-50 transition-colors mb-2">
          <p className="text-blue-700">
            Seleccione una reserva que desee editar
          </p>
        </div>
      )}

      {reservation && (
        <div>
          <p>{renderActionComponent(action)}</p>{" "}
          {/* Muestra la acción actual, como "Cambiar fechas", "Agregar habitaciones", etc. */}
        </div>
      )}

      {/* AGREGAR BOTON CON UNA FUNCION QUE AL HACER CLICK SE HAGA EL ENVIO DE LA PETICION AL BACKEND */}
    </>
  );
};

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
