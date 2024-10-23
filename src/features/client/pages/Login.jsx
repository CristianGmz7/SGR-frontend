import { Link } from "react-router-dom"

export const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-100 to-blue-300 px-4 py-12 sm:px-6 lg:px-8">
    <div className="mx-auto w-full max-w-md space-y-8 p-8 bg-white rounded-lg shadow-2xl">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-blue-800">Bienvenido</h1>
        <p className="mt-2 text-sm text-gray-600">Inicia sesión en tu cuenta para continuar con tu reserva.</p>
      </div>
      <div className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
          <input
            id="username"
            type="text"
            placeholder="Ingresa tu nombre de usuario"
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
              Recordarme
            </label>
          </div>
          <div className="text-sm">
            <Link to="#" className="font-medium text-blue-600 hover:text-blue-500">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </div>
        <div>
            <Link
            to={"/home"}
            >
                <button
                type="submit"
                className="w-full flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                Iniciar sesión
                </button>
            </Link>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="#" className="font-medium text-blue-600 hover:text-blue-500">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  </div>
  )
}
