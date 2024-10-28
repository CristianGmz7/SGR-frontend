import { Button } from "@mui/material";

export const DeleteEditReservationCard = ({ reservation, handleDeleteReservation, handleEditReservation, isReservationDisabled }) => {
  return (
    <>
      <Button
        onClick={handleDeleteReservation}
        className="absolute right-100"
        variant="contained"
        sx={{
          backgroundColor: "#f44336", // Color rojo
          color: "#fff",
          "&:hover": {
            backgroundColor: "#d32f2f", 
          },
        }}
        disabled={isReservationDisabled(reservation.reservationStartDate)}
      >
        Eliminar Reserva
      </Button>

      <Button
        onClick={handleEditReservation}
        className="absolute right-100"
        variant="contained"
        sx={{
          backgroundColor: "#ff9800", // Color naranja
          color: "#fff",
          "&:hover": {
            backgroundColor: "#fb8c00", 
          },
        }}
        disabled={isReservationDisabled(reservation.reservationStartDate)}
      >
        Editar Reserva
      </Button>
    </>
  );
};
