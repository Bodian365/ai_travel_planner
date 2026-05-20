import cors from "cors";
import "dotenv/config";
import express from "express";
import tripRoutes from "./routes/tripRoutes.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Твоя адреса фронтенду
  }),
);

app.use(express.json());

app.use("/api", tripRoutes);

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});
