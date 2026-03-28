import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateProductDescription = async (productName: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Buatkan deskripsi produk singkat dan menarik dalam Bahasa Indonesia untuk produk warung bernama "${productName}". Maksimal 20 kata.`,
        });
        return response.text || "Deskripsi tidak tersedia.";
    } catch (error) {
        console.error("Error generating product description:", error);
        return "Gagal membuat deskripsi. Coba lagi.";
    }
};

export const analyzeSalesData = async (todayTransactions: Transaction[], yesterdayTotal: number): Promise<string> => {
    if (todayTransactions.length === 0) {
        return "Belum ada penjualan hari ini. Semangat! Mari kita mulai transaksi pertama.";
    }

    const todayTotal = todayTransactions.reduce((sum, t) => sum + t.total, 0);
    const topProducts = todayTransactions
        .flatMap(t => t.items)
        .reduce((acc, item) => {
            acc[item.name] = (acc[item.name] || 0) + item.quantity;
            return acc;
        }, {} as Record<string, number>);

    const topSellingItems = Object.entries(topProducts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([name, quantity]) => `${name} (${quantity} terjual)`)
        .join(', ');

    const prompt = `
        Anda adalah seorang analis bisnis untuk toko kelontong (warung) di Indonesia.
        Berikan ringkasan dan saran bisnis yang sederhana, positif, dan mudah dimengerti berdasarkan data berikut.
        Gunakan Bahasa Indonesia yang santai.

        Data Penjualan Hari Ini:
        - Total Pendapatan: Rp ${todayTotal.toLocaleString('id-ID')}
        - Jumlah Transaksi: ${todayTransactions.length}
        - Produk Terlaris: ${topSellingItems}

        Data Penjualan Kemarin:
        - Total Pendapatan Kemarin: Rp ${yesterdayTotal.toLocaleString('id-ID')}

        Tugas Anda:
        1. Beri komentar singkat tentang performa penjualan hari ini dibandingkan kemarin.
        2. Sebutkan produk terlaris.
        3. Berikan satu saran praktis yang bisa dilakukan pemilik warung untuk meningkatkan penjualan besok, berdasarkan produk terlaris.
        
        Format jawaban dalam satu paragraf singkat.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: prompt,
        });
        return response.text || "Analisis tidak tersedia.";
    } catch (error) {
        console.error("Error analyzing sales data:", error);
        return "Gagal menganalisa data penjualan. Pastikan koneksi internet stabil.";
    }
};

export const askAssistant = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "Anda adalah asisten cerdas untuk pemilik 'Warung PintarKu'. Anda mengerti cara pakai aplikasi: 'ProdukKu' untuk stok, 'Scan' untuk scan barcode, 'Kasir' untuk transaksi, 'Laporan' untuk omzet. Jika user tanya cara pakai, jelaskan fitur tsb. Jika user tanya bisnis, beri tips warung. Jawab dalam Bahasa Indonesia sopan.",
            }
        });
        return response.text || "Maaf, saya tidak dapat menjawab saat ini.";
    } catch (error) {
        console.error("Error asking assistant:", error);
        return "Maaf, terjadi gangguan koneksi.";
    }
};