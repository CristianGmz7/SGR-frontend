//hook personalizado creado para gestionar lógica de paginación de componente de react
//mantiene estado de pagina actual y proporciona función para actualizarla cuando se cambia
import { useState } from "react";

export const usePagination = () => {
  //inicializar que se encuentra en la primera pagina
  const [page, setPage] = useState(1);

  //recibe como parámetro la pagina y se encarga de actualizar "page" al nuevo valor
  const handlePageChange = (page) => {
    setPage(page);
  };

  return {
    page,
    handlePageChange,
  };
};
