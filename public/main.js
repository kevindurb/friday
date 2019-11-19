const ENTER_KEY = 13;

const $messages = $('#messages');
const $input = $('#input');
const $send = $('#send');

const socket = io.connect('http://localhost:8888');

const append = (value) => {
  const $item = $('<li class="list-group-item mb-3"></li>').text(value);
  $messages.append($item);
};

const send = () => {
  const value = $input.val();
  if (value) {
    socket.emit('message', value);
    append(value);
  }
  $input.val('');
  $input.focus();
};

socket.on('message', append);
$input.on('keydown', ({ which }) => which === ENTER_KEY ? send() : null);
$send.on('click', send);
