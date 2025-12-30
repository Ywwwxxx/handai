import express from "express";
import cors from "cors";
import predictHandler from "./api/predict.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Sağlık kontrolü
app.get("/", (req, res) => {
  res.json({ ok: true, service: "roblox-ai" });
});

// Yapay zekâ endpoint
app.get("/api/predict", predictHandler);
app.post("/api/predict", predictHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
