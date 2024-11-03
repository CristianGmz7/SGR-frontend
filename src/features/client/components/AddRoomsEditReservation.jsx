import { CircularProgress, Pagination } from "@mui/material";
import { useRoomList } from "../hooks/useRoomList";
import RoomCard from "./RoomCard";
import { useEffect, useState } from "react";
import { RoomCardEditReservationAddRoom } from "./RoomCardEditReservationAddRoom";
import { formatSubstractDate } from "../../../shared/utils/format-date";
// import { useReservation } from "../contexts/reservationContext";

export const AddRoomsEditReservation = ({ reservation, onAddRoom }) => {
  const [page, setPage] = useState(1);

  const [hotelId, setHotelId] = useState("");

  useEffect(() => {
    if (reservation?.reservationRoomsInfoList?.length > 0) {
      const firstRoom = reservation.reservationRoomsInfoList[0];
      setHotelId(firstRoom.roomHotelInfo.hotelId); // Asignar el hotelId del primer cuarto
    }
  }, [reservation]);

  const [{ error, loading, data }] = useRoomList({
    page: page,
    filterStartDate: reservation?.reservationStartDate,
    filterEndDate: reservation?.reservationFinishDate,
    hotelId: hotelId,
  });
  const selectedRooms = reservation?.reservationRoomsInfoList?.map(
    (room) => room.roomId
  );
 
  const rooms = (data?.data?.items?.rooms ?? [])?.filter(
    (room) => !selectedRooms.includes(room.id)
  ); //Arreglo con datos de habitaciones disponibles
  // ESTE CAMPO NO SE NECESITA AQUI // const hotel = data?.data?.items?.hotel; //objeto con la info del hotel
  const pagination = data?.data;

  return (
    <>
      <div className="separator my-5"></div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : (
        // si no esta cargando mostrar el contenido del listado de las habitaciones
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rooms?.map((room) => (
            <RoomCardEditReservationAddRoom
              key={room.id}
              room={room}
              onAdd={() => onAddRoom(room)}
              //los siguientes dos métodos vienen del context, verifica si la habitación esta agregada o no
              //y si fue clicqueada o no
              // isRoomSelected={isRoomSelected}
              // toggleRoomSelection={toggleRoomSelection}
            />
          ))}
        </div>
      )}

      <div className="flex mt-5 justify-center">
        <Pagination
          count={pagination?.totalPages}
          page={pagination?.currentPage}
          onChange={(_event, page) => setPage(page)}
          key={pagination?.currentPage}
        />
      </div>

      <p>Nuevo Total: $$$</p>
      <p>
        Replicar el ReservationCard para mostrar como quedaria la nueva
        reservacion
      </p>
    </>
  );
};
