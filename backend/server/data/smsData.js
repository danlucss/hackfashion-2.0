require("dotenv").config({
  path: ".././.env",
});

const accountSid = process.env.SID;
const authToken = process.env.AUTHTOKEN;

const client = require("twilio")(accountSid, authToken);

const numeroUser = process.env.CELL_NUMBER;
const numeroTwilio = process.env.CELL_NUMBER_TWILIO;

exports.getSmsData = async function (name, pedido_id) {
  console.log(pedido_id);
  console.log(name);

  client.messages
    .create({
      body: `Ola ${name} a compra foi finalizada com sucesso, Nº ${pedido_id}`,
      from: numeroTwilio,
      to: numeroUser,
    })
    .then((message) => console.log("mensagem enviada", message.sid))
    .done();
};
