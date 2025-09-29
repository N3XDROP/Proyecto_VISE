export interface Purchase {
  id: number;
  clientId: number;
  originalAmount: number;
  discountApplied: number;
  finalAmount: number;
  benefit: string;
  purchaseDate: string;
  purchaseCountry: string;
}