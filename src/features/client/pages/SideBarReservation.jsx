import Pagination from "@mui/material/Pagination";
import { usePagination } from "../hooks/usePagination";
import useGetReservations from "../hooks/useGetReservations";
import { ReservationCard } from "../components/ReservationCard";
import { CircularProgress } from "@mui/material";

export const SideBarReservation = () => {
  //custom hooks
  const { handlePageChange, page } = usePagination();

  const { paginatedReservations, loading, error } = useGetReservations(page);

  // Cálculo de las habitaciones para mostrar en la página actual

  return (
    <div className="container mx-auto p-4 md:p-6 bg-blue-50 text-blue-900 rounded-lg shadow-lg">
      {loading ? (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70">
          <CircularProgress />
        </div>
      ) : (
        paginatedReservations?.reservations?.map((reservation) => {
          return (
            <ReservationCard
              key={reservation?.reservationId}
              reservation={reservation}
            />
          );
        })
      )}

      {/* <Pagination /> */}
      <div className="flex flex-row justify-center items-center">
        <Pagination
          //con la paginación que viene de useGetReservations y que viene de reservationsAction
          count={paginatedReservations?.totalPages}
          page={paginatedReservations?.currentPage}
          // 5. Cuando el usuario cambia de pagina, el hook usePagination actualiza el estado
          //de la pagina actual y useHotel se vuelve a ejecutar para obtener hoteles de nueva pagina
          onChange={(_event, page) => handlePageChange(page)}
          key={paginatedReservations?.currentPage}
          //se le coloco key porque si no habàa bug que no se actualizaba si se presionaba
          //se le obliga a react a que re renderice el componente
        />
      </div>
    </div>
  );
};
