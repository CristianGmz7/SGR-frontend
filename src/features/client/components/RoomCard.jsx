//Componente que renderiza una tarjeta con la información de una habitación individual en la pagina que muestre
//la lista de habitaciones

import Button from '@mui/material/Button';

//room es la data del room que acaba se acaba de recibir del .map
//isRoomSelected 
//toggleRoomSelection
const RoomCard = ({ room, isRoomSelected, toggleRoomSelection }) => {
  return (
    <div key={room.id} className="grid gap-4 relative group">
      <img
        src={room.imageUrl}
        alt={`Room ${room.id}`}
        width="300"
        height="300"
        className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
      />
      <div className="grid gap-1">
        <div className="flex items-center justify-between">
          <div className="font-semibold">Habitación {room.numberRoom}</div>
          <div className="text-xs text-muted-foreground">{room.typeRoom}</div>
        </div>
        <div className="font-semibold text-gray-700 text-sm">
          ${room.priceNight} / noche
        </div>
        <Button
          variant="contained"
        //se le manda el id de la hab si la habitación esta selecciona devuelve TRUE por lo que se elimina de la lista
          color={isRoomSelected(room.id) ? "error" : "success"}
        //   queda pendiente explicación de esta función
          onClick={() => toggleRoomSelection(room)}
        >
          {isRoomSelected(room.id) ? "Cancelar reserva" : "Agregar a Reserva"}
        </Button>
      </div>
    </div>
  );
};

export default RoomCard;
