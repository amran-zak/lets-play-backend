const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importez le middleware cors

require("dotenv").config();

// Routes
const routes = require("./routes");

const app = express();

// Middleware pour parser le JSON
app.use(bodyParser.json());

// Configuration de la connexion à MongoDB
const dbURI = `mongodb+srv://${process.env.DATABASE_USER}:${
  process.env.DATABASE_PASSWORD
}@atlascluster.jksjfrm.mongodb.net/${
  process.env.NODE_ENV === "test"
    ? process.env.DATABASE_NAME_TEST
    : process.env.DATABASE_NAME
}`;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected... "))
  .catch((err) => console.error(err));
  app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

// Middleware CORS pour autoriser les origines spécifiques
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

// Exemple de route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api", routes);

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000 || 5001;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

module.exports = app;
