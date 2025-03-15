export default function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET") {
    res.status(200).json({ message: "API funcionando en Vercel 🚀" });
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
