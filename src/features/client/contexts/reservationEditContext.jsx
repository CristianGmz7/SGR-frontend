import { createContext, useReducer, useContext, useState } from "react";

//Inicializar contexto
const ReservationEditContext = createContext();

//estado inicial del reducer, para saber que acción componente se debe ejecutar
const initialState = {
  reservation: {},
  action: '',
};

//reducer para el estado de la accion
const reservationEditReducer = (state, action) => {
  switch (action.type) {
    case "SET_RESERVATION":
      return {
        ...state,
        reservation: action.payload.reservation,
        action: action.payload.action,
      };

    case "CLEAR_RESERVATION":
      return initialState;

    default:
      return state;
  }
};

export const ReservationEditProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reservationEditReducer, initialState);

  const [dates, setDates] = useState({
    startDate: null,
    endDate: null
  });

  return (
    <ReservationEditContext.Provider value={{state, dispatch}}>
      { children }
    </ReservationEditContext.Provider>
  );
};

export const useEditReservation = () => {
  const context = useContext(ReservationEditContext);
  if (!context) {
    throw new Error("useEditReservation must be used within a ReservationEditProvider");
  }
  return context;
}