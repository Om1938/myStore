const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./controllers/Auth/AuthAPI"));
app.use("/product", require("./controllers/Product/ProductAPI"));

app.use(function (err, req, res, next) {
  let status = err.status || 500;
  res.status(status);
  if (process.env.NODE_ENV == "development") console.error(err);
  if (err.data) res.json({ message: err.message, ...err.data });
  else res.json({ message: err.message });
});

app.listen(3000, () => {
  console.log(`Server Listening on 3000`);
});
