let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34, lng: 150 },
    zoom: 8,
  });
}
