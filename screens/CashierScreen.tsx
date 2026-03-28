
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ScanLine } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const CashierScreen: React.FC = () => {
    const { cart, updateCartItemQuantity, addTransaction, clearCart } = useAppContext();
    const navigate = useNavigate();
    const [payment, setPayment] = useState(0);

    const total = useMemo(() => cart.reduce((sum, item) => sum + item.sellingPrice * item.quantity, 0), [cart]);
    const change = useMemo(() => (payment > 0 ? payment - total : 0), [payment, total]);

    const handleCompleteTransaction = () => {
        if (total === 0) {
            alert('Keranjang kosong!');
            return;
        }
        if (payment < total) {
            alert('Pembayaran kurang!');
            return;
        }
        const newTransaction = addTransaction({ items: cart, total, payment, change });
        navigate(`/receipt/${newTransaction.id}`);
    };

    return (
        <div className="p-4 max-w-lg mx-auto flex flex-col h-full">
            <div className="flex-grow overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Keranjang Belanja</h2>
                {cart.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-500">Keranjang masih kosong.</p>
                        <button onClick={() => navigate('/scanner')} className="mt-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg flex items-center mx-auto space-x-2">
                            <ScanLine size={20}/>
                            <span>Mulai Scan</span>
                        </button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {cart.map(item => (
                            <div key={item.id} className="bg-white p-3 rounded-lg shadow flex items-center">
                                <div className="flex-grow">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-gray-500">Rp {item.sellingPrice.toLocaleString('id-ID')}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)} className="p-1 bg-gray-200 rounded-full"><Minus size={16}/></button>
                                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                                    <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)} className="p-1 bg-gray-200 rounded-full"><Plus size={16}/></button>
                                </div>
                                <button onClick={() => updateCartItemQuantity(item.id, 0)} className="ml-3 text-red-500 p-1"><Trash2 size={20}/></button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="mt-4 pt-4 border-t">
                <div className="space-y-2 text-lg">
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>Rp {total.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="payment" className="font-medium">Bayar</label>
                        <input 
                            id="payment"
                            type="number" 
                            value={payment || ''}
                            onChange={(e) => setPayment(Number(e.target.value))}
                            placeholder="Jumlah bayar"
                            className="w-40 text-right font-bold text-green-600 p-2 border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
                        />
                    </div>
                    <div className="flex justify-between">
                        <span>Kembali</span>
                        <span>Rp {change > 0 ? change.toLocaleString('id-ID') : 0}</span>
                    </div>
                </div>
                <button 
                    onClick={handleCompleteTransaction}
                    disabled={cart.length === 0}
                    className="mt-4 w-full bg-green-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-green-700 transition disabled:bg-gray-400">
                    Selesaikan Transaksi
                </button>
            </div>
        </div>
    );
};

export default CashierScreen;
