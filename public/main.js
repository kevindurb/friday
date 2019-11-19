const ENTER_KEY = 13;

const $messages = $('#messages');
const $input = $('#input');
const $send = $('#send');

const socket = io.connect('http://localhost:8888');

let currentLocation;

navigator.geolocation.getCurrentPosition(({ coords }) => {
  currentLocation = {
    longitude: coords.longitude,
    latitude: coords.latitude,
  };
});

const emitText = (text) => {
  socket.emit('message', {
    text,
    location: currentLocation,
  });
}

const append = (value, self = false) => {
  const $item = $(`<li class="list-group-item mb-3 ${!self ? 'list-group-item-primary' : ''}"></li>`).text(value);
  $messages.append($item);
};

const send = () => {
  const value = $input.val();
  if (value) {
    append(value, true);
    emitText(value);
  }
  $input.val('');
  $input.focus();
};

socket.on('message', append);
$input.on('keydown', ({ which }) => which === ENTER_KEY ? send() : null);
$send.on('click', send);
