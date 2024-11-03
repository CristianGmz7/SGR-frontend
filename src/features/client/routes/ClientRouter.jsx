import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Footer, Nav, SideBar } from "../components";
import { HomePage, RoomList } from "../pages";
import { ReservationList } from "../pages/ReservationList";
import { SideBarReservation } from "../pages/SideBarReservation";
import { Login } from "../pages/Login";
import { ReservationProvider } from "../contexts/reservationContext";
import { EditReservation } from "../pages/EditReservation";

// OJO con esta importacion
import { ReservationEditProvider } from "../contexts/reservationEditContext";

export const ClientRouter = () => {
  return (
    <div className="overflow-x-hidden bg-gray-100 w-screen h-screen">
      <Nav />
      {/* Renderiza el nav primeramente */}
      <div className="px-6 py-8 flex">
        <SideBar />
        {/* Seguidamente renderiza el SideBar */}
        <div className="flex-1 ml-14 md:ml-48">
          <Routes>
            {/* Define rutas individuales */}
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<HomePage />} />
            {/* Esta ruta no tienen ningún path pero tiene un element 
            El useState de reservationContext.jsx se encuentra dentro del Route que no tiene path*/}
            <Route
              element={
                // que hay en este ReservationProvider que se importa desde /client/contexts/reservationContext.jsx
                <ReservationProvider>
                  <Outlet />
                </ReservationProvider>
              }
            >
              {/* Define una ruta dinámica para lista de habitaciones que iría en el Outlet */}
              {/* en donde las rutas que se reemplazarían por el Outlet serian las siguientes dos  */}
              {/* esto se hizo con el objetivo de mantener el estado de las habitaciones seleccionadas */}
              <Route path="/roomList/:hotelId" element={<RoomList />} />
              <Route path="/ReservationList/:hotelId" element={<ReservationList />} />
            </Route>

            <Route
              element={
                <ReservationEditProvider>
                  <Outlet/>
                </ReservationEditProvider>
              }
            >
              <Route path="/SideBarReservation/" element={<SideBarReservation />}/>
              <Route path="/editReservation/:reservationId" element={<EditReservation />}/>
            </Route>

            <Route path="/*" element={<Navigate to={"/home"} />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};
