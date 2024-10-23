//Definición de un hook personalizado. Recordar que un hook es una función que permite "engancharse"
//al ESTADO y CICLO DE VIDA de los componentes funcionales en React
//Este hook en particular se encarga de gestionar la lógica relacionada con la obtención de una 
//lista paginadas de hoteles

//Recordar que:
//useEffect, hook que se utiliza para realizar efectos secundarios en los componentes
//useState, hook que se utiliza para gestionar el estado de los componentes
import { useEffect, useState } from "react";
import { getHotelList } from "../../../shared/actions";
//getHotelList, función que se encarga de obtener los datos de los hoteles desde la API

// AL FINAL SE EXPORTA useHotel, especificamente los 3 estados de los useState: paginatedHotels, loading y error
//recibe el parámetro page que representa el número de pagina de los hoteles que se desean obtener
// cuando se refiere a número de pagina se refiere a todo lo que se mapeo anteriormente
const useHotel = (page) => {
  //useHotel utiliza useState para definir 3 estados en el siguiente orden respectivo:

  //1. paginatedHotels: almacenará los datos de los hoteles obtenidos desde la API
  const [paginatedHotels, setHotel] = useState();
  //2. loading: Indica si se está cargando la lista de hoteles
  const [loading, setLoading] = useState(false);
  //3. error almacenará cualquier error que ocurra durante la petición
  const [error, setError] = useState(null);

  //esta función llama a getHotelList y  devuelve el resultado
  //esta función es llamada en el useEffect 
  const getHotels = async (page) => {
    const paginatedHotels = await getHotelList(page);
    return paginatedHotels;
  };

  //este useEffect cada que el valor de page cambia debido a la dependencia
  useEffect(() => {
    setLoading(true);   //indica que esta iniciando la petición al API para obtener hoteles, permite mostrar indicador de carga al usuario
    getHotels(page)     //esta llama a la función con el valor actual de page que devuelve un objeto o causa un error
      .then((hotels) => { //si la petición a la API se realiza con éxito rotornará info de los hoteles
        setHotel(hotels);  //actualiza el estado de paginatedHotels con su método actualizador, con datos de hoteles obtenidos del API
      })
      .catch((error) => {
        setError(error);  //actualiza el estado del error
        console.log("error", error);  //imprime valor en consola para facilitar depuración
      })
      .finally(() => {
        setLoading(false);  //la petición ha finalizado y se puede ocultar el indicar de carga
      });
  }, [page]);
  // ¿porque page como dependencia? Rta: se garantiza que cuando el valor de page cambia
  // es decir cuando el usuario navega a una pagina diferente de hoteles, se realizará una
  // nueva petición a la API para obtener los hoteles correspondientes a esa pagina

  return {
    paginatedHotels,
    loading,
    error,
  };
};

export default useHotel;
