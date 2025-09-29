import { Router } from "express";
import { Client } from "../models/client";
import { validateClientRestrictions } from "../services/restrictions";

const router = Router();
let clients: Client[] = [];
let nextId = 1;

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const client = clients.find(c => c.id === id);

  if (!client) {
    return res.status(404).json({
      status: "Not Found",
      error: "Cliente no encontrado"
    });
  }

  return res.json(client);
});

router.get("/", (req, res) => {
  return res.json(clients);
});

router.post("/", (req, res) => {
  const { name, country, monthlyIncome, viseClub, cardType } = req.body;

  const error = validateClientRestrictions({
    name,
    country,
    monthlyIncome,
    viseClub,
    cardType,
  });
  if (error) {
    return res.status(400).json({ status: "Rejected", error });
  }

  const newClient: Client = {
    id: nextId++,
    name,
    country,
    monthlyIncome,
    viseClub,
    cardType,
  };
  clients.push(newClient);

  return res.json({
    clientId: newClient.id,
    name: newClient.name,
    cardType: newClient.cardType,
    status: "Registered",
    message: `Cliente apto para tarjeta ${newClient.cardType}`,
  });
});

export { router as clientRouter, clients };