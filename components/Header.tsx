import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const getTitle = () => {
        const path = location.pathname;
        if (path === '/') return 'Warung PintarKu';
        if (path.startsWith('/products/edit')) return 'Edit Produk';
        if (path.startsWith('/products/add')) return 'Tambah Produk';
        if (path.startsWith('/products')) return 'ProdukKu';
        if (path.startsWith('/scanner')) return 'Scan Harga';
        if (path.startsWith('/cashier')) return 'Kasir Cepat';
        if (path.startsWith('/reports')) return 'Laporan Harian';
        if (path.startsWith('/settings')) return 'Pengaturan';
        if (path.startsWith('/assistant')) return 'Asisten Pintar';
        if (path.startsWith('/tutorial')) return 'Panduan Aplikasi';
        return 'Warung PintarKu';
    };

    const canGoBack = 
        location.pathname.startsWith('/products/add') || 
        location.pathname.startsWith('/products/edit') ||
        location.pathname.startsWith('/assistant') ||
        location.pathname.startsWith('/tutorial');
    
    return (
        <header className="fixed top-0 left-0 right-0 bg-green-500 text-white shadow-md z-10">
            <div className="max-w-lg mx-auto h-16 flex items-center px-4 relative">
                {canGoBack && (
                     <button onClick={() => navigate(-1)} className="absolute left-4 p-2 hover:bg-green-600 rounded-full transition-colors">
                        <ChevronLeft size={24} />
                    </button>
                )}
                <h1 className="text-xl font-bold w-full text-center">{getTitle()}</h1>
            </div>
        </header>
    );
}

export default Header;