import React from 'react';
import { SellerType, ProductCategory, FeeConfig } from '../types';
import { ADMIN_FEE_RATES } from '../constants';
import { Settings2, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface Props {
  sellingPrice: number;
  setSellingPrice: (val: number) => void;
  costOfGoods: number;
  setCostOfGoods: (val: number) => void;
  sellerType: SellerType;
  setSellerType: (val: SellerType) => void;
  category: ProductCategory;
  setCategory: (val: ProductCategory) => void;
  useFreeShipping: boolean;
  setUseFreeShipping: (val: boolean) => void;
  useCashback: boolean;
  setUseCashback: (val: boolean) => void;
  feeConfig: FeeConfig;
  setFeeConfig: (val: FeeConfig) => void;
}

export const CalculatorForm: React.FC<Props> = ({
  sellingPrice, setSellingPrice,
  costOfGoods, setCostOfGoods,
  sellerType, setSellerType,
  category, setCategory,
  useFreeShipping, setUseFreeShipping,
  useCashback, setUseCashback,
  feeConfig, setFeeConfig
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  // Update admin fee default when type/category changes if user hasn't manually overridden (simplified logic: just reset to standard on type change)
  React.useEffect(() => {
    setFeeConfig({
      ...feeConfig,
      adminFeeRate: ADMIN_FEE_RATES[sellerType][category]
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellerType, category]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-sm">Rp</span>
          Input Data Produk
        </h2>
      </div>

      {/* Main Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Harga Jual (Rp)</label>
          <input
            type="number"
            min="0"
            value={sellingPrice || ''}
            onChange={(e) => setSellingPrice(Number(e.target.value))}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-lg font-semibold text-slate-800 placeholder-slate-400"
            placeholder="0"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">HPP / Modal (Rp)</label>
          <input
            type="number"
            min="0"
            value={costOfGoods || ''}
            onChange={(e) => setCostOfGoods(Number(e.target.value))}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-lg font-semibold text-slate-800 placeholder-slate-400"
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Tipe Penjual</label>
          <div className="grid grid-cols-3 gap-3">
            {Object.values(SellerType).map((type) => (
              <button
                key={type}
                onClick={() => setSellerType(type)}
                className={`p-3 rounded-xl text-sm font-medium transition-all border ${
                  sellerType === type
                    ? 'bg-orange-50 border-orange-500 text-orange-700 ring-1 ring-orange-500'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-orange-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-600">Kategori Produk</label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-lg font-semibold text-slate-800 appearance-none pr-10"
            >
              {Object.values(ProductCategory).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={20} />
          </div>
        </div>
      </div>

      {/* Program Toggles */}
      <div className="space-y-3 pt-2">
        <label className="text-sm font-medium text-slate-600 block">Program Tambahan</label>
        <div className="flex flex-col sm:flex-row gap-4">
          <label className={`flex-1 flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${useFreeShipping ? 'bg-green-50 border-green-500' : 'border-slate-200'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${useFreeShipping ? 'bg-green-500 border-green-500' : 'border-slate-300'}`}>
                {useFreeShipping && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
              </div>
              <span className="text-sm font-medium text-slate-700">Gratis Ongkir Xtra</span>
            </div>
            <input type="checkbox" className="hidden" checked={useFreeShipping} onChange={(e) => setUseFreeShipping(e.target.checked)} />
          </label>

          <label className={`flex-1 flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${useCashback ? 'bg-yellow-50 border-yellow-500' : 'border-slate-200'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${useCashback ? 'bg-yellow-500 border-yellow-500' : 'border-slate-300'}`}>
                {useCashback && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
              </div>
              <span className="text-sm font-medium text-slate-700">Cashback Xtra</span>
            </div>
            <input type="checkbox" className="hidden" checked={useCashback} onChange={(e) => setUseCashback(e.target.checked)} />
          </label>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="pt-4 border-t border-slate-100">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-orange-600 transition-colors"
        >
          <Settings2 size={16} />
          {showAdvanced ? 'Sembunyikan Pengaturan Persentase' : 'Atur Persentase Biaya Manual'}
          {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showAdvanced && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 flex items-center gap-1">Biaya Admin (%) <Info size={12}/></label>
              <input
                type="number"
                step="0.1"
                value={feeConfig.adminFeeRate}
                onChange={(e) => setFeeConfig({...feeConfig, adminFeeRate: Number(e.target.value)})}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-700"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500">Biaya Transaksi (%)</label>
              <input
                type="number"
                step="0.1"
                value={feeConfig.transactionFeeRate}
                onChange={(e) => setFeeConfig({...feeConfig, transactionFeeRate: Number(e.target.value)})}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-700"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500">Gratis Ongkir Xtra (%)</label>
              <input
                type="number"
                step="0.1"
                value={feeConfig.freeShippingRate}
                onChange={(e) => setFeeConfig({...feeConfig, freeShippingRate: Number(e.target.value)})}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-700"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500">Cashback Xtra (%)</label>
              <input
                type="number"
                step="0.1"
                value={feeConfig.cashbackRate}
                onChange={(e) => setFeeConfig({...feeConfig, cashbackRate: Number(e.target.value)})}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-700"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};