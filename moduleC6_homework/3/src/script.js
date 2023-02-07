const btn = document.querySelector('.btn');
const geo = document.querySelector('.geolocation')
const status = document.querySelector('#status');
const mapLink = document.querySelector('#map-link');

const wsUri = "wss://echo-ws-service.herokuapp.com";


 let websocket = new WebSocket(wsUri); 
	websocket.onopen = function(evt) {
		console.log("CONNECTED");
	};
	websocket.onmessage = function(evt) {
		writeToScreen(`Сообщение от сервера: ${evt.data}`, 'flex-start');
	};
	websocket.onerror = function(evt) {
		writeToScreen(`server: ${evt.data}`, 'flex-start');
	};

function writeToScreen(text) {
    let pre = document.createElement("div");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = text;
    chat.appendChild(pre);
  }
                   
btn.addEventListener('click', () => {
  const text = document.getElementById('message').value;
  let msg = websocket.send(text);
   writeToScreen("Отправленый текст: " + text);
     })



const error = () => {
  status.textContent = 'Невозможно получить ваше местоположение';
}

const success = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  
  status.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  mapLink.textContent = 'Ссылка на карту';
}


geo.addEventListener('click', () => {
  mapLink.href = '';
  mapLink.textContent = '';
  
    if (!navigator.geolocation) {
    status.textContent = 'Geolocation не поддерживается вашим браузером';
  } else {
    status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
});