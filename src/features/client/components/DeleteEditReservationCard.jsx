import { Button } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useEditReservation } from "../contexts/reservationEditContext";

export const DeleteEditReservationCard = ({
  reservation,
  isReservationDisabled,
}) => {
  const [isEditButtonOpen, setIsEditButtonOpen] = useState(false);
  const [isDeleteButtonOpen, setIsDeleteButtonOpen] = useState(false);

  //dispatch para saber que accion se renderizará en el EditReservation
  const { dispatch } = useEditReservation();

  const handleButtonsEdit = (actionType) => {
    dispatch({
      type: "SET_RESERVATION",
      payload: {
        reservation, //se manda la reservación que se haga click
        action: actionType,
      },
    });
  };

  const handleDeleteReservation = () => {
    setIsDeleteButtonOpen(!isDeleteButtonOpen);
    setIsEditButtonOpen(false);
  };

  const handleEditReservation = () => {
    setIsEditButtonOpen(!isEditButtonOpen);
    setIsDeleteButtonOpen(false);
    navigate(`/editReservation/${reservation.reservationId}`);
    handleButtonsEdit("EDIT");
  };
  const navigate = useNavigate();

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

      {isDeleteButtonOpen && (
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-red-500 font-semibold">
            ¿Estás seguro de que deseas eliminar esta reserva?
          </p>
          <Button
            className="w-full"
            variant="contained"
            sx={{
              backgroundColor: "#f44336", // Color rojo para confirmación
              color: "#fff",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          >
            Confirmar Eliminación
          </Button>
          <Button
            onClick={handleDeleteReservation}
            className="w-full"
            variant="contained"
            sx={{
              backgroundColor: "#9e9e9e", // Color gris para cancelar
              color: "#fff",
              "&:hover": {
                backgroundColor: "#757575",
              },
            }}
          >
            Cancelar
          </Button>
        </div>
      )}
    </>
  );
};
