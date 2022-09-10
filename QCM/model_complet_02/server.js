import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import bodyParser from 'body-parser';
import { fileURLToPath } from "url";
import session from "express-session";

import route from "./routes/routes.js";

// ==========
// App initialization
// ==========

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV, DB_URL } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(init);

async function init() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.set("view engine", "pug");
  app.locals.pretty = (NODE_ENV !== 'production'); // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)
  app.use(express.static(path.join(__dirname, "public")));
  app.use(
    session({
      name: "simple",
      secret: "simple",
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(route);
  app.listen(APP_PORT, () => {
    console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
  });
}

// ==========
// App middlewares
// ==========



// ==========
// App routers
// ==========



// ==========
// App start
// ==========


