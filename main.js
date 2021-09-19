function handleSuccess(position) {
  document.getElementById('message').innerText = '';

  const { coords } = position;
  const { latitude, longitude } = coords;

  var geoPoint = [latitude, longitude];
  var imgPoint = mapGeoToImg(...geoPoint);
  console.log(`${geoPoint} -> ${imgPoint}`)

  const pin = document.getElementById('pin');
  pin.setAttribute('cx', imgPoint[0]);
  pin.setAttribute('cy', imgPoint[1]);
}

function handleFailure(position) {
  document.getElementById('message').innerText = 'Geolocation API failed.';
}

function mapGeoToImg(latitude, longitude) {
  const mapData = document.getElementById('map').dataset;

  const geoCoords = [
    ...mapData.geo0.split(' '),
    ...mapData.geo1.split(' '),
    ...mapData.geo2.split(' '),
    ...mapData.geo3.split(' ')];
  const imgCoords = [
    ...mapData.img0.split(' '),
    ...mapData.img1.split(' '),
    ...mapData.img2.split(' '),
    ...mapData.img3.split(' ')];

  // The differences between the geographic coordinates are very small compared to their magnitudes.
  // Translate the latitude and longitude to the origin before the projective transform.
  const offset = geoCoords.slice(0, 2)
  const offsetCoords = geoCoords.map((v, i) => v - offset[i % 2])

  const perspT = PerspT(offsetCoords, imgCoords);
  const geoPoint = [latitude - offset[0], longitude - offset[1]];
  const imgPoint = perspT.transform(...geoPoint);
  return imgPoint;
}

function setPin() {
  navigator.geolocation.getCurrentPosition(handleSuccess, handleFailure, { enableHighAccuracy: true });
}

export default function main() {
  setPin();

  const query = new URLSearchParams(window.location.search.slice(1));
  const refreshInterval = query.get('refresh') || 60;
  setInterval(setPin, refreshInterval * 1000)
}