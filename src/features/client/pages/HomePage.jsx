//Corazón de la pagina principal de la app

//useHotel se utiliza para obtener una lista paginada de hoteles, encargado de gestionar la lògica
//obtener los hoteles desde la API y proporciona los datos de los hoteles, indicador de carga (loading)
//y un posible error
import useHotel from "../hooks/useHotel";
//HotelCard muestra las tarjetas de hoteles para ca hotel de la vista, recibe un objeto de hotel como
//prop y renderiza una tarjeta con los detalles del hotel
import { HotelCard } from "../components/HotelCard";
//Pagination permite al usuario navegar entre las diferentes paginas, 
import Pagination from "@mui/material/Pagination";
//usePagination, hook que gestiona la lógica de Paginación, manteniendo el estado actual de 
//la pagina actual y proporciona funcionalidad para cambiar de pagina
import { usePagination } from "../hooks/usePagination";
import CircularProgress from "@mui/material/CircularProgress";

export const HomePage = () => {
  // Flujo de datos: 1. 2. 3. 4. 5.
  //1. HomePage llama a useHotel para obtener datos de los hoteles
  //2. useHotel realiza petición a la API, actualiza estado de datos obtenidos o con cualquier error
  const { handlePageChange, page } = usePagination();
  const { paginatedHotels, loading, error } = useHotel(page);

  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Bienvenidos al Sistema de Gestión de Reservas de Hotel
        </h1>
        <section className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 3. renderiza las tarjetas de hoteles con HotelCard para cada
          hotel en la lista paginatedHotels*/}
          {loading ? (
          <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70">
            <CircularProgress />
          </div>
          ) : (
            //se accede a los items y eso es lo que se irá recorriendo
            //signo de interrogación para evitar problemas con nulos o undefined 
            paginatedHotels?.items?.map((hotel) => (
              //asignarle el key del hotel a cada card y el resto de parámetros enviarlos
              <HotelCard key={hotel?.id} hotel={hotel} />
            ))
          )}
        </section>
      </div>

      {/* 4. HomePage renderiza el componente Pagination para permitir al usuario navegar entre
      las diferentes paginas */}
      {/* {JSON.stringify(paginatedHotels)} */}
      {/* Inicio de paginación */}
      <div className="flex flex-row justify-center items-center">
        <Pagination
        //con la pagibación que viene de useHotels y que viene de hotelcAction 
          count={paginatedHotels?.totalPages}
          page={paginatedHotels?.currentPage}
          // 5. Cuando el usuario cambia de pagina, el hook usePagination actualiza el estado
          //de la pagina actual y useHotel se vuelve a ejecutar para obtener hoteles de nueva pagina
          onChange={(_event, page) => handlePageChange(page)}
          key={paginatedHotels?.currentPage}
          //se le coloco key porque si no habàa bug que no se actualizaba si se presionaba
          //se le obliga a react a que re renderice el componente
        />
      </div>
      {/* Fin de paginación */}

      <section className="mt-12 md:mt-16 lg:mt-20 px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6">Más información</h2>
        <div className="información grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="contacto">
            <h3 className="text-xl font-bold mb-2">Contacto</h3>
            <p className="text-muted-foreground mb-4">
              Puedes comunicarte con nosotros a través de nuestro formulario de
              contacto o por teléfono.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-blue-600 
              text-white font-medium transition-colors hover:bg-purple-700 focus:outline-none 
              focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              Contactar
            </a>
          </div>
          <div className="política-cancelación">
            <h3 className="text-xl font-bold mb-2">Política de cancelación</h3>
            <p className="text-muted-foreground mb-4">
              Conoce nuestras políticas de cancelación y modificación de
              reservas.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-blue-600 
             text-white font-medium transition-colors hover:bg-purple-700 focus:outline-none 
             focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              Ver política
            </a>
          </div>
          <div className="características-destacadas">
            <h3 className="text-xl font-bold mb-2">
              Características destacadas
            </h3>
            <p className="text-muted-foreground mb-4">
              Descubre las características que hacen de nuestros hoteles una
              experiencia única.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-blue-600 
              text-white font-medium transition-colors hover:bg-purple-700 focus:outline-none 
              focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
            >
              Ver características
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

