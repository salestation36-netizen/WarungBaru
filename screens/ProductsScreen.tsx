
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Box } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types';

const ProductCard: React.FC<{ product: Product; onDelete: (id: string) => void }> = ({ product, onDelete }) => (
    <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4">
        <div className="bg-green-100 p-3 rounded-full">
            <Box className="text-green-600" size={24}/>
        </div>
        <div className="flex-grow">
            <p className="font-bold text-gray-800">{product.name}</p>
            <p className="text-sm text-green-600 font-semibold">Rp {product.sellingPrice.toLocaleString('id-ID')}</p>
            <p className={`text-sm ${product.stock <= 5 ? 'text-red-500' : 'text-gray-500'}`}>
                Stok: {product.stock}
            </p>
        </div>
        <div className="flex space-x-2">
            <Link to={`/products/edit/${product.id}`} className="p-2 text-blue-500 hover:text-blue-700">
                <Edit size={20} />
            </Link>
            <button onClick={() => onDelete(product.id)} className="p-2 text-red-500 hover:text-red-700">
                <Trash2 size={20} />
            </button>
        </div>
    </div>
);

const ProductsScreen: React.FC = () => {
    const { products, setProducts } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredProducts = useMemo(() => {
        return products
            .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(p => {
                if (filter === 'low') return p.stock <= 5 && p.stock > 0;
                if (filter === 'empty') return p.stock === 0;
                return true;
            });
    }, [products, searchTerm, filter]);

    const handleDelete = (id: string) => {
        if(window.confirm('Anda yakin ingin menghapus produk ini?')){
            setProducts(prev => prev.filter(p => p.id !== id));
        }
    }

    return (
        <div className="p-4 space-y-4 max-w-lg mx-auto">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>

            <div className="flex space-x-2">
                <button onClick={() => setFilter('all')} className={`px-4 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Semua</button>
                <button onClick={() => setFilter('low')} className={`px-4 py-1 rounded-full text-sm ${filter === 'low' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>Stok Sedikit</button>
                <button onClick={() => setFilter('empty')} className={`px-4 py-1 rounded-full text-sm ${filter === 'empty' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>Stok Habis</button>
            </div>

            <div className="space-y-3">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => <ProductCard key={product.id} product={product} onDelete={handleDelete} />)
                ) : (
                    <p className="text-center text-gray-500 py-8">Produk tidak ditemukan.</p>
                )}
            </div>

            <Link
                to="/products/add"
                className="fixed bottom-24 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105"
            >
                <Plus size={28} />
            </Link>
        </div>
    );
};

export default ProductsScreen;
