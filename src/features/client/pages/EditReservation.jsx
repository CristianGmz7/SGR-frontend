import { Link } from "react-router-dom";
import {
  UPDATE_RESERVATION_ACTIONS,
  useEditReservation,
} from "../contexts/reservationEditContext";
import { formatDate } from "../../../shared/utils/format-date";
import { RoomReservationCard } from "../components/RoomReservationCard";
import { ChangeDatesEditReser } from "../components/ChangeDatesEditReser";
import { AddRoomsEditReservation } from "../components/AddRoomsEditReservation";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useAdditionalServices } from "../hooks/useAdditionalServices";
import { AdditionalServices } from "../components/reservation/AdditinoalServices";
import { useEditReservationMutation } from "../../../shared/actions/reservationsActions";

export const EditReservation = () => {
  const { state: reservation, dispatch, defaultState } = useEditReservation();

  const firstHotelRoomSelected =
    defaultState?.reservationRoomsInfoList?.at(0)?.roomHotelInfo;

  const [{ data: additionalServices, loading: loadingAdditionalServices }] =
    useAdditionalServices(firstHotelRoomSelected?.hotelId);
  const [{ loading: editing }, editReservationMutation] =
    useEditReservationMutation(reservation?.reservationId);
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

  const onDatesChange = (newDates) => {
    dispatch({
      type: UPDATE_RESERVATION_ACTIONS.UPDATE_DATES,
      payload: newDates,
    });
  };


  const isOneRoomSelected = reservation?.reservationRoomsInfoList?.length === 1;

  const selectedServices =
    reservation?.reservationAdditionalServicesInfoList?.map((service) => ({
      id: service.additionalServiceId,
      price: service.additionalServicePrice,
      name: service.additionalServiceName,
    }));

  //aqui se hace la petición al action para editar
  const handleEditReservation = async () => {
    const dto = {
      startDate: reservation?.reservationStartDate,
      finishDate: reservation?.reservationFinishDate,
      roomsList: reservation?.reservationRoomsInfoList.map(
        (element) => element.roomId
      ),
      additionalServicesList:
        reservation?.reservationAdditionalServicesInfoList.map(
          (element) => element.additionalServiceId
        ),
    };
    // console.info(dto);
    // return;

    //el editReservationMutation se nombró asi en el hook
    const res = await editReservationMutation({
      data: dto,
    });

    // console.info(res);
    toast.info('Reservación editada correctamente')
  };

  //suma de habitaciones
  const costRooms = reservation?.reservationRoomsInfoList?.reduce(
    (acc, { roomPriceNight }) => acc + roomPriceNight,
    0
  );

  //suma de servicios adicionales
  const totalServices =
    reservation?.reservationAdditionalServicesInfoList?.reduce(
      (acc, { additionalServicePrice }) => acc + additionalServicePrice,
      0
    );

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

      {Object.keys(reservation || []).length > 0 ? (
        // esto evalua que reservation tenga al menos una key y no sea un objeto vacio
        <section className="border rounded-lg p-6 mb-6 shadow-md bg-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Reserva: {reservation?.reservationId}
          </h2>
          <div className="flex justify-between text-gray-600 mb-6">
            <p>Inicio: {formatDate(defaultState?.reservationStartDate)}</p>
            <p>Fin: {formatDate(defaultState?.reservationFinishDate)}</p>
          </div>
          <div className="flex justify-between text-gray-600 mb-6">
            <p>
              Total dias:{" "}
              {calculateDays(
                reservation?.reservationStartDate,
                reservation?.reservationFinishDate
                // defaultState
              )}
            </p>
          </div>
          <h3 className="text-md font-bold text-gray-700 mb-2">Habitaciones</h3>

          {/* Card de Lista de habitaciones de reserva */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {reservation?.reservationRoomsInfoList?.map((room) => (
              <RoomReservationCard
                key={room.roomId}
                room={room}
                onRemove={() => {
                  if (isOneRoomSelected) {
                    toast.warning(
                      "Debes tener al menos una habitación seleccionada"
                    );
                    return;
                  }

                  return dispatch({
                    type: UPDATE_RESERVATION_ACTIONS.REMOVE_ROOM,
                    payload: room.roomId,
                  });
                }}
              />
            ))}
          </div>

          <AdditionalServices
            data={additionalServices?.data}
            toggleService={(dto) => {
              if (dto?.checked) {
                dispatch({
                  type: UPDATE_RESERVATION_ACTIONS.REMOVE_SERVICE,
                  payload: {
                    additionalServiceId: dto.id,
                    additionalServicePrice: dto.price,
                    additionalServiceName: dto.name,
                  },
                });
                return;
              }

              dispatch({
                type: UPDATE_RESERVATION_ACTIONS.ADD_SERVICE,
                payload: {
                  additionalServiceId: dto.id,
                  additionalServicePrice: dto.price,
                  additionalServiceName: dto.name,
                },
              });
            }}
            selectedServices={selectedServices}
            loading={loadingAdditionalServices}
          />

          <p className="font-bold mt-4 text-gray-800">
            {/* Total Reserva = ${reservation.reservationPrice} */}
            {/* $ {(costRooms + totalServices) * (daysInterval || 1)} */}
            Total Reserva = $
            {(costRooms + totalServices) *
              calculateDays(
                reservation?.reservationStartDate,
                reservation?.reservationFinishDate
              )}
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
          <ChangeDatesEditReser
            reservation={reservation}
            onChange={onDatesChange}
            state={{
              startDate: reservation?.reservationStartDate,
              finishDate: reservation?.reservationFinishDate,
            }}
          />
          {/* <AddAdditioSerEditReservation reservation={reservation} /> */}
          <AddRoomsEditReservation
            reservation={reservation}
            onAddRoom={(room) => {
              return dispatch({
                type: UPDATE_RESERVATION_ACTIONS.ADD_ROOM,
                payload: {
                  roomId: room.id,
                  roomPriceNight: room.priceNight,
                  roomType: room.typeRoom,
                  roomNumber: room.numberRoom,
                  roomImgUrl: room.imageUrl,
                  roomHotelInfo: firstHotelRoomSelected,
                },
              });
            }}
          />
        </div>
      )}

      <Button
        variant="contained"
        color="warning"
        disabled={editing}
        onClick={handleEditReservation}
      >
        {editing ? "Editando..." : "Editar Reserva"}
      </Button>
      <Button
        variant="contained"
        color="info"
        onClick={() => {
          dispatch({
            type: UPDATE_RESERVATION_ACTIONS.CLEAR_RESERVATION,
            payload: {},
          });
        }}
      >
        Reserva inicial
      </Button>
      <p>
        Este boton necesita validacion de que la data original sea diferente a
        la actual, y que exista
      </p>
      <p></p>
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
