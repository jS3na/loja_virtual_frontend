"use client"

import { useState, useEffect } from "react"
import api from "../../../utils/api"
import AdicionarCategoriaModal from "../../../components/Categorias/AdicionarCategoriaModal"
import EditarCategoriaModal from "../../../components/Categorias/EditarCategoriaModal"

export default function Produtos() {
  const [categorias, setCategorias] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalEditarOpen, setIsModalEditarOpen] = useState(false)
  const [categoriaIdEditar, setCategoriaIdEditar] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCategorias()
  }, [])

  const fetchCategorias = async () => {
    setIsLoading(true)
    try {
      const response = await api.get("/categorias")
      setCategorias(response.data)
    } catch (error) {
      console.error("Erro ao buscar categorias:", error)
    } finally {
      setIsLoading(false);
    }
  }

  const handleEditClick = (categoriaId) => {
    setCategoriaIdEditar(categoriaId)
    setIsModalEditarOpen(true)
  }

  return (
    <div className="container py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Categorias</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Adicionar Categoria
            </button>
          </div>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categorias.map((categoria) => (
                    <tr key={categoria.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{categoria.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{categoria.nome}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleEditClick(categoria.id)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && categorias && (
        <AdicionarCategoriaModal setIsOpen={setIsModalOpen} fetchCategorias={fetchCategorias} />
      )}

      {isModalEditarOpen && categoriaIdEditar && categorias && (
        <EditarCategoriaModal
          setIsOpen={setIsModalEditarOpen}
          fetchCategorias={fetchCategorias}
          categoriaId={categoriaIdEditar}
        />
      )}
    </div>
  )
}
