import { API, useCustomAxios } from "../../api/base";
import { reservationsApi } from "../../api/reservationApi";

//AQUI SE HACE EL MAPEO DE LO QUE VIENE DE LA DATA DE OBTENER RESERVACIONES
//aqui se debe de alguna manera deserializar el id del usuario
export const getReservationList = async (
  page = 1,
  clientId = "usuarioGenerico"
) => {
  try {
    // const data = await reservationsApi.getReservations(page, clientId);
    // console.log(data);
    //output de la data: objeto que trae siguientes props config(obj), data(obj), headers(obj), request(obj), status(num), statustext(Str9ng)
    //objeto que interesa es data que trae las siguientes props: data(obj), message(string), status
    //el objeto data trae la estructura que se necesita como la respuesta del DTO

    const { data } = await reservationsApi.getReservations(page, clientId);

    const paginatedReservations = {
      currentPage: data.data.currentPage,
      hasNextPage: data.data.hasNextPage,
      hasPreviousPage: data.data.hasPreviousPage,
      pageSize: data.data.pageSize,
      totalItems: data.data.totalItems,
      totalPages: data.data.totalPages,
      reservations: data.data.items.map((reservation) => {
        return {
          reservationId: reservation.id,
          reservationStartDate: reservation.startDate,
          reservationFinishDate: reservation.finishDate,
          reservationCondition: reservation.condition,
          reservationPrice: reservation.price,
          reservationClientId: reservation.clientId,
          //habitaciones de la reserva
          reservationRoomsInfoList: reservation.roomsInfoList.map((room) => {
            return {
              roomId: room.id,
              roomNumber: room.numberRoom,
              roomType: room.typeRoom,
              roomPriceNight: room.priceNight,
              roomImgUrl: room.imageUrl,
              roomCondition: room.condition,
              roomHotelInfo: {
                hotelId: room.hotelInfo.id,
                hotelName: room.hotelInfo.name,
                hotelAddress: room.hotelInfo.address,
                hotelStarsMichelin: room.hotelInfo.starsMichelin,
                hotelNumberPhone: room.hotelInfo.numberPhone,
                hotelOverview: room.hotelInfo.overview,
                hotelDescription: room.hotelInfo.description,
                hotelImgUrl: room.hotelInfo.imageUrl,
              },
            };
          }),
          //servicios adicionales, aquí se realiza un ternario para saber si vienen elementos (servicios adicionales en la reserva)
          reservationAdditionalServicesInfoList:
            reservation?.additionalServicesInfoList?.map((addServ) => ({
              additionalServiceId: addServ.id,
              additionalServiceName: addServ.name,
              additionalServicePrice: addServ.price,
              additionalServiceHotelId: addServ.hotelId,
            })) ?? [],
        };
      }), //fin del return de reservations: data.data.items.map
    }; //fin del paginatedReservation del try de getReservationList

    return paginatedReservations;
  } catch (error) {
    return error.response;
  }
};

//este se implementó usando Axios Hooks
export const useEditReservationMutation = (id) => {
  return useCustomAxios({
    url: `/reservations/${id}`,
    method: "PUT",
  },{
    manual: true,
  });

  // const { data } = await API.put(`/reservations/${id}`, {
  //   startDate,
  //   finishDate,
  //   roomsList,
  //   additionalServicesList,
  // });
};

//este se implementó usando Axios normal
// export const deleteReservation = async (id) => {
//   try {
//     const { data } = await API.delete(`/reservations/${id}`);
//     // return data    //fijarse bien estructura de data
//   } catch (error) {
//     console.error(error);
//     // return error.response;   //fijarse bien estructura de error //wacharse la estructura que dejó Pale
//   }
// };

export const useDeleteReservationMutation = (id) => {
  return useCustomAxios({
    url: `/reservations/${id}`,
    method: "DELETE",
  },{
    manual: true,
  });
};

//en resumen Obtener todas las reservas se usó con AxiosHooks
//crear una reserva se hizo con AxiosHooks
//editar una reserva se hizo con AxiosHooks
//eliminar una reserva se hizo con AxiosHooks