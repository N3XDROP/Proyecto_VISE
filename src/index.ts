import app from "./app";

// const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 443;

app.listen(PORT, () => {
  console.log(`🚀 VISE API running on http://localhost:${PORT}`);
});