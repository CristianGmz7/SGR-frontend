import { Route, Routes } from "react-router-dom"
import { ClientRouter } from "../features/client/routes/ClientRouter"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<ClientRouter />} />
    </Routes>
  )
}
