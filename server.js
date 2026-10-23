
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();



const swaggerSpec = require("./src/config/swagger");
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check backend health
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Backend is running successfully
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "SKILL TECH EDU backend is running"
  });
});

app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SKILL TECH EDU backend running on port ${PORT}`);
  });
}

module.exports = app;
