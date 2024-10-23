//Objetivo: encapsular lógica necesaria para obtener una lista de hoteles
//desde la API. Al estar la lógica aquí se implementa su reutilización en varias partes
//de la app

//hotelsApi.getHotels: esta función se encarga de realizar la petición HTTP a la API
//para obtener datos de los hoteles
import { hotelsApi } from "../../api/index";

export const getHotelList = async (page = 1) => {
  try {
    const {
      data: { data },
    } = await hotelsApi.getHotels(page);
    //función encargada de realizar llamada a la API y procesar la respuesta
    //el parámetro page especifica la pagina de resultados que se quiere obtener

    return {
      hasNextPage: data.hasNextPage,
      hasPreviousPage: data.hasPreviousPage,
      currentPage: data.currentPage,
      pageSize: data.pageSize,
      totalItems: data.totalItems,
      totalPages: data.totalPages,
      items: data.items.map((item) => ({
        id: item.id,
        address: item.address,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name,
        numberPhone: item.numberPhone,
        overview: item.overview,
        starsMichelin: item.starsMichelin,
      })),
    };
  } catch (error) {
    return error.response;
  }
};
