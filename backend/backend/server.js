const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());

app.get(
  "/trains/:from/:to",
  async (req, res) => {

    const { from, to } =
      req.params;

    try {

      const response =
        await axios.get(
          "https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations",
          {
            params: {
              fromStationCode: from,
              toStationCode: to,
            },
            headers: {
              "X-RapidAPI-Key":
                process.env.RAPID_KEY,

              "X-RapidAPI-Host":
                "irctc1.p.rapidapi.com",
            },
          }
        );

      res.json(
        response.data
      );

    } catch (err) {

      console.log(err);

      res.status(500).json({
        success: false,
      });
    }
  }
);



app.listen(5000, () => {
  console.log(
    "Backend running on port 5000"
  );
});