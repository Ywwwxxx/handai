import fs from "fs";

// Basit model yükleme (örnek)
let model = null;
try {
  const raw = fs.readFileSync("./model/model.json", "utf8");
  model = JSON.parse(raw);
} catch (err) {
  console.error("Model yüklenemedi:", err);
}

export default function handler(req, res) {
  let input = [];

  if (req.method === "GET") {
    const raw = (req.query.input || "").toString();
    input = raw.length > 0 ? raw.split(",").map(x => Number(x.trim())) : [];
  } else if (req.method === "POST") {
    input = Array.isArray(req.body.input) ? req.body.input : [];
  }

  if (!input.length || input.some(x => Number.isNaN(x))) {
    return res.status(400).json({ error: "Geçersiz input" });
  }

  // Basit tahmin mantığı (örnek)
  const sum = input.reduce((a, b) => a + b, 0);
  const mean = sum / input.length;
  const label = mean >= 0.5 ? "positive" : "negative";

  return res.json({
    input,
    mean,
    label,
    modelInfo: model ? model.name : "default"
  });
}