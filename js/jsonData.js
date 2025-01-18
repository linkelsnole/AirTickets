import { textButton } from './themesBtn.js';
import { flightDirection } from './searchCities.js';
import { flightDates } from './calendar.js';
import { flightPassengers } from './pass.js';
const searchBtn = document.getElementById('search-btn');

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

