export const Pagination = () => {
  return (
    <div className="flex justify-center">
    <div className="mt-8">
      <div className="flex items-center">
        <a href="#" className="px-3 py-2 mx-1 font-medium bg-white text-gray-500 rounded-md cursor-not-allowed flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2 }stroke="currentColor" className="w-4 h-4 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Anterior
        </a>
        <a href="#" className="px-3 py-2 mx-1 font-medium rounded-md text-gray-700 hover:bg-purple-700 hover:text-white">
          1
        </a>
        <a href="#" className="px-3 py-2 mx-1 font-medium rounded-md text-gray-700 hover:bg-purple-700 hover:text-white">
          2
        </a>
        <a href="#" className="px-3 py-2 mx-1 font-medium rounded-md text-gray-700 hover:bg-purple-700 hover:text-white">
          3
        </a>
        <a href="#" className="px-3 py-2 mx-1 font-medium bg-white text-gray-500 rounded-md cursor-not-allowed flex items-center">
          Siguiente
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </div>
  )
}
