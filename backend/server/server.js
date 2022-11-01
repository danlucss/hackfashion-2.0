require("dotenv").config({
  path: "./.env",
});

const express = require("express");
const server = express();
const port = process.env.SERVER_PORT || 80;
const cors = require("cors");


server.use(cors());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use("/", require("./router/productsRouter"));
server.use("/", require("./router/customersRouter"));
server.use("/", require("./router/addressRouter"));
server.use("/", require("./router/pedidosRouter"));
server.use("/", require("./router/orderDetailsRouter"));
server.use("/", require("./router/smsRouter"))

server.get("/test", (req, res) => {
  res.send("Hello World!");
});


server.listen(port, () => {
  console.log(`servidor escutando na porta ${port}`);
})

