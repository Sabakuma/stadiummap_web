let map;
let markers = [];

function initializeMap() {
  map = new maplibregl.Map({
    container: 'map',
    style: 'https://demotiles.maplibre.org/style.json',
    center: [139.6917, 35.6895],
    zoom: 5
  });
  console.log('map initialized:', map);
}

window.updateMarkers = function(indices, stadiums) {
  markers.forEach(m => m.remove());
  markers = [];

  indices.forEach(i => {
    const stadium = stadiums[i];
    if (!stadium) return;

    const el = document.createElement('div');
    const img = document.createElement('img');
    img.src = stadium.mascotImage || 'images/default_icon.png';
    img.style.width = '40px';
    img.style.height = '40px';
    img.style.borderRadius = '50%';
    el.appendChild(img);

    const marker = new maplibregl.Marker(el)
      .setLngLat([parseFloat(stadium.lng), parseFloat(stadium.lat)])
      .setPopup(new maplibregl.Popup().setHTML(`<h3>${stadium.name}</h3><p>${stadium.team}</p>`))
      .addTo(map);

    markers.push(marker);
  });
};

window.onload = () => {
  initializeMap();
};
