"use client"

import { useState, useEffect } from "react"
import api from "../../../utils/api"
import AdicionarProdutoModal from "../../../components/Produtos/AdicionarProdutoModal"

export default function Produtos() {
  const [produtos, setProdutos] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProdutos()
  }, [])

  const fetchProdutos = async () => {
    setIsLoading(true)
    try {
      const response = await api.get("/produtos")
      setProdutos(response.data)
    } catch (error) {
      console.error("Erro ao buscar produtos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Produtos</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Adicionar Produto
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {produtos.map((produto) => (
                    <tr key={produto.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{produto.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{produto.nome}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {produto.preco}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{produto.estoque} unidade(s)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <AdicionarProdutoModal setIsOpen={setIsModalOpen}/>
      )}
    </div>
  )
}

