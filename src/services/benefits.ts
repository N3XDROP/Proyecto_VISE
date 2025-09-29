import { Client } from "../models/client";

export function applyBenefits(
  client: Client,
  amount: number,
  purchaseDate: string,
  purchaseCountry: string
) {
  const date = new Date(purchaseDate);
  const day = date.getUTCDay(); // 0=Domingo ... 6=Sábado
  let discount = 0;
  let benefit = "";

  const isForeign = client.country !== purchaseCountry;

  switch (client.cardType) {
    case "Classic":
      break;

    case "Gold":
      if ([1, 2, 3].includes(day) && amount > 100) {
        discount = amount * 0.15;
        benefit = "Lunes-Miércoles - Descuento 15%";
      }
      break;

    case "Platinum":
      if ([1, 2, 3].includes(day) && amount > 100) {
        discount = amount * 0.2;
        benefit = "Lunes-Miércoles - Descuento 20%";
      } else if (day === 6 && amount > 200) {
        discount = amount * 0.3;
        benefit = "Sábado - Descuento 30%";
      }
      if (isForeign) {
        discount += amount * 0.05;
        benefit += " + Compra exterior 5%";
      }
      break;

    case "Black":
      if ([1, 2, 3].includes(day) && amount > 100) {
        discount = amount * 0.25;
        benefit = "Lunes-Miércoles - Descuento 25%";
      } else if (day === 6 && amount > 200) {
        discount = amount * 0.35;
        benefit = "Sábado - Descuento 35%";
      }
      if (isForeign) {
        discount += amount * 0.05;
        benefit += " + Compra exterior 5%";
      }
      break;

    case "White":
      if ([1, 2, 3, 4, 5].includes(day) && amount > 100) {
        discount = amount * 0.25;
        benefit = "Lunes-Viernes - Descuento 25%";
      } else if ([0, 6].includes(day) && amount > 200) {
        discount = amount * 0.35;
        benefit = "Sábado-Domingo - Descuento 35%";
      }
      if (isForeign) {
        discount += amount * 0.05;
        benefit += " + Compra exterior 5%";
      }
      break;
  }

  return { discount, finalAmount: amount - discount, benefit };
}