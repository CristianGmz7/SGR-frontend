//Los contextos son API que provee react para guardar datos fuera de un componente, es decir
//a otros componentes que estén mas arriba
// el contexto en react sirve para pasar propiedades a los hijos sin necesidad de mandarlo
// como parámetros

//el contexto tiene su provider (el del return) y su consumidor
//(que seria context = useCOntext) en const useReservation

import { createContext, useState, useContext } from "react";

const reservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  //Estado para saber que habitación esta presionada

  // Estado donde hay la siguiente información_
  const [selectedRooms, setSelectedRooms] = useState({
    days: 0,    //dìas de la reserva
    rooms: [],  //habitaciones que seleccionó
    startDate: null,  //fecha inicio y fecha fin
    endDate: null,
  });
  console.info(selectedRooms);
  // este estado anterior se envía en el return

  // Se necesita que las habitaciones seleccionadas estén compartidas entre la vista de
  //ReservationList.jsx y RoomLIst.jsx,  pero si se sale de esos componentes que se borre
  // Método para manejar las habitaciones que se agregan o quitan de la reserva
  const toggleRoomSelection = (room) => {
    
    //si alguna room de las que ya están seleccionadas, coincide con la que acaba de presionar devuelve
    //true o false
    const isRoomAlreadySelected = selectedRooms?.rooms?.some(
      (selectedRoom) => selectedRoom.id === room.id
    );

    //si ya existe la habitación presionada ya existe entonces se quita
    if (isRoomAlreadySelected) {
      //para no borrar las que ya estaban
      setSelectedRooms({
        //hacer una "copia de la que ya estaban" en en arreglo rooms se elimina la que se acaba de presionar,
        //filtrando solo las que no coincidan con el id de la habitación presionada
        ...selectedRooms,
        rooms: selectedRooms?.rooms?.filter(
          (selectedRoom) => selectedRoom.id !== room.id
        ),
      });
    } 
    //...selectedRooms hace una copia de los 4 atributos: days, rooms, startDate y finishDate
    // si no existe la habitación presionada entonces se agrega
    else {
      //hacer copia de las que estaban
      setSelectedRooms({
        //al arreglo rooms agrégale una room
        ...selectedRooms,
        rooms: [...(selectedRooms?.rooms ?? []), room],
        //si en selectedRooms?.rooms? no había nada o no existía, crearlo como un arreglo vacío
      });
    }

    //por que se implementa la lógica de hacer las copias de selectedRooms
    //es por como funcionan los set de los state en react, cuando se hace un set de un useState es borrar todo lo que
    //hay antes y cambiarlo por algo nuevo, por eso se pasa lo que había antes y lo que se renderizará

  };

  //en esta función se le pasa el id de una habitación y determina si ya existe
  //si existe devuelve true y si no devuelve false
  const isRoomSelected = (roomId) =>
    selectedRooms?.rooms?.some((room) => room.id === roomId);

  //recibe la fecha inicio y fecha fin de la reserva y hace la resta 
  const setDayInterval = (startDate, endDate) => {
    /// contar los días entre las fechas , las fechas que vienen son de dayjs
    const startDay = startDate.get("date");
    const endDay = endDate.get("date");
    let cantidad = endDay - startDay;

    //si la fecha fin es igual a la fecha inicio, colocar cantidad de 1 dia
    if (startDay === endDay) cantidad = 1;
    //se mantiene todo excepto lo días, se sobreescriben
    setSelectedRooms({
      ...selectedRooms,
      days: cantidad,
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
    });
  };

  //toda la data anterior de habitaciones seleccionadas y días se encuentra en el estado

  //Con este return se devuelve data del context hacia abajo
  return (
    <reservationContext.Provider
    // en el value mando un objeto que es la data que se necesita en varios componentes
      value={{
        selectedRooms: selectedRooms?.rooms,
        toggleRoomSelection,
        isRoomSelected,
        setDayInterval,
        daysInterval: selectedRooms?.days,
        dateInterval: {
          startDate: selectedRooms?.startDate,
          endDate: selectedRooms?.endDate,
        },
      }}
    >
      {children} {/* esto de aquí es el <Outlet/> que esta en el clientRouter que se recibe como parámetro*/}
    </reservationContext.Provider>
  );
};

//ver inicio del archivo para ver implementación del contexto
//este hook sirve para consumir los datos del contexto
export const useReservation = () => {
  const context = useContext(reservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
};
