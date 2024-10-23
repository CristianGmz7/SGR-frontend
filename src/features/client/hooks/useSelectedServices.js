//Este hook calcula la suma de servicios adicionales, que servicios estan agregados
//asi como funcionalidad de cuando un servicio es agregado o quitado

import { useState, useEffect } from "react";

export const useSelectedServices = () => {
  //estado de los servicios seleccionados,
  const [selectedServices, setSelectedServices] = useState([]);
  //estado del total de los servicios adicionales
  const [totalServices, setTotalServices] = useState(0);

  //este useEffect se coloca porque cada vez que agreguen o quiten un servicio adicional se ejecute
  useEffect(() => {
    setTotalServices(
      selectedServices.reduce((acc, { price }) => acc + price, 0)
    );
  }, [selectedServices]);

  //alterna si un servicio esta seleccionado o no,
  //bastante similar a cuando se agregan o quitan habitaciones
  const toggleService = (service) => {
    const exist = selectedServices.some(({ id }) => id === service.id);
    //si no existe que agregue a los datos anteriores el nuevo
    if (!exist) {
      setSelectedServices([...selectedServices, service]);
    } else {
      //si existe el servicio lo elimina, solo traerá los services con distinto id al del id del que se quito
      setSelectedServices(
        selectedServices.filter(({ id }) => id !== service.id)
      );
    }
  };

  //Algo interesante del react y de estados es que cuando una variable de estado cambia
  //vuelve a hacer un return, es decir en todos los lugares donde se utilice la variable que cambió
  //que es re renderizar = borrar lo que hay antes y se calculan los valores con el nuevo valor cambiado
  return { selectedServices, totalServices, toggleService };
};
