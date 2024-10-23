//esta hook se hace cuando se le da confirmar a la reserva

import { useCustomAxios } from "../../../api/base";

export const useCreateReservation = () => {
  //se pasan dos objetos para el create
  //el primero contiene la url de petición del API y el segundo el método
  const createReservationMutation = useCustomAxios(
    {
      url: `/reservations`,
      method: "POST",
    },
    { manual: true }
    // este manual es para decirle al método createReservationMutation que dentro del {loading, error}, (data no devuelve por
    //que es método es para crear) devuelva una función que se pueda ejecutar en algún momento cuando el usuario le de a 
    //Confirmar Reserva
    //la función que devuelve se llama createMutation en ReservationList
  );

  return createReservationMutation;
};
