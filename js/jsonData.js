import { textButton } from './themesBtn.js';
import { flightDirection } from './searchCities.js';
import { flightDates } from './calendar.js';
import { flightPassengers } from './pass.js';
const searchBtn = document.getElementById('search-btn');


//?ПОИСК-ДАННЫХ--------------------------------
searchBtn.addEventListener('click', () => {
	const flightData  = {
		theme: textButton,
		direction: flightDirection,
		dates: flightDates,
		passengers: flightPassengers
	}
	
	const flightDataJson = JSON.stringify(flightData);
	alert('Данные отправлены в json-формате (см. консоль)')
	console.log('Итоги заказа:');
	console.log(flightDataJson);
})



//?ТОП-10 Авиакомпаний--------------------------------
const cityList = document.querySelector('.popular_dest__content-right-box-list');

function getCityList() {
	fetch('http://localhost:3000/airlines')
	.then(response => response.json())
	.then(data => {
		console.log('Get data', data);
		paintAirlines(data);
	})
}
getCityList();

function paintAirlines(array) {
	const sorted = array.sort((a, b) => b.rating - a.rating)
	console.log('Sorted', sorted);
	sorted.forEach(airline => {
		const li = document.createElement('li');
		const a = document.createElement('a');
		a.href = '#';
		a.textContent = airline.name;
		a.style.setProperty('--rating', `"${airline.rating}"`);
		li.appendChild(a);
		cityList.appendChild(li);
	})
}
