//este hook se llama cuando se encuentra el usuario en la pagina para confirmar reserva
//ReservationList

import { useParams } from "react-router-dom";
import { useCustomAxios } from "../../../api/base";

export const useAdditionalServices = () => {
  const { hotelId } = useParams();
  // recordar que el hotelId viene del router
  const additionalServices = useCustomAxios({
    url: `/additionalServices/GetByHotel/${hotelId}`,
    method: "GET",
  });

  return additionalServices;

  //esto retorna el loading, error y data como el useRoomList
};
