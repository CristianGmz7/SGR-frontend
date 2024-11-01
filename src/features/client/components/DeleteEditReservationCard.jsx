import { Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useEditReservation } from '../contexts/reservationEditContext'

export const DeleteEditReservationCard = ({reservation, isReservationDisabled}) => {
  const [isEditButtonOpen, setIsEditButtonOpen] = useState(false);
  const [isDeleteButtonOpen, setIsDeleteButtonOpen] = useState(false);

  //dispatch para saber que accion se renderizará en el EditReservation
  const { dispatch } = useEditReservation();

  const handleButtonsEdit = (actionType) => {
    dispatch({
      type: "SET_RESERVATION",
      payload: {
        reservation,    //se manda la reservación que se haga click
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
  };

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

      {isEditButtonOpen && (
        <div className="flex flex-col gap-2 mt-4">

          <Link to={`/editReservation/${reservation.reservationId}`}>
          <Button
            onClick={() => handleButtonsEdit("Change-Dates")}
            className="w-full"
            variant="contained"
            sx={{
              backgroundColor: "#4caf50", // Color verde
              color: "#fff",
              "&:hover": {
                backgroundColor: "#388e3c",
              },
            }}
          >
            Cambiar fechas
          </Button>
          </Link>

          <Link to={`/editReservation/${reservation.reservationId}`}>
          <Button
            onClick={() => handleButtonsEdit("Add-Rooms")}
            className="w-full"
            variant="contained"
            sx={{
              backgroundColor: "#2196f3", // Color azul
              color: "#fff",
              "&:hover": {
                backgroundColor: "#1976d2",
              },
            }}
          >
            Agregar habitaciones
          </Button>
          </Link>

          <Link to={`/editReservation/${reservation.reservationId}`}>
          <Button
            onClick={() => handleButtonsEdit("Remove-Rooms")}
            className="w-full"
            variant="contained"
            disabled={reservation.reservationRoomsInfoList.length < 2}
            sx={{
              backgroundColor: "#e91e63", // Color rosa
              color: "#fff",
              "&:hover": {
                backgroundColor: "#c2185b",
              },
            }}
          >
            Quitar habitaciones
          </Button>
          </Link>

          <Link to={`/editReservation/${reservation.reservationId}`}>
          <Button
            onClick={() => handleButtonsEdit("Add-Additional-Services")}
            className="w-full"
            variant="contained"
            sx={{
              backgroundColor: "#ff9800", // Color naranja
              color: "#fff",
              "&:hover": {
                backgroundColor: "#fb8c00",
              },
            }}
          >
            Agregar servicios adicionales
          </Button>
          </Link>

          <Link to={`/editReservation/${reservation.reservationId}`}>
          <Button
            onClick={() => handleButtonsEdit("Remove-Additional-Services")}
            className="w-full"
            variant="contained"
            sx={{
              backgroundColor: "#f44336", // Color rojo
              color: "#fff",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
          >
            Quitar servicios adicionales
          </Button>
          </Link>
        </div>
      )}

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
