const GetRoute = require("../service/apiCall");
const { DistanceBetweenTwoPoints } = require("../utils/responseUtli");


async function HandleRoute(directions) {
  try {
   //Getting data from graphHopper
    const apiResponse = await GetRoute(directions, true);
    const differentPaths = apiResponse.paths.map((route) => ({
      distance: route.distance / 1000, // Convert to kilometers
      time: route.time / 1000 / 60, // Convert to minutes
      points: route.points, // Encoded polyline string
    }));

    return differentPaths;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//Match Api
async function HandleMatch(directions, point) {
  const min = { dist: 99999999, cor: {}, pathIndex: -1 };
  const Paths = await HandleRoute(directions); //Getting Paths
  if (!Paths) {
    return { message: "Please provide correct route" };
  }

  for (const Pathindex in Paths)

    for (const coords of Paths[Pathindex].points.coordinates) { //Checking coordinates to find closest point
      const dis = DistanceBetweenTwoPoints(
        { lat: coords[0], lon: coords[1] },
        point
      );
      if (min.dist > dis) {
        min.dist = dis;
        min.cor = coords;
        min.pathIndex = Pathindex;
      }
    }

  return {
    point,
    falls_within: min.dist <= 0.1,
    line: min.dist <= 0.1  ? min.cor : {},
    Paths: Paths[min.dist <= 0.1 ? min.pathIndex : 0],
  };
}


module.exports = { HandleRoute, HandleMatch };
