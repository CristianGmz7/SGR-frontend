import { Button } from '@mui/material'

export const RoomCardEditReservationRemoveRoom = ({ room }) => {
  return (
    <div className="grid gap-4 relative group">
    <img
      src={room.roomImgUrl}
      alt={`Room ${room.roomId}`}
      width="300"
      height="300"
      className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
    />
    <div className="grid gap-1">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Habitación {room.roomNumber}</div>
        <div className="text-xs text-muted-foreground">{room.roomType}</div>
      </div>
      <div className="font-semibold text-gray-700 text-sm">
        ${room.roomPriceNight} / noche
      </div>
      <Button
        variant="contained"
      //se le manda el id de la hab si la habitación esta selecciona devuelve TRUE por lo que se elimina de la lista
        // color={isRoomSelected(room.id) ? "error" : "success"}
      //   queda pendiente explicación de esta función
        // onClick={() => toggleRoomSelection(room)}
      >
        {/* {isRoomSelected(room.id) ? "Cancelar reserva" : "Agregar a Reserva"} */}
        Implementar logica
      </Button>
    </div>
  </div>
  )
}
