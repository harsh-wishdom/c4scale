


function DistanceBetweenTwoPoints(coords1, coords2) {
  const { lat: lat1, lon: lon1 } = coords1;
  const { lat: lat2, lon: lon2 } = coords2;
  const degToRad = x => x * Math.PI / 180;
  const R = 6371;
  const halfDLat = degToRad(lat2 - lat1) / 2;  
  const halfDLon = degToRad(lon2 - lon1) / 2;  
  const a = Math.sin(halfDLat) * Math.sin(halfDLat) + 
            Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * 
            Math.sin(halfDLon) * Math.sin(halfDLon);  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c; 
}

module.exports = { DistanceBetweenTwoPoints };
