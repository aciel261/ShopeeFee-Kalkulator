import { SellerType, ProductCategory } from './types';

// Default estimates based on 2024/2025 typical structures. 
// These serve as baselines but can be overridden in the UI.

export const ADMIN_FEE_RATES: Record<SellerType, Record<ProductCategory, number>> = {
  [SellerType.NON_STAR]: {
    [ProductCategory.A]: 4.0,
    [ProductCategory.B]: 3.2,
    [ProductCategory.C]: 2.5,
    [ProductCategory.D]: 1.5,
    [ProductCategory.E]: 4.0,
  },
  [SellerType.STAR]: {
    [ProductCategory.A]: 6.5,
    [ProductCategory.B]: 5.5,
    [ProductCategory.C]: 4.0,
    [ProductCategory.D]: 3.5,
    [ProductCategory.E]: 6.5,
  },
  [SellerType.MALL]: {
    [ProductCategory.A]: 8.5,
    [ProductCategory.B]: 6.0,
    [ProductCategory.C]: 4.5,
    [ProductCategory.D]: 2.5,
    [ProductCategory.E]: 8.5,
  }
};

export const DEFAULT_TRANSACTION_FEE = 4.0; // Biaya Layanan Transaksi
export const DEFAULT_FREE_SHIPPING_XTRA = 4.0; // Gratis Ongkir Xtra
export const DEFAULT_CASHBACK_XTRA = 1.4; // Cashback Xtra
export const FREE_SHIPPING_CAP = 10000; // Typical cap per item
export const ORDER_PROCESSING_FEE = 1250; // Biaya Proses Pesanan (Fixed)