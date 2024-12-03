import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../utils/api";

const EditarPromocaoModal = ({ setIsOpen, produtos, promocaoId, fetchPromocoes }) => {
    const [formData, setFormData] = useState({
        produto_id: "",
        descricao: "",
        preco_promocao: "",
    });
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPromocao = async () => {
            try {
                const response = await api.get(`/promocoes/${promocaoId}`);
                setFormData({
                    produto_id: response.data.produto_id,
                    descricao: response.data.descricao,
                    preco_promocao: response.data.preco_promocao,
                });
                setIsLoading(false);
            } catch (error) {
                console.error("Erro ao carregar a promoção:", error);
                setMessage("Erro ao carregar os dados da promoção.");
                setIsLoading(false);
            }
        };

        fetchPromocao();
    }, [promocaoId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/promocoes/update/${promocaoId}`, formData);
            setMessage("Promoção atualizada com sucesso!");
            setIsOpen(false);
            fetchPromocoes();
        } catch (error) {
            console.error("Erro ao atualizar a promoção:", error);
            setMessage("Erro ao atualizar a promoção. Tente novamente.");
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            Editar Promoção
                        </h3>
                        {isLoading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="mt-4">
                                <div className="mb-4">
                                    <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
                                    <input
                                        type="text"
                                        id="descricao"
                                        name="descricao"
                                        value={formData.descricao}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="preco_promocao" className="block text-sm font-medium text-gray-700">Preço da Promoção</label>
                                    <input
                                        type="number"
                                        id="preco_promocao"
                                        name="preco_promocao"
                                        step="0.01"
                                        value={formData.preco_promocao}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="produto" className="block text-sm font-medium text-gray-700">Produto</label>
                                    <select
                                        disabled={true}
                                        id="produto"
                                        name="produto_id"
                                        value={formData.produto_id}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="">Selecione um Produto</option>
                                        {produtos.map((produto) => (
                                            <option key={produto.id} value={produto.id}>
                                                {produto.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                                    >
                                        Atualizar Promoção
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarPromocaoModal;
