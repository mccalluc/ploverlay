function handleSuccess(position) {
  const { coords } = position;
  const { latitude, longitude, accuracy } = coords;
  console.log(`lat: ${latitude} / long: ${longitude} / accuracy: ${accuracy}m`);
  document.getElementById('message').innerText = '';

  var geoCoords = [
    // lat, long
    42.433977, -71.080992,
    42.433977, -71.057395,
    42.418675, -71.080992,
    42.418675, -71.057395];
  var imgCoords = [
    // x, y; top left is (0, 0)
    0, 0,
    1242, 0,
    0, 1052,
    1242, 1052];
  var perspT = PerspT(geoCoords, imgCoords);
  var geoPoint = [latitude, longitude];
  var imgPoint = perspT.transform(geoPoint[0], geoPoint[1]);

  const pin = document.getElementById('pin');
  pin.setAttribute('cx', imgPoint[0]);
  pin.setAttribute('cy', imgPoint[1]);
}

function handleFailure(position) {
  document.getElementById('message').innerText = 'Geolocation API failed.';
}

export default function main() {
  navigator.geolocation.getCurrentPosition(handleSuccess, handleFailure);
}