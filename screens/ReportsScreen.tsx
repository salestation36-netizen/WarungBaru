
import React, { useMemo, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, Sparkles } from 'lucide-react';
import { analyzeSalesData } from '../services/geminiService';

const ReportsScreen: React.FC = () => {
    const { transactions } = useAppContext();
    const [analysis, setAnalysis] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const { todayTotal, yesterdayTotal, topProducts, weeklyData } = useMemo(() => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const todayStr = today.toISOString().split('T')[0];
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        const todayTransactions = transactions.filter(t => t.timestamp.startsWith(todayStr));
        const yesterdayTransactions = transactions.filter(t => t.timestamp.startsWith(yesterdayStr));

        const todayTotal = todayTransactions.reduce((sum, t) => sum + t.total, 0);
        const yesterdayTotal = yesterdayTransactions.reduce((sum, t) => sum + t.total, 0);
        
        const productsCount = todayTransactions.flatMap(t => t.items).reduce((acc, item) => {
            acc[item.name] = (acc[item.name] || 0) + item.quantity;
            return acc;
        }, {} as Record<string, number>);

        const topProducts = Object.entries(productsCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const weeklyData = Array.from({ length: 7 }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const total = transactions
                .filter(t => t.timestamp.startsWith(dateStr))
                .reduce((sum, t) => sum + t.total, 0);
            return { name: d.toLocaleDateString('id-ID', { weekday: 'short' }), total };
        }).reverse();

        return { todayTotal, yesterdayTotal, topProducts, weeklyData };
    }, [transactions]);

    const percentageChange = useMemo(() => {
        if (yesterdayTotal === 0) return todayTotal > 0 ? 100 : 0;
        return ((todayTotal - yesterdayTotal) / yesterdayTotal) * 100;
    }, [todayTotal, yesterdayTotal]);
    
    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        const todayTransactions = transactions.filter(t => t.timestamp.startsWith(new Date().toISOString().split('T')[0]));
        const result = await analyzeSalesData(todayTransactions, yesterdayTotal);
        setAnalysis(result);
        setIsAnalyzing(false);
    };

    return (
        <div className="p-4 space-y-6 max-w-lg mx-auto">
            <div>
                <h2 className="text-lg font-bold">Ringkasan Hari Ini</h2>
                <div className="mt-2 p-4 bg-white rounded-xl shadow-md">
                    <p className="text-gray-500">Total Pendapatan</p>
                    <p className="text-3xl font-bold text-green-600">Rp {todayTotal.toLocaleString('id-ID')}</p>
                    <div className={`mt-1 flex items-center text-sm ${percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {percentageChange >= 0 ? <ArrowUp size={16}/> : <ArrowDown size={16}/>}
                        <span>{percentageChange.toFixed(1)}% dari kemarin</span>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-bold">Analisis AI</h2>
                <div className="mt-2 p-4 bg-white rounded-xl shadow-md">
                    {analysis ? (
                        <p className="text-sm text-gray-700 italic">"{analysis}"</p>
                    ) : (
                         <p className="text-sm text-gray-500">Klik tombol di bawah untuk mendapatkan wawasan dari AI.</p>
                    )}
                    <button onClick={handleAnalyze} disabled={isAnalyzing} className="mt-3 w-full bg-green-500 text-white text-sm font-semibold py-2 px-3 rounded-lg flex items-center justify-center space-x-2 disabled:bg-green-300">
                        {isAnalyzing ? "Menganalisis..." : <><Sparkles size={16}/><span>Analisa Penjualan</span></>}
                    </button>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-bold">Grafik Penjualan 7 Hari</h2>
                <div className="mt-2 p-4 bg-white rounded-xl shadow-md h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" fontSize={12} />
                            <YAxis width={40} fontSize={12} tickFormatter={(value) => `${Number(value)/1000}k`} />
                            <Tooltip formatter={(value) => `Rp ${Number(value).toLocaleString('id-ID')}`}/>
                            <Bar dataKey="total" fill="#4ADE80" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-bold">Produk Terlaris Hari Ini</h2>
                <div className="mt-2 p-4 bg-white rounded-xl shadow-md space-y-2">
                    {topProducts.length > 0 ? (
                        topProducts.map(([name, quantity]) => (
                             <div key={name} className="flex justify-between items-center text-sm">
                                <span className="text-gray-700">{name}</span>
                                <span className="font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{quantity} terjual</span>
                             </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">Belum ada produk terjual hari ini.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportsScreen;
