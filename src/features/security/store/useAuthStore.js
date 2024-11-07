import { create } from 'zustand'
import { loginAsync } from '../../../shared/actions/auth/auth.action';

//investigar manera de colocar un hook en un lugar que no es un componente jsx

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  message: "",
  error: false,
  login: async ( form ) => {

    const { status, data, message } = await loginAsync(form);

    if(status){
      set({
        error: false,
        user: {
          email: data.email,
          tokenExpiration: data.tokenExpiration
        },
        token: data.token,
        isAuthenticated: true,
        message: message
      });

      localStorage.setItem('user', JSON.stringify(get().user ?? {}));
      localStorage.setItem('token', get().token);

      return;

    }

    set({message: message, error: true});
    return;

  },
  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      message: '',
      error: false
    });
    localStorage.clear();
  },
  //nuevo metodo implementado para evitar problemas renderizado del toast
  resetError: () => set({error: false, message: ""}),
}));
