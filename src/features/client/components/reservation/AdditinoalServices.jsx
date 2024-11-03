import { CircularProgress, Checkbox } from "@mui/material";

export const AdditionalServices = ({
  data,
  toggleService,
  selectedServices,
  loading,
}) => {

  if (data?.length === 0 && !loading) {
    return (
      <div className="border rounded-lg p-4 shadow-md bg-white hover:bg-gray-50 transition-colors mb-2">
        <p className="text-gray-700">
          No hay servicios adicionales para esta reserva
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Card de Lista de servicios adicionales de reserva */}
      <h3 className="text-md font-bold mt-4 text-gray-700 mb-2">
        Servicios Adicionales
      </h3>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : (
        data?.map(({ id, name, price }) => (
          <AdditionalService
            key={id}
            id={id}
            name={name}
            price={price}
            checked={selectedServices.some((service) => service.id === id)}
            toggleService={toggleService}
          />
        ))
      )}
    </div>
  );
};


const AdditionalService = ({ id, name, price ,checked,toggleService}) => (
  <div
     className="bg-blue-100 rounded-lg p-4 shadow-lg hover:bg-blue-200 transition-colors"
  >
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        sx={{
          color: "#007bff",
          "&.Mui-checked": {
            color: "#007bff",
          },
        }}
        checked={checked}
        onChange={() => {
          toggleService?.({ id, name, price ,checked});
        }}
      />
      <label
        htmlFor={name}
        className="text-blue-600 flex justify-between w-full"
      >
        {name}
        <span className="text-end text-lime-600">${price}</span>
      </label>
    </div>
  </div>
)