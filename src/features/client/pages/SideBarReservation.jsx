import { Button } from "@mui/material";
import { Pagination } from "../components/Pagination";

export const SideBarReservation = () => {
  // Array de objetos para cada habit                                                                                                     ación
  const rooms = [
    {
      id: 1,
      img: "https://www.infobae.com/new-resizer/pUEjNBD7vjpNWcQGlao78XnLswk=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152644/The-Resort-at-Pedregal-1.jpg",
      type: "Sencilla",
      price: "$100 por noche",
      hotelName: "Hotel Century",
    },
    {
      id: 2,
      img: "https://www.infobae.com/new-resizer/YaqW55Y3Z3TTAY4d12JNltkW2UU=/768x512/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152242/Dorado-Beach-a-Ritz-Carlton-Reserve-2.jpg",
      type: "Doble",
      price: "$150 por noche",
      hotelName: "Hotel Plaza",
    },
    {
      id: 3,
      img: "https://www.infobae.com/new-resizer/pUEjNBD7vjpNWcQGlao78XnLswk=/768x432/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2019/05/20152644/The-Resort-at-Pedregal-1.jpg",
      type: "Triple",
      price: "$200 por noche",
      hotelName: "Hotel Riviera",
    },
    // Agrega más habitaciones aquí si es necesario
  ];

  // Cálculo de las habitaciones para mostrar en la página actual

  return (
    <div className="container mx-auto p-4 md:p-6 bg-blue-50 text-blue-900 rounded-lg shadow-lg">
      {/* Reserva Section */}
      <section className="border rounded-lg p-6 mb-6 shadow-md bg-blue-100">
        <h2 className="text-lg font-bold text-blue-800 mb-4">Reserva: #1</h2>
        <div className="flex justify-between text-blue-600 mb-6">
          <p>Inicio: 17/08/2024</p>
          <p>Fin: 19/08/2024</p>
        </div>
        <h3 className="text-md font-bold text-blue-700 mb-2">Habitaciones</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="border rounded-lg p-4 shadow-md bg-white hover:bg-blue-50 transition-colors"
            >
              <img
                src={room.img}
                alt={`Habitación ${room.id}`}
                className="rounded-lg mb-2 w-full h-auto"
                style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
              />
              <p className="text-blue-700">Habitación {room.id}</p>
              <p className="text-blue-600">{room.type}</p>
              <p className="text-blue-600">{room.price}</p>
              <p className="text-blue-600">{room.hotelName}</p>
            </div>
          ))}
        </div>
        <h3 className="text-md font-bold mt-4 text-blue-700 mb-2">
          Servicios Adicionales
        </h3>
        <div className="border rounded-lg p-4 shadow-md bg-white hover:bg-blue-50 transition-colors">
          <p className="text-blue-700">Nombre servicio:</p>
          <p className="text-blue-600">Precio:</p>
        </div>
        <p className="font-bold mt-4 text-blue-800">Total Reserva = $$</p>

        {/* Estado de la Reserva Section */}
        <section className="border rounded-lg p-6 mb-6 shadow-md bg-blue-100">
          <h2 className="text-lg font-bold text-blue-800 mb-4">
            Estado de la Reserva
          </h2>
          <div className="flex items-center justify-between text-blue-600 mb-6">
            <p className="font-bold">Estado:</p>
            <div className="flex items-center">
              <Button
                variant="outlined"
                sx={{
                  color: "#00acee",
                  borderColor: "#00acee",
                  "&:hover": {
                    borderColor: "#0099cc",
                    color: "#0099cc",
                  },
                }}
                className="mr-4"
              >
                Confirmado
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "#00acee",
                  borderColor: "#00acee",
                  "&:hover": {
                    borderColor: "#0099cc",
                    color: "#0099cc",
                  },
                }}
              >
                Completado
              </Button>
            </div>
          </div>
        </section>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#00acee",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#0099cc",
            },
          }}
        >
          Eliminar Reserva
        </Button>

        <Button
          className="absolute right-100"
          variant="contained"
          sx={{
            backgroundColor: "#00acee",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#0099cc",
            },
          }}
        >
          Editar Reserva
        </Button>
      </section>

      <Pagination />
    </div>
  );
};
