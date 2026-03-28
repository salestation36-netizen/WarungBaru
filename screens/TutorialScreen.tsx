
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ShoppingCart, BarChart2, ScanLine, PlusCircle, HelpCircle, User, Star, Package, CheckSquare, Banknote, Home, Settings, Camera, Receipt } from 'lucide-react';

const Step: React.FC<{ number: number; text: string; subtext?: string }> = ({ number, text, subtext }) => (
    <div className="flex items-start space-x-3 mb-4 last:mb-0">
        <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-xs mt-0.5 border border-green-200">
            {number}
        </div>
        <div>
            <p className="text-gray-800 font-medium text-sm">{text}</p>
            {subtext && <p className="text-gray-500 text-xs mt-1 leading-relaxed">{subtext}</p>}
        </div>
    </div>
);

const TutorialItem: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-3 bg-white shadow-sm hover:shadow-md transition-all duration-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${isOpen ? 'bg-green-600 text-white' : 'bg-green-50 text-green-600'} transition-colors`}>
                {icon}
            </div>
            <span className="font-bold text-gray-700 text-left text-sm lg:text-base">{title}</span>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>
      {isOpen && (
        <div className="p-5 bg-white border-t border-gray-100 animate-fade-in">
            {children}
        </div>
      )}
    </div>
  );
};

const TutorialScreen: React.FC = () => {
    return (
        <div className="p-4 max-w-lg mx-auto pb-20">
             <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6 rounded-2xl shadow-lg mb-6 flex flex-col items-center text-center">
                <div className="bg-white/20 p-3 rounded-full mb-3">
                    <HelpCircle size={32} className="text-white" />
                </div>
                <h2 className="text-xl font-bold">Panduan Aplikasi Lengkap</h2>
                <p className="text-green-50 text-sm mt-1">Pelajari setiap fitur Warung PintarKu secara detail.</p>
            </div>
            
            <div className="space-y-4">
                
                {/* 1. HOME DASHBOARD */}
                <TutorialItem title="1. Beranda (Dashboard)" icon={<Home size={20}/>}>
                    <Step number={1} text="Cek Statistik Harian" subtext="Kotak di bagian atas menampilkan 'Penjualan Hari Ini' (total uang masuk) dan 'Transaksi Hari Ini' (jumlah pembeli) secara real-time." />
                    <Step number={2} text="Akses Cepat" subtext="Gunakan 4 tombol menu utama di tengah layar untuk akses instan ke: Scan Barcode, Tambah Produk, Laporan Keuangan, atau Tanya AI." />
                    <Step number={3} text="Riwayat Transaksi" subtext="Daftar di bagian bawah menampilkan 5 transaksi terakhir yang terjadi, lengkap dengan jam dan total belanjanya." />
                </TutorialItem>

                {/* 2. PRODUK (INVENTORY) */}
                <TutorialItem title="2. Manajemen Produk" icon={<Package size={20}/>}>
                    <Step number={1} text="Melihat Daftar Barang" subtext="Buka menu 'ProdukKu'. Gunakan kolom pencarian di atas untuk mencari nama barang, atau gunakan filter tombol (Semua/Stok Sedikit/Habis) untuk cek ketersediaan." />
                    <Step number={2} text="Menambah Produk Baru" subtext="Tekan tombol (+) di pojok kanan bawah. Isi Nama Produk, Harga Beli (Modal), Harga Jual, dan Stok Awal." />
                    <Step number={3} text="Asisten Deskripsi AI" subtext="Saat menambah produk, tekan ikon '✨' di kolom Deskripsi. AI akan otomatis membuatkan kalimat promosi yang menarik untuk produk tersebut." />
                    <Step number={4} text="Edit & Hapus" subtext="Tekan ikon 'Pensil' pada kartu produk untuk mengubah harga/stok. Tekan ikon 'Sampah' untuk menghapus produk dari daftar." />
                </TutorialItem>

                {/* 3. SCANNER */}
                <TutorialItem title="3. Scan Barcode" icon={<Camera size={20}/>}>
                    <Step number={1} text="Mulai Scan" subtext="Buka menu 'Scan'. Arahkan kamera HP Anda ke barcode pada kemasan produk." />
                    <Step number={2} text="Hasil Scan" subtext="Jika produk sudah terdaftar, detail harga akan muncul. Jika belum, Anda akan diminta untuk menambahkannya sebagai produk baru." />
                    <Step number={3} text="Simulasi (Mode Demo)" subtext="Khusus versi web ini, jika kamera tidak aktif, tekan tombol 'Simulasikan Scan' untuk mencoba alur kerja tanpa barcode fisik." />
                    <Step number={4} text="Tindak Lanjut" subtext="Setelah produk terdeteksi, pilih 'Tambah Lagi' untuk scan barang lain, atau 'Lanjut ke Kasir' untuk pembayaran." />
                </TutorialItem>

                {/* 4. KASIR (TRANSAKSI) */}
                <TutorialItem title="4. Kasir & Pembayaran" icon={<ShoppingCart size={20}/>}>
                    <Step number={1} text="Cek Keranjang" subtext="Semua barang yang Anda pilih (via Scan atau Manual dari menu Produk) akan masuk ke halaman Kasir." />
                    <Step number={2} text="Edit Jumlah" subtext="Gunakan tombol (+) atau (-) untuk menambah/mengurangi jumlah barang. Tekan ikon sampah untuk membatalkan item tersebut." />
                    <Step number={3} text="Input Pembayaran" subtext="Lihat angka 'Total' belanja. Masukkan nominal uang yang diterima dari pelanggan pada kolom 'Bayar'." />
                    <Step number={4} text="Hitung Kembalian" subtext="Aplikasi otomatis menghitung uang kembalian. Jika uang kurang, tombol proses tidak akan aktif." />
                    <Step number={5} text="Selesaikan" subtext="Tekan tombol 'Selesaikan Transaksi'. Stok barang akan otomatis berkurang dari database." />
                </TutorialItem>

                {/* 5. STRUK & SHARE */}
                <TutorialItem title="5. Struk & Bagikan" icon={<Receipt size={20}/>}>
                    <Step number={1} text="Bukti Transaksi" subtext="Setelah transaksi sukses, struk digital akan muncul berisi detail barang dan harga." />
                    <Step number={2} text="Kirim via WhatsApp" subtext="Tekan tombol 'Bagikan via WhatsApp' untuk mengirim struk langsung ke nomor HP pelanggan tanpa perlu mencetak kertas." />
                    <Step number={3} text="Cetak Struk" subtext="Gunakan tombol 'Cetak' jika perangkat Anda terhubung dengan printer thermal bluetooth/USB." />
                </TutorialItem>

                {/* 6. LAPORAN (REPORTS) */}
                <TutorialItem title="6. Laporan & Analisa" icon={<BarChart2 size={20}/>}>
                    <Step number={1} text="Ringkasan Omzet" subtext="Menu 'Laporan' menampilkan total pendapatan hari ini dan persentase kenaikan/penurunan dibanding kemarin." />
                    <Step number={2} text="Analisa Cerdas AI" subtext="Tekan tombol 'Analisa Penjualan'. AI akan membaca data penjualan Anda dan memberikan saran bisnis (misal: barang apa yang perlu distok ulang)." />
                    <Step number={3} text="Grafik Mingguan" subtext="Grafik batang menunjukkan tren penjualan Anda selama 7 hari terakhir agar Anda tahu hari apa warung paling ramai." />
                    <Step number={4} text="Produk Terlaris" subtext="Lihat daftar 'Top Produk' untuk mengetahui 3-5 barang yang paling laku hari ini." />
                </TutorialItem>

                 {/* 7. PENGATURAN */}
                 <TutorialItem title="7. Pengaturan & Reset" icon={<Settings size={20}/>}>
                    <Step number={1} text="Reset Data" subtext="Gunakan menu 'Restore/Reset Data Awal' jika Anda ingin menghapus semua data latihan dan memulai pembukuan warung dari nol." />
                    <Step number={2} text="Keluar" subtext="Tombol Keluar digunakan untuk mengakhiri sesi pemakaian aplikasi." />
                </TutorialItem>
            </div>

            <div className="mt-8 text-center pb-8">
                <p className="text-xs text-gray-400">Warung PintarKu v1.0.0</p>
                <p className="text-xs text-gray-300">Panduan Penggunaan Lengkap</p>
            </div>
        </div>
    );
}

export default TutorialScreen;
