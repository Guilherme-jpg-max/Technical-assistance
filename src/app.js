const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api/docs/swagger.json');
const { PORT } = require("./config");
const connectDB = require("./config/database");

const weekdayMiddleware = require("./api/middlewares/weekdayMiddleware");
const logMiddleware = require("./api/middlewares/logMiddleware");

const authRoutes = require("./api/routes/authRoutes");
const itemRoutes = require("./api/routes/itemRoutes");
const logRoutes = require("./api/routes/logRoutes");

const app = express();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Assistência Técnica',
    version: '1.0.0',
    description: 'Documentação da API de entrada de aparelhos e orçamentos',
  },
  servers: [{
    url: process.env.NODE_ENV === 'production'
      ? 'https://technical-assistance-q0h0.onrender.com'
      : `http://localhost:${PORT}`
  }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  ...swaggerDocument,
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logMiddleware);
app.use(weekdayMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api", itemRoutes);
app.use("/api", logRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "API de Assistência Técnica funcionando!" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo deu errado!");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});