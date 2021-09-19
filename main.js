function handleSuccess(position) {
  const { coords } = position;
  document.getElementById('container').innerText = 
    `lat: ${coords.latitude} / long: ${coords.longitude} / accuracy: ${coords.accuracy}m`;
}

function handleFailure(position) {
  document.getElementById('container').innerText = 'failure! :(';
}

export default function main() {
  document.getElementById('container').innerText = 'loaded';
  navigator.geolocation.getCurrentPosition(handleSuccess, handleFailure);
}