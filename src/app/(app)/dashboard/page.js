"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalStock: 0,
        topCategories: [],
        totalPromotions: 0,
    });

    const fetchDashboardData = async () => {
        try {
            const [productsRes, categoriesRes, promotionsRes] = await Promise.all([
                api.get("/produtos"),
                api.get("/categorias"),
                api.get("/promocoes"),
            ]);

            const totalProducts = productsRes.data.length;
            const totalStock = productsRes.data.reduce((sum, prod) => sum + prod.estoque, 0);

            const categoryCounts = productsRes.data.reduce((acc, product) => {
                acc[product.categoria_id] = (acc[product.categoria_id] || 0) + 1;
                return acc;
            }, {});

            const topCategories = Object.entries(categoryCounts)
                .map(([categoryId, count]) => {
                    const category = categoriesRes.data.find(cat => cat.id === parseInt(categoryId));
                    return { name: category?.nome || "Sem Categoria", count };
                })
                .sort((a, b) => b.count - a.count)
                .slice(0, 5);

            const totalPromotions = promotionsRes.data.length;

            setStats({
                totalProducts,
                totalStock,
                topCategories,
                totalPromotions,
            });
        } catch (error) {
            console.error("Erro ao carregar dados do dashboard:", error);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-lg font-semibold">Total de Produtos</h2>
                    <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>

                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-lg font-semibold">Estoque Total</h2>
                    <p className="text-2xl font-bold">{stats.totalStock}</p>
                </div>

                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-lg font-semibold">Promoções Ativas</h2>
                    <p className="text-2xl font-bold">{stats.totalPromotions}</p>
                </div>

                <div className="bg-white shadow rounded p-4">
                    <h2 className="text-lg font-semibold">Top Categorias</h2>
                    <ul className="list-disc pl-5">
                        {stats.topCategories.map((cat, index) => (
                            <li key={index}>
                                {cat.name}: {cat.count} produtos
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
