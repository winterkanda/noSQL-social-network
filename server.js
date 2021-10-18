const routes = require("./routes");

const connectdb = require("./config/connection.js");

const express = require('express');
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();
const port = 3001;

connectdb();

app.use(express.json());
app.use("/api", routes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})