
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Printer, Share2, ShoppingBag } from 'lucide-react';

const ReceiptScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { transactions } = useAppContext();
    const transaction = transactions.find(t => t.id === id);

    if (!transaction) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
                <h1 className="text-2xl font-bold text-red-600">Transaksi tidak ditemukan!</h1>
                <Link to="/" className="mt-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg">
                    Kembali ke Home
                </Link>
            </div>
        );
    }

    const receiptText = `*Struk Belanja Warung PintarKu*
---------------------------------
ID Transaksi: ${transaction.id.slice(-6)}
Tanggal: ${new Date(transaction.timestamp).toLocaleString('id-ID')}
---------------------------------
*Barang:*
${transaction.items.map(item => `${item.name} (${item.quantity} x Rp ${item.sellingPrice.toLocaleString('id-ID')}) = Rp ${(item.quantity * item.sellingPrice).toLocaleString('id-ID')}`).join('\n')}
---------------------------------
*Total: Rp ${transaction.total.toLocaleString('id-ID')}*
Bayar: Rp ${transaction.payment.toLocaleString('id-ID')}
Kembali: Rp ${transaction.change.toLocaleString('id-ID')}
---------------------------------
Terima kasih telah berbelanja!`;

    const handleShareWhatsApp = () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(receiptText)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-xl p-6 font-mono text-sm text-gray-800">
                <div className="text-center mb-4">
                    <h2 className="text-xl font-bold">Warung PintarKu</h2>
                    <p>Struk Belanja</p>
                </div>
                <div className="border-t border-b border-dashed border-gray-400 py-2">
                    <p>ID: {transaction.id.slice(-6)}</p>
                    <p>Tgl: {new Date(transaction.timestamp).toLocaleString('id-ID')}</p>
                </div>
                <div className="py-2 space-y-1">
                    {transaction.items.map(item => (
                        <div key={item.id} className="flex justify-between">
                            <span>{item.name} x{item.quantity}</span>
                            <span>{(item.quantity * item.sellingPrice).toLocaleString()}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-dashed border-gray-400 pt-2 space-y-1 text-base">
                    <div className="flex justify-between font-bold">
                        <span>TOTAL</span>
                        <span>{transaction.total.toLocaleString()}</span>
                    </div>
                     <div className="flex justify-between">
                        <span>BAYAR</span>
                        <span>{transaction.payment.toLocaleString()}</span>
                    </div>
                     <div className="flex justify-between">
                        <span>KEMBALI</span>
                        <span>{transaction.change.toLocaleString()}</span>
                    </div>
                </div>
                <p className="text-center mt-4 pt-2 border-t border-dashed border-gray-400">Terima kasih!</p>
            </div>
            <div className="w-full max-w-sm mt-6 space-y-2">
                <button onClick={handleShareWhatsApp} className="w-full bg-green-500 text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2">
                    <Share2 />
                    <span>Bagikan via WhatsApp</span>
                </button>
                 <button onClick={() => window.print()} className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2">
                    <Printer />
                    <span>Cetak Struk</span>
                </button>
                <button onClick={() => navigate('/cashier')} className="w-full bg-gray-700 text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2">
                    <ShoppingBag />
                    <span>Transaksi Baru</span>
                </button>
            </div>
        </div>
    );
};

export default ReceiptScreen;
