import React from 'react';
import { CalculationResult } from '../types';

interface Props {
  result: CalculationResult;
}

export const ResultCard: React.FC<Props> = ({ result }) => {
  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);

  // Helper to calculate % relative to selling price
  const getPct = (val: number) => result.sellingPrice > 0 ? (val / result.sellingPrice) * 100 : 0;
  
  const danaDiterima = result.sellingPrice - result.totalFees;

  return (
    <div className="space-y-8">
      
      {/* Table Section - Mimicking the Spreadsheet Look */}
      <div className="bg-white rounded-lg shadow-lg border border-slate-300 overflow-hidden text-sm font-sans">
        
        {/* SECTION 1: HARGA PRODUK */}
        <div>
          <div className="bg-[#1e293b] text-white px-4 py-3 font-bold flex justify-between items-center tracking-wide">
            <span>HARGA PRODUK PENJUAL</span>
          </div>
          <div className="divide-y divide-slate-200 border-b border-slate-200">
            <div className="grid grid-cols-12 gap-2 px-4 py-3 items-center bg-white">
               <div className="col-span-6 text-slate-700 font-medium">Harga Pokok Penjualan (HPP)</div>
               <div className="col-span-2 text-right text-slate-500 text-xs">{(result.costOfGoods > 0 && result.sellingPrice > 0) ? ((result.costOfGoods/result.sellingPrice)*100).toFixed(2)+'%' : '0.00%'}</div>
               <div className="col-span-4 text-right font-medium text-slate-800">{formatCurrency(result.costOfGoods)}</div>
            </div>
            <div className="grid grid-cols-12 gap-2 px-4 py-3 items-center bg-white">
               <div className="col-span-6 text-slate-700 font-medium">Target Harga Jual</div>
               <div className="col-span-2 text-right text-slate-500 text-xs">100.00%</div>
               <div className="col-span-4 text-right font-medium text-slate-800">{formatCurrency(result.sellingPrice)}</div>
            </div>
             {/* Target Row (Red-Orange) */}
            <div className="grid grid-cols-12 gap-2 px-4 py-3 items-center bg-[#ea580c] text-white font-bold">
               <div className="col-span-8 uppercase tracking-wide text-xs sm:text-sm">Target Harga Produk</div>
               <div className="col-span-4 text-right text-base sm:text-lg">{formatCurrency(result.sellingPrice)}</div>
            </div>
          </div>
        </div>

        {/* SECTION 2: BIAYA ADMIN & LAYANAN */}
        <div className="">
          <div className="bg-[#1e293b] text-white px-4 py-3 font-bold flex justify-between items-center tracking-wide">
            <span>BIAYA ADMINISTRASI & LAYANAN</span>
          </div>
          <div className="divide-y divide-slate-200 bg-white border-b border-slate-200">
             <div className="grid grid-cols-12 gap-2 px-4 py-2.5 items-center hover:bg-slate-50">
               <div className="col-span-6 text-slate-600">Biaya Admin</div>
               <div className="col-span-2 text-right text-slate-500 text-xs">{getPct(result.adminFee).toFixed(2)}%</div>
               <div className="col-span-4 text-right text-slate-800">{formatCurrency(result.adminFee)}</div>
            </div>
            <div className="grid grid-cols-12 gap-2 px-4 py-2.5 items-center hover:bg-slate-50">
               <div className="col-span-6 text-slate-600">Biaya Transaksi</div>
               <div className="col-span-2 text-right text-slate-500 text-xs">{getPct(result.transactionFee).toFixed(2)}%</div>
               <div className="col-span-4 text-right text-slate-800">{formatCurrency(result.transactionFee)}</div>
            </div>
            <div className="grid grid-cols-12 gap-2 px-4 py-2.5 items-center hover:bg-slate-50">
               <div className="col-span-6 text-slate-600">Biaya Layanan (Program)</div>
               <div className="col-span-2 text-right text-slate-500 text-xs">{getPct(result.serviceFee).toFixed(2)}%</div>
               <div className="col-span-4 text-right text-slate-800">{formatCurrency(result.serviceFee)}</div>
            </div>
             <div className="grid grid-cols-12 gap-2 px-4 py-2.5 items-center hover:bg-slate-50">
               <div className="col-span-6 text-slate-600">Biaya Proses Order</div>
               <div className="col-span-2 text-right text-slate-500 text-xs">Fix Rate</div>
               <div className="col-span-4 text-right text-slate-800">{formatCurrency(result.processingFee)}</div>
            </div>
            
            {/* Total Admin Fee Row (Red) */}
            <div className="grid grid-cols-12 gap-2 px-4 py-3 items-center bg-[#ef4444] text-white font-bold">
               <div className="col-span-6 text-xs sm:text-sm">TOTAL BIAYA ADMIN & LAYANAN</div>
               <div className="col-span-2 text-right text-xs opacity-90">{getPct(result.totalFees).toFixed(2)}%</div>
               <div className="col-span-4 text-right text-sm sm:text-base">{formatCurrency(result.totalFees)}</div>
            </div>
             {/* Dana Diterima Row (Yellow) */}
             <div className="grid grid-cols-12 gap-2 px-4 py-4 items-center bg-[#fbbf24] text-slate-900 font-bold border-t border-yellow-500">
               <div className="col-span-6 text-sm sm:text-base uppercase">DANA DITERIMA PENJUAL</div>
               <div className="col-span-6 text-right text-lg sm:text-xl">{formatCurrency(danaDiterima)}</div>
            </div>
          </div>
        </div>

        {/* SECTION 3: KEUNTUNGAN */}
        <div className="">
           <div className="bg-[#1e293b] text-white px-4 py-3 font-bold flex justify-between items-center tracking-wide">
            <span>KEUNTUNGAN SETELAH FEE</span>
          </div>
          <div className="divide-y divide-slate-200 bg-white">
             {/* Profit Row (Orange-Red) */}
             <div className="grid grid-cols-12 gap-2 px-4 py-4 items-center bg-[#ea580c] text-white font-bold">
               <div className="col-span-6 uppercase text-sm sm:text-base">KEUNTUNGAN BERSIH</div>
               <div className="col-span-2 text-right text-xs sm:text-sm opacity-90">{result.profitMargin.toFixed(2)}%</div>
               <div className="col-span-4 text-right text-lg sm:text-xl">{formatCurrency(result.netProfit)}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};