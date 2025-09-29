import { Router } from "express";
import { clients } from "./client";
import { Purchase } from "../models/purchase";
import { applyBenefits } from "../services/benefits";

const router = Router();
let purchases: Purchase[] = [];
let nextPurchaseId = 1;

router.post("/", (req, res) => {
  const { clientId, amount, currency, purchaseDate, purchaseCountry } =
    req.body;
  const client = clients.find((c) => c.id === clientId);

  if (!client) {
    return res.status(404).json({
      status: "Rejected",
      error: "Cliente no encontrado",
    });
  }

  if (client.cardType === "Black" || client.cardType === "White") {
    if (["China", "Vietnam", "India", "Irán"].includes(purchaseCountry)) {
      return res.status(400).json({
        status: "Rejected",
        error: `El cliente con tarjeta ${client.cardType} no puede realizar compras desde ${purchaseCountry}`,
      });
    }
  }

  const { discount, finalAmount, benefit } = applyBenefits(
    client,
    amount,
    purchaseDate,
    purchaseCountry
  );

  const newPurchase: Purchase = {
    id: nextPurchaseId++,
    clientId,
    originalAmount: amount,
    discountApplied: discount,
    finalAmount,
    benefit: benefit || "Sin beneficios aplicados",
    purchaseDate,
    purchaseCountry,
  };

  purchases.push(newPurchase);

  return res.json({
    status: "Approved",
    purchase: newPurchase,
  });
});

router.get("/", (req, res) => {
  return res.json(purchases);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const purchase = purchases.find((p) => p.id === id);

  if (!purchase) {
    return res.status(404).json({
      status: "Not Found",
      error: "Compra no encontrada",
    });
  }

  return res.json(purchase);
});

export { router as purchaseRouter };