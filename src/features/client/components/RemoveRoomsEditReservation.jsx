import { RoomCardEditReservationRemoveRoom } from "./RoomCardEditReservationRemoveRoom";

export const RemoveRoomsEditReservation = ({ reservation }) => {
  return (
    <>
      <p>Seleccione las habitaciones que quiere eliminar</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {reservation?.reservationRoomsInfoList?.map((room) => (
          <RoomCardEditReservationRemoveRoom
            key={room.roomId}
            room={room}
            //los siguientes dos métodos vienen del context, verifica si la habitación esta agregada o no
            //y si fue clicqueada o no
            // isRoomSelected={isRoomSelected}
            // toggleRoomSelection={toggleRoomSelection}
          />
        ))}
      </div>

      <p>Nuevo Total: $$$</p>
      <p>Replicar el ReservationCard para mostrar como quedaria la nueva reservacion</p>
    </>
  );
};

// ELIMINAR ESTE COMPONENTE CREO
