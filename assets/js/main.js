function handleSuccess(position) {
  document.getElementById('message').innerText = '';

  const { coords } = position;
  const { latitude, longitude } = coords;

  const geoPoint = [latitude, longitude];
  const imgPoint = mapGeoToImg(...geoPoint);
  console.log(`${geoPoint} -> ${imgPoint}`)

  const pin = document.getElementById('pin');
  pin.setAttribute('cx', imgPoint[0]);
  pin.setAttribute('cy', imgPoint[1]);
}

function handleFailure() {
  document.getElementById('message').innerText = 'Geolocation API failed.';
}

function getCoords() {
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
  
  return {geoCoords, imgCoords};
}

function mapGeoToImg(latitude, longitude) {
  const {geoCoords, imgCoords} = getCoords();

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

function drawBounds() {
  const {geoCoords} = getCoords();
  const lats = geoCoords.filter((v, i) => (i+1) % 2);
  const longs = geoCoords.filter((v, i) => i % 2);

  const north = Math.max(...lats);
  const south = Math.min(...lats);
  const east = Math.max(...longs);
  const west = Math.min(...longs);

  const ne = mapGeoToImg(north, east);
  const nw = mapGeoToImg(north, west);
  const se = mapGeoToImg(south, east);
  const sw = mapGeoToImg(south, west);

  const nLine = document.getElementById('north');
  nLine.setAttribute('x1', ne[0]);
  nLine.setAttribute('y1', ne[1]);
  nLine.setAttribute('x2', nw[0]);
  nLine.setAttribute('y2', nw[1]);

  const sLine = document.getElementById('south');
  sLine.setAttribute('x1', se[0]);
  sLine.setAttribute('y1', se[1]);
  sLine.setAttribute('x2', sw[0]);
  sLine.setAttribute('y2', sw[1]);

  const eLine = document.getElementById('east');
  eLine.setAttribute('x1', ne[0]);
  eLine.setAttribute('y1', ne[1]);
  eLine.setAttribute('x2', se[0]);
  eLine.setAttribute('y2', se[1]);

  const wLine = document.getElementById('west');
  wLine.setAttribute('x1', nw[0]);
  wLine.setAttribute('y1', nw[1]);
  wLine.setAttribute('x2', sw[0]);
  wLine.setAttribute('y2', sw[1]);
}

export default function main() {
  setPin();

  const query = new URLSearchParams(window.location.search.slice(1));
  if (query.get('debug')) {
    drawBounds();
  } else {
    const refreshInterval = query.get('refresh') || 60;
    setInterval(setPin, refreshInterval * 1000)
  }
}