
import React from 'react';
import { Link } from 'react-router-dom';
import { ScanLine, PlusCircle, BarChart2, Clock, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Transaction } from '../types';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4">
        <div className="bg-green-100 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const QuickActionButton: React.FC<{ to: string; label: string; icon: React.ReactNode; isSpecial?: boolean }> = ({ to, label, icon, isSpecial }) => (
    <Link to={to} className={`flex flex-col items-center space-y-2 text-center transition-colors ${isSpecial ? 'text-blue-600 hover:text-blue-700' : 'text-green-700 hover:text-green-800'}`}>
        <div className={`${isSpecial ? 'bg-blue-500' : 'bg-green-500'} text-white p-4 rounded-full shadow-lg transform transition-transform hover:scale-105`}>
            {icon}
        </div>
        <span className="font-semibold text-sm">{label}</span>
    </Link>
);


const DashboardScreen: React.FC = () => {
    const { transactions } = useAppContext();

    const today = new Date().toISOString().split('T')[0];
    const todayTransactions = transactions.filter(t => t.timestamp.startsWith(today));
    const todaySales = todayTransactions.reduce((sum, t) => sum + t.total, 0);

    const recentTransactions = transactions.slice(0, 5);
    
    return (
        <div className="p-4 space-y-6 max-w-lg mx-auto">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-800">Selamat Datang!</h1>
                <p className="text-gray-600">Warung PintarKu siap membantu.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <StatCard 
                    title="Penjualan Hari Ini" 
                    value={`Rp ${todaySales.toLocaleString('id-ID')}`} 
                    icon={<BarChart2 className="text-green-600" />} />
                <StatCard 
                    title="Transaksi Hari Ini" 
                    value={todayTransactions.length.toString()} 
                    icon={<Clock className="text-green-600" />} />
            </div>

            <div className="grid grid-cols-4 gap-4 pt-4">
                <QuickActionButton to="/scanner" label="Scan" icon={<ScanLine size={24} />} />
                <QuickActionButton to="/products/add" label="Tambah" icon={<PlusCircle size={24} />} />
                <QuickActionButton to="/reports" label="Laporan" icon={<BarChart2 size={24} />} />
                <QuickActionButton to="/assistant" label="Tanya AI" icon={<Sparkles size={24} />} isSpecial />
            </div>

            <div>
                <h2 className="text-lg font-bold text-gray-700 mb-2">Transaksi Terakhir</h2>
                <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
                    {recentTransactions.length > 0 ? (
                        recentTransactions.map((trx: Transaction) => (
                            <div key={trx.id} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                                <div>
                                    <p className="font-semibold">Transaksi #{trx.id.slice(-6)}</p>
                                    <p className="text-xs text-gray-500">{new Date(trx.timestamp).toLocaleTimeString('id-ID')}</p>
                                </div>
                                <p className="font-bold text-green-600">Rp {trx.total.toLocaleString('id-ID')}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-4">Belum ada transaksi.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardScreen;
