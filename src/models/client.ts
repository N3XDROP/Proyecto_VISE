export type CardType = "Classic" | "Gold" | "Platinum" | "Black" | "White";

export interface Client {
  id: number;
  name: string;
  country: string;
  monthlyIncome: number;
  viseClub: boolean;
  cardType: CardType;
}