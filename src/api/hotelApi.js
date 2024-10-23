//En este archivo se hace que otros archivos se enfoquen en lógica de app sin tener que
//preocuparse por los detalles de las peticiones HTTP

//API es instancia personalizada de Axios configurada para comunicarse con la API
import { API } from "./base";

//hotelsApi agrupará una serie de funciones relacionadas con la gestión de hoteles
//en base a la instancia API que se ha importado
const hotelsApi = {
  getHotels: (page = 1) => API.get("/hotels", { params: { page } }),
  //Función que se encarga de realizar petición al API para obtener lista de hoteles
  //se incluye un objeto del tipo parámetro, page se utiliza para indicar la pagina que se quiere obtener 
};

export { hotelsApi };
//se exporta el objeto para poder utilizarlo en otros archivos