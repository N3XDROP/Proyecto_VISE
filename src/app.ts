import express from "express";
import "./instrumentation";


const app = express();
app.use(express.json());


const PORT: number = parseInt(process.env.PORT || '8082');

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get('/rolldice', (req, res) => {
  res.send(getRandomNumber(1, 6).toString());
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});

export default app;