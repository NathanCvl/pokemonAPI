const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const sequelize = require("./src/db/sequelize");

const app = express();
const port = 3000;
app.use(morgan("dev"));
app.use(favicon(__dirname + "/favicon.ico")).use(bodyParser.json());

sequelize.initDb().then(() => {
  console.log("Database initialized");
});

app.get("/", (req, res) => {
  res.json("Hello, Heroku ! 👋");
});

require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
require("./src/routes/updatePokemon")(app);
require("./src/routes/deletePokemon")(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
//point de terminaison express = app.Method(URL, gestionnaire de requête (req, res) )
/*code de status HTTP
1xx : information
2xx : succès
3xx : redirection
4xx : erreur client
5xx : erreur serveur
 */
