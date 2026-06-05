const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { createServer } = require("http");
const { Server } = require("socket.io");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api/swagger/swagger.json');
const { PORT } = require("./config");
const connectDB = require("./config/database");

const weekdayMiddleware = require("./api/middlewares/weekdayMiddleware");
const logMiddleware = require("./api/middlewares/logMiddleware");
const accessLogMiddleware = require("./api/middlewares/accessLogMiddleware");

const authRoutes = require("./api/routes/authRoutes");
const itemRoutes = require("./api/routes/itemRoutes");
const logRoutes = require("./api/routes/logRoutes");
const exportRoutes = require("./api/routes/exportRoutes");
const monitoramentoRoutes = require("./api/routes/monitoramentoRoutes");
const { scheduleDailyBackup } = require("./api/services/backupService");

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

app.use(cors({
  origin: ['http://localhost:5173', process.env.FRONTEND_URL].filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.static('public'));
app.use(morgan("dev"));
app.use(accessLogMiddleware);
app.use(logMiddleware);
app.use(weekdayMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api", itemRoutes);
app.use("/api", logRoutes);
app.use("/api/export", exportRoutes);
app.use("/api/relatorio", monitoramentoRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "API de Assistência Técnica funcionando!" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo deu errado!");
});

module.exports = app;

if (require.main === module) {
  connectDB().then(() => {
    const server = createServer(app);
    const io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      console.log(`Socket conectado: ${socket.id}`);

      socket.on('disconnect', () => {
        console.log(`Socket desconectado: ${socket.id}`);
      });
    });

    setInterval(() => {
      const valor = Number((20 + Math.random() * 20).toFixed(2));
      const payload = {
        valor,
        unidade: '°C',
        timestamp: new Date().toISOString(),
      };
      io.emit('sensor-data', payload);
    }, 3000);

    scheduleDailyBackup();

    server.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  });
}