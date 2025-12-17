import React, { useState, useMemo } from 'react';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultCard } from './components/ResultCard';
import { SellerType, ProductCategory, FeeConfig, CalculationResult } from './types';
import { 
  ADMIN_FEE_RATES, 
  DEFAULT_TRANSACTION_FEE, 
  DEFAULT_FREE_SHIPPING_XTRA, 
  DEFAULT_CASHBACK_XTRA,
  FREE_SHIPPING_CAP,
  ORDER_PROCESSING_FEE
} from './constants';
import { ShoppingBag } from 'lucide-react';

const App: React.FC = () => {
  // State for Form Inputs
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [costOfGoods, setCostOfGoods] = useState<number>(0);
  const [sellerType, setSellerType] = useState<SellerType>(SellerType.NON_STAR);
  const [category, setCategory] = useState<ProductCategory>(ProductCategory.A);
  const [useFreeShipping, setUseFreeShipping] = useState<boolean>(false);
  const [useCashback, setUseCashback] = useState<boolean>(false);

  // State for Configuration (allows overrides)
  const [feeConfig, setFeeConfig] = useState<FeeConfig>({
    adminFeeRate: ADMIN_FEE_RATES[SellerType.NON_STAR][ProductCategory.A],
    transactionFeeRate: DEFAULT_TRANSACTION_FEE,
    freeShippingRate: DEFAULT_FREE_SHIPPING_XTRA,
    cashbackRate: DEFAULT_CASHBACK_XTRA,
    freeShippingCap: FREE_SHIPPING_CAP
  });

  // Calculation Logic
  const result: CalculationResult = useMemo(() => {
    if (sellingPrice <= 0) {
      return {
        sellingPrice: 0,
        costOfGoods: 0,
        adminFee: 0,
        transactionFee: 0,
        serviceFee: 0,
        processingFee: 0,
        totalFees: 0,
        netProfit: 0,
        profitMargin: 0
      };
    }

    // 1. Admin Fee
    const adminFee = Math.round(sellingPrice * (feeConfig.adminFeeRate / 100));

    // 2. Transaction Fee (Biaya Layanan Transaksi) - Usually applied to (Price + Shipping paid by buyer), but here we approximate on Price
    const transactionFee = Math.round(sellingPrice * (feeConfig.transactionFeeRate / 100));

    // 3. Program Service Fees (Free Shipping + Cashback)
    let serviceFee = 0;
    
    if (useFreeShipping) {
      const fsFee = Math.round(sellingPrice * (feeConfig.freeShippingRate / 100));
      // Apply cap if needed (Example: 10k cap for free shipping fee per qty is common policy, though it varies)
      serviceFee += Math.min(fsFee, feeConfig.freeShippingCap);
    }

    if (useCashback) {
      // Cashback typically doesn't have a small cap like free shipping, or it's high (e.g. 50k)
      // We'll calculate straight % for simplicity unless specific logic added
      serviceFee += Math.round(sellingPrice * (feeConfig.cashbackRate / 100));
    }

    // 4. Processing Fee (Biaya Proses Pesanan) - Fixed
    const processingFee = ORDER_PROCESSING_FEE;

    const totalFees = adminFee + transactionFee + serviceFee + processingFee;
    const netProfit = sellingPrice - totalFees - costOfGoods;
    const profitMargin = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;

    return {
      sellingPrice,
      costOfGoods,
      adminFee,
      transactionFee,
      serviceFee,
      processingFee,
      totalFees,
      netProfit,
      profitMargin
    };
  }, [sellingPrice, costOfGoods, feeConfig, useFreeShipping, useCashback]);

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-lg text-white">
                <ShoppingBag size={20} />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">ShopeeFee <span className="text-orange-600">Kalkulator</span></h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Form */}
          <div className="w-full lg:w-3/5 space-y-6">
             <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3 text-sm text-blue-800">
                <InfoIcon className="shrink-0 mt-0.5" />
                <p>
                  Perhitungan ini adalah estimasi berdasarkan kebijakan biaya Shopee terbaru.
                  Gunakan fitur <strong>Pengaturan Manual</strong> di bawah jika persentase toko Anda berbeda.
                </p>
             </div>

             <CalculatorForm 
               sellingPrice={sellingPrice}
               setSellingPrice={setSellingPrice}
               costOfGoods={costOfGoods}
               setCostOfGoods={setCostOfGoods}
               sellerType={sellerType}
               setSellerType={setSellerType}
               category={category}
               setCategory={setCategory}
               useFreeShipping={useFreeShipping}
               setUseFreeShipping={setUseFreeShipping}
               useCashback={useCashback}
               setUseCashback={setUseCashback}
               feeConfig={feeConfig}
               setFeeConfig={setFeeConfig}
             />
          </div>

          {/* Right Column: Results */}
          <div className="w-full lg:w-2/5">
             <div className="sticky top-24">
               <ResultCard result={result} />
             </div>
          </div>

        </div>
      </main>
      
      <footer className="max-w-5xl mx-auto px-4 py-6 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} ShopeeFee Kalkulator. Unofficial Tool.</p>
      </footer>
    </div>
  );
};

const InfoIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

export default App;