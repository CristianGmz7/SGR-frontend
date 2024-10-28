export const RoomReservationCard = ({ room }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white hover:bg-blue-50 transition-colors">
    <img
      src={room.roomImgUrl}
      alt={`Habitación ${room.roomId}`}
      className="rounded-lg mb-2 w-full h-auto"
      style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
    />
    <p className="text-blue-700">Habitación {room.roomNumber}</p>
    <p className="text-blue-600">{room.roomType}</p>
    <p className="text-blue-600">${room.roomPriceNight}</p>
    <p className="text-blue-600">{room.roomHotelInfo.hotelName}</p>
  </div>
  )
}
