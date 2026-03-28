
import React, { useState } from 'react';
import { Camera, Type, CheckCircle, XCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

const ScannerScreen: React.FC = () => {
    const { getProductByBarcode, addProductToCart, products } = useAppContext();
    const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
    const [notFound, setNotFound] = useState(false);
    const navigate = useNavigate();

    const handleManualScan = (barcode: string) => {
        const product = getProductByBarcode(barcode);
        if (product) {
            setScannedProduct(product);
            setNotFound(false);
        } else {
            setScannedProduct(null);
            setNotFound(true);
        }
    };

    const simulateScan = () => {
        // Simulate scanning a random product from inventory
        if (products.length > 0) {
            const randomProduct = products[Math.floor(Math.random() * products.length)];
            setScannedProduct(randomProduct);
            setNotFound(false);
        } else {
             setScannedProduct(null);
             setNotFound(true);
        }
    };

    const handleAddToCart = () => {
        if (scannedProduct) {
            addProductToCart(scannedProduct);
            setScannedProduct(null);
        }
    };
    
    const handleGoToCashier = () => {
        if(scannedProduct) {
            addProductToCart(scannedProduct);
        }
        navigate('/cashier');
    }

    return (
        <div className="flex flex-col items-center p-4 max-w-lg mx-auto h-full">
            <div className="w-full aspect-square bg-gray-900 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <Camera className="text-gray-600" size={80} />
                <div className="absolute inset-0 border-4 border-green-500 rounded-2xl animate-pulse"></div>
                 <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500 animate-ping"></div>
                <p className="absolute bottom-4 text-white bg-black bg-opacity-50 px-4 py-1 rounded-full">Arahkan kamera ke barcode</p>
            </div>

            <button
                onClick={simulateScan}
                className="mt-6 w-full bg-green-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 hover:bg-green-600 transition-all transform hover:scale-105"
            >
                <Camera size={24} />
                <span>SIMULASIKAN SCAN</span>
            </button>
            
            {scannedProduct && (
                <div className="mt-4 w-full bg-white p-4 rounded-xl shadow-lg animate-fade-in-up">
                    <div className="flex items-center space-x-3">
                        <CheckCircle className="text-green-500" size={32} />
                        <div>
                            <p className="font-bold text-lg">{scannedProduct.name}</p>
                            <p className="text-green-600 font-semibold text-xl">Rp {scannedProduct.sellingPrice.toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                        <button onClick={handleAddToCart} className="w-full bg-green-100 text-green-700 font-semibold py-2 rounded-lg">Tambah Lagi</button>
                        <button onClick={handleGoToCashier} className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg">Lanjut ke Kasir</button>
                    </div>
                </div>
            )}
            
            {notFound && (
                 <div className="mt-4 w-full bg-white p-4 rounded-xl shadow-lg animate-fade-in-up flex items-center space-x-3">
                     <XCircle className="text-red-500" size={32}/>
                     <div>
                        <p className="font-bold text-lg text-red-600">Produk Tidak Ditemukan</p>
                        <p className="text-sm text-gray-600">Barcode tidak terdaftar. Silakan tambah produk baru.</p>
                     </div>
                 </div>
            )}
            
            <p className="mt-4 text-gray-500 text-sm">Ini adalah simulasi. Klik tombol untuk 'scan' produk acak.</p>
        </div>
    );
};

export default ScannerScreen;
