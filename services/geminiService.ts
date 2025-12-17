import { GoogleGenAI } from "@google/genai";
import { AnalysisRequest } from '../types';

export const analyzeProfitability = async (data: AnalysisRequest): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "API Key tidak ditemukan. Mohon konfigurasi environment variable.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `
      Bertindak sebagai ahli e-commerce Indonesia. Analisis data penjualan Shopee berikut:
      - Harga Jual: Rp ${data.sellingPrice.toLocaleString('id-ID')}
      - HPP (Modal): Rp ${data.costOfGoods.toLocaleString('id-ID')}
      - Keuntungan Bersih: Rp ${data.netProfit.toLocaleString('id-ID')}
      - Margin Profit: ${data.profitMargin.toFixed(2)}%
      - Tipe Penjual: ${data.sellerType}

      Berikan analisis singkat (maksimal 3 kalimat) tentang kesehatan margin ini untuk pasar Indonesia.
      Berikan 1 tips konkret dan dapat ditindaklanjuti untuk meningkatkan profitabilitas.
      Gunakan bahasa Indonesia yang profesional namun mudah dimengerti.
      Jangan gunakan markdown formatting yang berat, cukup text biasa.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Gagal mendapatkan analisis.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Maaf, terjadi kesalahan saat menghubungi asisten AI.";
  }
};