import { API } from "../../../api/base";

// export const useLoginAsyncMutation = () => {

//   // const loginAsyncMutation  = useCustomAxios({
//   //   url: '/auth/login',
//   //   method: 'POST'
//   // },
//   // { manual: true }
//   // );

//   // return loginAsyncMutation;

//   return useCustomAxios({
//     url: '/auth/login',
//     method: 'POST'
//   }, {
//     manual: true
//   });
// }

export const loginAsync = async ( form ) => {
  try
  {
    const {data} = await API.post(`/auth/login`, form);
    return data;
  }
  catch (error)
  {
    console.error({error});
    return error?.response?.data
  }
}
