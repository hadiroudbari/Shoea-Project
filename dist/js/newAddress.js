import * as DOM from '../../modules/DOM.js';
import getData from '../../modules/model/getData.js';
import editData from '../../modules/model/editData.js';

let map = L.map('map').fitWorld();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap',
}).addTo(map);
map.locate({
  setView: true,
  maxZoom: 16,
});

function onLocationFound(e) {
  let radius = e.accuracy;

  let { lat, lng } = e.latlng;

  $.get(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
    function (data) {
      const address = data.display_name.split(',');
      address.splice(4, 4);
      // console.log(address.reverse().join());
      DOM.addressData.value = address.join();
    }
  );

  L.marker(e.latlng)
    .addTo(map)
    .bindPopup('You are within ' + radius + ' meters from this point')
    .openPopup();

  L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
  alert(e.message);
}

map.on('locationerror', onLocationError);

map.on('click', e => {
  let { lat, lng } = e.latlng;

  const marker = L.marker()
    .setLatLng(e.latlng)
    .addTo(map)
    .bindPopup('You Are Here')
    .openPopup();

  const circle = L.circle(e.latlng, 25).addTo(map);

  map.on('popupclose', () => {
    marker.remove();
    circle.remove();
  });

  $.get(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
    function (data) {
      const address = data.display_name.split(',');
      address.splice(4, 4);
      // console.log(address.reverse().join());
      DOM.addressData.value = address.join();
    }
  );
});

DOM.addressForm.addEventListener('submit', async e => {
  e.preventDefault();

  const user = await getData('loggedUser');
  const userAddress = user[0].addresses;

  const checkRepeatedAddress = userAddress.find(
    item => item.name.toLowerCase() === DOM.addressName.value.toLowerCase()
  );

  if (checkRepeatedAddress) {
    DOM.addressNameAlert.classList.remove('hidden');
    DOM.addressNameAlert.classList.add('flex');
    return;
  }

  userAddress.push({
    address: DOM.addressData.value,
    name:
      DOM.addressName.value.split('')[0].toUpperCase() +
      DOM.addressName.value.split('').slice(1).join(''),
    id: userAddress[userAddress.length - 1]
      ? userAddress[userAddress.length - 1].id + 1
      : 1,
  });

  await editData('users', user[0].id, user[0]);
  await editData('loggedUser', user[0].id, user[0]);
});
