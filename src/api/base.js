//este archivo establece la configuración necesaria para realizar peticiones a una API con la
//librería AXIOS

import axios from "axios";
import { makeUseAxios } from "axios-hooks";
const API_URL = "https://localhost:7252/api";

//Manera como se implementó en clase
//API es una instancia personalizada de Axios
const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
 //crear un hook personalizado que simplifica el uso de axios en componentes funcionales de React
 //es decir nos ahorra algunos archivos de código extra
 //Este es un hook personalizado que toma como argumento la instancia de axios creada anteriormente (API)
const useCustomAxios = makeUseAxios({
  axios: API,
});
// Este hook anterior (useCustomAxios) se utiliza para obtener el listado de las habitaciones que se utiliza en el hook useRoomList

export { API_URL, API, useCustomAxios };
//API AL SER LA PRUEBA solo se utiliza en hotelApi

/* ¿Porque considerar instalar otra librería para manejar axios?
  Con axios normal se crean varios archivos en diferentes carpetas: 
  /api/src/hotelApi (lógica de peticiones de HTTP)
  shared/actions/hotelActions.js,  (se hacen las peticiones HTTP a la API para obtener datos de los hoteles)
  client/hooks/useHotel, (Gestiona la lógica relacionada con la obtención de listas)

  Con useAxios solo se necesita un archivo
  ejemplo el de traer el listado de habitaciones que tiene un hotel
  que se hace desde /client/hooks/useRoomList

?*/
