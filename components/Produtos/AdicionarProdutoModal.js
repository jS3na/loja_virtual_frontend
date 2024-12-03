import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../utils/api";

const AdicionarProdutoModal = ({ setIsOpen }) => {
    const [formData, setFormData] = useState({
        nome: "",
        descricao: "",
        preco: "",
        estoque: "",
        categoria_id: "",
    });
    const [message, setMessage] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        fetchCategorias()
    }, []);

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const fetchCategorias = async () => {
        try {
            const response = await api.get("/categorias");
            setCategorias(response.data);
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
        }
    };

    const handleCategoriaSelect = (e) => {
        const categoriaId = e.target.value;
        setSelectedCategoria(categoriaId);
        setFormData((prev) => ({ ...prev, categoria_id: selectedCategoria }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/produtos/store", formData);
            setMessage("Produto adicionado com sucesso!");
            setFormData({ nome: "", descricao: "", preco: "", estoque: "", categoria_id: "" });
            setTimeout(() => {
                setMessage("");
                setIsOpen(false);
            }, 2000);
        } catch (error) {
            console.error("Erro ao adicionar o produto:", error);
            setMessage("Erro ao adicionar o produto. Tente novamente.");
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
                            Adicionar Novo Produto
                        </h3>
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-4">
                                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                                <input
                                    type="text"
                                    id="nome"
                                    value={formData.nome}
                                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="preco" className="block text-sm font-medium text-gray-700">Preço</label>
                                <input
                                    type="number"
                                    id="preco"
                                    step="0.01"
                                    value={formData.preco}
                                    onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="estoque" className="block text-sm font-medium text-gray-700">Estoque</label>
                                <input
                                    type="number"
                                    id="estoque"
                                    value={formData.estoque}
                                    onChange={(e) => setFormData({ ...formData, estoque: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
                                <select
                                    id="categoria"
                                    value={formData.categoria_id}
                                    onChange={(e) => setFormData({ ...formData, categoria_id: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Selecione uma Categoria</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button
                                    type="submit"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                                >
                                    Adicionar Produto
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdicionarProdutoModal;
