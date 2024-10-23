//Aquí es donde se recibe al hook personalizado de Axios
// ¿Diferencia entre hook y función? Rta: un hook puede devolver otros hooks como useState
// una función no puede hacer eso, todos los hooks siempre empiezan con la palabra use

import { useCustomAxios } from "../../../api/base";

export const useRoomList = ({ page , filterStartDate, filterEndDate ,hotelId}) => {

  // se roomList es la respuesta del hook, por eso Res al final, a este se le colocan propiedades
  //que necesita: la Url a la que se quiere hacer peticiones, el método que utilizará y los parámetros
  //que necesita la url, los parámetros son los que van después del signo de ? de una url 
  const roomListRes = useCustomAxios({
    url: `/rooms/GetByHotel/${hotelId}`,
    method: "GET",
    params: {
      page,
      filterStartDate,
      filterEndDate,
    },
  });

  // roomListRest es un arreglo con dos elementos [{}, refetch], el primero es un objeto y el segundo
  // es una función llamada refetch, que es para una recarga si es que se necesita
  // el objeto de RoomListRes trae {data, loading, error}, similar a lo que se retornaba como se
  // enseñó en clase en el archivo useHotel de /client/hooks.
  // De esta manera se ahorra un useEffect y 3 useState
  return roomListRes;

  //este roomListRes se usa en el componente RoomList.jsx
};
