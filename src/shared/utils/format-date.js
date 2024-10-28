import dayjs from "dayjs";

// export const formatDate = (isoDateString) => {
//   // console.log(isoDateString);
//   const date = new Date(isoDateString);
//   const options = {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
//   return date.toLocaleDateString('es-MX', options);
// }

export const formatDate = (isoDateString) => {
  const date = dayjs(isoDateString);
  // return date.subtract(6, 'hour').format('DD/MM/YY hh:mm');
  return date.subtract(6, 'hour').format('DD/MM/YY');
}