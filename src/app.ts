import express from "express";
import { clientRouter } from "./routes/client";
import { purchaseRouter } from "./routes/purchase";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("VISE API está activa ✅");
});
app.use("/client", clientRouter);
app.use("/purchase", purchaseRouter);

export default app;
