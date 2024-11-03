//este hook se llama cuando se encuentra el usuario en la pagina para confirmar reserva
//ReservationList
//solo hace la petición get por medio de AxiosHooks con useCustomAxios

 import { useCustomAxios } from "../../../api/base";

export const useAdditionalServices = (hotelId) => {
  // recordar que el hotelId viene del router
  const additionalServices = useCustomAxios({
    url: `/additionalServices/GetByHotel/${hotelId}`,
    method: "GET",
  });

  return additionalServices;

  //esto retorna el loading, error y data como el useRoomList
};
