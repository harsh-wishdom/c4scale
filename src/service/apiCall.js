const axios = require("axios");

async function GetRoute(directions, getAlternative = false) {
    console.log(directions);
  try {
    const response = await axios.post(
      `https://graphhopper.com/api/1/route?key=${process.env.GRAPHOPPER_API_KEY}`,
      {
        points: [
          [directions.from.lat, directions.from.lon],
          [directions.to.lat, directions.to.lon],
        ],
        profile: "car",
        elevation: true,
        instructions: false,
        locale: "en_US",
        points_encoded: false,
        snap_preventions: ["ferry"],
        ...(getAlternative
          ? {
              algorithm: "alternative_route",
              "alternative_route.max_paths": 3,
            }
          : {}),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

module.exports = GetRoute;
