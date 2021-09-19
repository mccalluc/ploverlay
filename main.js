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

export function mapGeoToImg(latitude, longitude) {
  const mapData = document.getElementById('map').dataset;

  var geoCoords = [
    ...mapData.geo0.split(' '),
    ...mapData.geo1.split(' '),
    ...mapData.geo2.split(' '),
    ...mapData.geo3.split(' ')];
  var imgCoords = [
    ...mapData.img0.split(' '),
    ...mapData.img1.split(' '),
    ...mapData.img2.split(' '),
    ...mapData.img3.split(' ')];
  var perspT = PerspT(geoCoords, imgCoords);
  var geoPoint = [latitude, longitude];
  var imgPoint = perspT.transform(geoPoint[0], geoPoint[1]);
  return imgPoint;
}

export default function main() {
  navigator.geolocation.watchPosition(handleSuccess, handleFailure, { enableHighAccuracy: true });
}