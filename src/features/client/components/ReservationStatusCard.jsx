import { Button } from "@mui/material"

export const ReservationStatusCard = ({ reservation }) => {
  return (
    <div className="flex items-center justify-between text-blue-600 mb-6">
    <p className="font-bold">Estado:</p>
    <div className="flex items-center">
      <Button
        variant="outlined"
        sx={{
          color: `${reservation.reservationCondition === 'CONFIRMADA' ? '#fff' : '#00acee'}`,
          backgroundColor: `${reservation.reservationCondition === 'CONFIRMADA' ? '#00a135' : 'transparent'}`,
          borderColor: "#00acee",
          cursor: 'default',
          borderWidth: 2,
          borderStyle: 'solid',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: `${reservation.reservationCondition === 'CONFIRMADA' ? '#00a135' : 'transparent'}`, // Keep the background color on hover
          },
        }}
        className="mr-4"
      >
        Confirmado
      </Button>
      <Button
        variant="outlined"
        sx={{
          color: `${reservation.reservationCondition === 'COMPLETADA' ? '#fff' : '#00acee'}`,
          backgroundColor: `${reservation.reservationCondition === 'COMPLETADA' ? '#00a135' : 'transparent'}`,
          borderColor: "#00acee",
          cursor: 'default',
          borderWidth: 2,
          borderStyle: 'solid',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: `${reservation.reservationCondition === 'COMPLETADA' ? '#00a135' : 'transparent'}`, // Keep the background color on hover
          },
        }}
      >
        Completado
      </Button>
    </div>
  </div>
  )
}
