import { Client } from "../models/client";

export function validateClientRestrictions(
  client: Omit<Client, "id">
): string | null {
  const { cardType, monthlyIncome, viseClub, country } = client;

  switch (cardType) {
    case "Classic":
      return null;
    case "Gold":
      if (monthlyIncome < 500)
        return "El cliente no cumple con el ingreso mínimo para Gold";
      return null;
    case "Platinum":
      if (monthlyIncome < 1000)
        return "El cliente no cumple con el ingreso mínimo para Platinum";
      if (!viseClub)
        return "El cliente no cumple con la suscripción VISE CLUB requerida para Platinum";
      return null;
    case "Black":
      if (monthlyIncome < 2000)
        return "El cliente no cumple con el ingreso mínimo para Black";
      if (!viseClub)
        return "El cliente no cumple con la suscripción VISE CLUB requerida para Black";
      if (["China", "Vietnam", "India", "Irán"].includes(country))
        return "El cliente con tarjeta Black no puede residir en este país";
      return null;
    case "White":
      if (monthlyIncome < 2000)
        return "El cliente no cumple con el ingreso mínimo para White";
      if (!viseClub)
        return "El cliente no cumple con la suscripción VISE CLUB requerida para White";
      if (["China", "Vietnam", "India", "Irán"].includes(country))
        return "El cliente con tarjeta White no puede residir en este país";
      return null;
    default:
      return "Tipo de tarjeta no válido";
  }
}