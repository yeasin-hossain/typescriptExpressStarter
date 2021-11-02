//external import

import express from "express";
import cors from "cors";

// DB Connection Class
import DbConnection from "./src/util/db";
import apiRoutes from "./src/routes";
import morgan from "morgan";

// middlewares use
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
// mongoDB connection, just pass the mongo url
new DbConnection(process.env.mongoURL);

//routes
app.use("/api", apiRoutes);

//default error handlers
const errorHandlers = (err: any, req: any, res: any, next: any) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandlers);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port} 🤟🔥🤟🇧🇩`);
});
