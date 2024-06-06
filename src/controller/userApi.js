const dotenv = require("dotenv");
const { HandleMatch, HandleRoute } = require("../views/userViews");

function HandleApis(app) {
    dotenv.config();

  app.post("/route", async (req, res) => {
    try {
      const result = await HandleRoute(req.body);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/match", async (req, res) => {
    const { from, to, point } = req.body;
    const result = await HandleMatch({ from, to }, point);
    return res.json({ message: result });
  });
}

module.exports = HandleApis;
