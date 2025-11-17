import dotenv from "dotenv";
dotenv.config();

import "./instrumentation"; // OTel se ejecuta antes que Express

import app from "./app";

const PORT = process.env.PORT || 443;

app.listen(PORT, () => {
  console.log(`🚀 VISE API running on http://localhost:${PORT}`);
});
