
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types';
import { generateProductDescription } from '../services/geminiService';
import { Sparkles } from 'lucide-react';

const AddEditProductScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { products, setProducts } = useAppContext();
    const isEditing = Boolean(id);
    
    const [product, setProduct] = useState<Omit<Product, 'id'>>({
        name: '',
        purchasePrice: 0,
        sellingPrice: 0,
        stock: 0,
        barcode: '',
        category: '',
        description: ''
    });
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (isEditing) {
            const existingProduct = products.find(p => p.id === id);
            if (existingProduct) {
                setProduct(existingProduct);
            }
        }
    }, [id, isEditing, products]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: name === 'purchasePrice' || name === 'sellingPrice' || name === 'stock' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...product } : p)));
        } else {
            const newProduct: Product = { ...product, id: product.barcode || uuidv4() };
            setProducts(prev => [...prev, newProduct]);
        }
        navigate('/products');
    };
    
    const handleGenerateDescription = async () => {
        if (!product.name) {
            alert("Harap masukkan nama produk terlebih dahulu.");
            return;
        }
        setIsGenerating(true);
        const desc = await generateProductDescription(product.name);
        setProduct(prev => ({...prev, description: desc}));
        setIsGenerating(false);
    }

    return (
        <div className="p-4 max-w-lg mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Produk</label>
                    <input type="text" name="name" id="name" value={product.name} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
                </div>
                 <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi</label>
                    <div className="relative">
                        <input type="text" name="description" id="description" value={product.description} onChange={handleChange} placeholder="Deskripsi singkat produk" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
                        <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="absolute inset-y-0 right-0 flex items-center px-3 bg-green-100 text-green-700 rounded-r-md disabled:opacity-50">
                            {isGenerating ? '...' : <Sparkles size={16}/>}
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">Harga Beli</label>
                        <input type="number" name="purchasePrice" id="purchasePrice" value={product.purchasePrice} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
                    </div>
                    <div>
                        <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700">Harga Jual</label>
                        <input type="number" name="sellingPrice" id="sellingPrice" value={product.sellingPrice} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
                    </div>
                </div>
                 <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Jumlah Stok</label>
                    <input type="number" name="stock" id="stock" value={product.stock} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
                </div>
                 <div>
                    <label htmlFor="barcode" className="block text-sm font-medium text-gray-700">Barcode (opsional)</label>
                    <input type="text" name="barcode" id="barcode" value={product.barcode} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                     <button type="button" onClick={() => navigate('/products')} className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Batal</button>
                     <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">{isEditing ? 'Simpan Perubahan' : 'Tambah Produk'}</button>
                </div>
            </form>
        </div>
    );
};

export default AddEditProductScreen;
