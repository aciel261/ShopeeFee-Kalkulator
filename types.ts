export enum SellerType {
  NON_STAR = 'Non-Star',
  STAR = 'Star/Star+',
  MALL = 'Shopee Mall'
}

export enum ProductCategory {
  A = 'Kategori A (Fashion, dll)',
  B = 'Kategori B (Elektronik, dll)',
  C = 'Kategori C (Kebutuhan Sehari-hari)',
  D = 'Kategori D (Digital/Voucher)',
  E = 'Kategori E (Aksesoris/Lainnya)'
}

export interface FeeConfig {
  adminFeeRate: number;
  transactionFeeRate: number;
  freeShippingRate: number;
  cashbackRate: number;
  freeShippingCap: number; // Maximum cap in IDR
}

export interface CalculationResult {
  sellingPrice: number;
  costOfGoods: number;
  adminFee: number;
  transactionFee: number;
  serviceFee: number; // Combined program fees (Free shipping + Cashback)
  processingFee: number; // Fixed order fee
  totalFees: number;
  netProfit: number;
  profitMargin: number;
}

export interface AnalysisRequest {
  sellingPrice: number;
  costOfGoods: number;
  netProfit: number;
  profitMargin: number;
  sellerType: SellerType;
}