import "dotenv/config";
import express from "express";
import tripRoutes from "./routes/tripRoutes.js";

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use("/api", tripRoutes);

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
});
