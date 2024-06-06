const express = require("express");
const cors = require("cors");
const HandleApis = require("./src/controller/userApi");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// API API
HandleApis(app);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
