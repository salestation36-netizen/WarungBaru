import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, UploadCloud, Download, Info, LogOut, ChevronRight, BookOpen } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { PRELOADED_PRODUCTS } from '../constants';

const SettingsItem: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
        <div className="text-green-600 mr-4">
            {icon}
        </div>
        <span className="flex-grow text-left font-medium text-gray-700">{label}</span>
        <ChevronRight className="text-gray-400" />
    </button>
);

const SettingsScreen: React.FC = () => {
    const { setProducts, setTransactions, setCart } = useAppContext();
    const navigate = useNavigate();

    const handleBackup = () => {
        alert('Fitur backup ke Google Drive akan segera tersedia!');
    };
    
    const handleRestore = () => {
        if(window.confirm('Fitur ini akan me-reset data Anda ke data awal. Lanjutkan?')){
            setProducts(PRELOADED_PRODUCTS);
            setTransactions([]);
            setCart([]);
            alert('Data berhasil di-reset ke data awal!');
        }
    }
    
    const handleLogout = () => {
        if(window.confirm('Anda yakin ingin keluar? Semua data yang belum tersimpan akan hilang.')){
             // In a real app, this would clear authentication tokens and navigate to login.
             // Here we just simulate it.
             alert('Anda telah berhasil keluar.');
             // For simulation, we can reset the state
             setProducts(PRELOADED_PRODUCTS);
             setTransactions([]);
             setCart([]);
        }
    };

    return (
        <div className="p-4 space-y-4 max-w-lg mx-auto">
            <div className="p-4 bg-white rounded-xl shadow-md text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
                    <User className="text-green-600" size={40} />
                </div>
                <h2 className="mt-2 text-xl font-bold">Warung Ibu Siti</h2>
                <p className="text-sm text-gray-500">warung.siti@email.com</p>
            </div>
            
            <div className="space-y-3">
                 <SettingsItem icon={<BookOpen />} label="Panduan Penggunaan" onClick={() => navigate('/tutorial')} />
                 <SettingsItem icon={<UploadCloud />} label="Backup Data ke Google Drive" onClick={handleBackup} />
                 <SettingsItem icon={<Download />} label="Restore/Reset Data Awal" onClick={handleRestore} />
                 <SettingsItem icon={<Bell />} label="Notifikasi Stok" onClick={() => alert('Pengaturan notifikasi akan segera tersedia!')} />
                 <SettingsItem icon={<Info />} label="Tentang Aplikasi" onClick={() => alert('Warung PintarKu v1.0.0')} />
                 <SettingsItem icon={<LogOut />} label="Keluar" onClick={handleLogout} />
            </div>

        </div>
    );
};

export default SettingsScreen;