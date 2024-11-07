import { useEffect, useState } from "react";
import { getReservationList } from "../../../shared/actions";

//esto si es un hook solo renoombrar el archivo

const useGetReservations = (page = 1, clientId= "") => {

  const [paginatedReservations, setReservations] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getReservations = async (page) => {
    const paginatedHotels = await getReservationList(page);
    return paginatedHotels;
  };
  
  useEffect(() => {  
    setLoading(true);   
    getReservations(page)     //esta llama a la función con el valor actual de page que devuelve un objeto o causa un error
      .then((reservations) => { //si la petición a la API se realiza con éxito rotornará info de los hoteles
        setReservations(reservations);  //actualiza el estado de paginatedHotels con su método actualizador, con datos de hoteles obtenidos del API
      })
      .catch((error) => {
        setError(error);  //actualiza el estado del error
       })
      .finally(() => {
        setLoading(false);  //la petición ha finalizado y se puede ocultar el indicar de carga
      });
  }, [page])

  return {
    paginatedReservations,
    loading,
    error,
  };
}

export default useGetReservations;
