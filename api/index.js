module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET") {
    res.status(200).json({ message: "Hola desde la API en Vercel 🚀" });
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
};
