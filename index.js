require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { resolve } = require("path");

const routes = require("./src/routes");

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Rotas
app.use(routes);

// Arquivos estáticos
app.use(express.static(resolve(__dirname, "public")));

// View
app.set("views", resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
