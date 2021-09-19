function handleSuccess(position) {
  const { coords } = position;
  const { latitude, longitude, accuracy } = coords;

  var geoCoords = [
    158, 64,
    494, 69,
    495, 404,
    158, 404];
  var imgCoords = [
    100, 500,
    152, 564,
    148, 604,
    100, 560];
  var perspT = PerspT(geoCoords, imgCoords);
  var geoPoint = [250, 120];
  var imgPoint = perspT.transform(geoPoint[0], geoPoint[1]);
  console.log(imgPoint);

  document.getElementById('container').innerText = 
    `lat: ${latitude} / long: ${longitude} / accuracy: ${accuracy}m`;
}

function handleFailure(position) {
  document.getElementById('container').innerText = 'failure! :(';
}

export default function main() {
  document.getElementById('container').innerText = 'loaded';
  navigator.geolocation.getCurrentPosition(handleSuccess, handleFailure);
}