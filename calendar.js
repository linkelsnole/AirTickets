const months = [
	'Январь', 
	'Февраль', 
	'Март', 
	'Апрель', 
	'Май', 
	'Июнь', 
	'Июль', 
	'Август', 
	'Сентябрь', 
	'Октябрь', 
	'Ноябрь', 
	'Декабрь'
]

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
let thereDirection = document.querySelector('.header__intro-search-input-box-there input');
let backDirection = document.querySelector('.header__intro-search-input-box-back input');
let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();
let currentDate = date.getDate();
const calendar = getById('days');
let counter = 0;
let clickedDays = [];
let betweenDays = [];
let allDays = [];

//Функция для скрытия и отображ календаря
function toggleCalendar(action) {
	getById('calendar').classList[action]('hidden');
}
[thereDirection, backDirection].forEach(input => {
	input.addEventListener('click', (e) => {
			toggleCalendar('remove');
	});
});

document.addEventListener('click', (e) => {
	const calendar = getById('calendar');
	const clickedElem = e.target;
	if (!calendar.contains(clickedElem) && 
			!thereDirection.contains(clickedElem) && 
			!backDirection.contains(clickedElem)) {
			toggleCalendar('add');
	}
});

function getById(id) {
	return document.getElementById(id)
}

/**
 * @description Отображает текущий месяц в календаре
 * @function showCurrMonth
 * @returns {void}
 */
function showCurrMonth() {
	showMonth(currentYear, currentMonth);
}



/** 
 * @description Отрисовывает выбранные дни в календаре
 * @function paintDay
 * @param day
 * @returns {void}
 */
function paintDay(day) {
	if (counter > 1) {
		counter = 0;
		clickedDays.forEach(item => {
			item.style.backgroundColor = 'inherit';
			clickedDays = [];
			
		})
		betweenDays.forEach(item => {
			item.style.backgroundColor = 'inherit';
			betweenDays = [];
		})
	}
	if (clickedDays.length && +day.textContent < +clickedDays[0].textContent) {
		return
	}
	clickedDays.push(day);
	if (counter === 0) {
		thereDirection.value = `${day.textContent}.${(currentMonth + 1).toString().padStart(2, '0')}.${currentYear}`;
	}
	if (counter === 1) {
		let first = allDays.indexOf(clickedDays[0]);
		let last = allDays.indexOf(clickedDays[1]);
		backDirection.value = `${day.textContent}.${(currentMonth + 1).toString().padStart(2, '0')}.${currentYear}`;
		betweenDays = allDays.slice(first+1, last);
		betweenDays.forEach(item => {
			item.style.backgroundColor = '#F1D3D8';
		})
	}

	day.style.backgroundColor = '#f36179';
	counter += 1;
}





/** 
 * @description Отрисовывает месяц в календаре
 * @function showMonth
 * @param {number} year - Год
 * @param {number} month - Месяц
 * @returns {void}
 */
function showMonth(year, month) {
	getById('month').textContent = `${months[month]} ${year}`
	let firstDayOfMonth = new Date(year, month, 7).getDay();
	let lastDayOfMonth = new Date(year, month + 1, 0).getDate();
	let lastDayOfPreviousMonth = new Date(year, month, 0).getDate();
	

	for (let i = 1; i <= lastDayOfMonth; i++) {
		if (i === 1) {
			let prevMonthDays = lastDayOfPreviousMonth - firstDayOfMonth + 1;
			for (let j = 0; j < firstDayOfMonth; j++) {
				let day = document.createElement('div')
				day.textContent = prevMonthDays
				day.classList.add('day-title', 'inactive', 'days-item')
				calendar.append(day)
				prevMonthDays++
			}
		}

		let day = document.createElement('div')
		day.textContent = i
		day.classList.add('day-title', 'days-item')
		day.addEventListener('click', () => {
			paintDay(day)
		})
		allDays.push(day);
		calendar.append(day)

		if (i === lastDayOfMonth) {
			let remainDays = new Date(year, month, i).getDay();
			counter = 1;
			for (remainDays; remainDays < 7; remainDays++) {
				let day = document.createElement('div')
				day.textContent = counter
				day.classList.add('day-title', 'inactive')
				calendar.append(day)
				counter += 1;
			}
		}
	}
}

/** 
 * @description Отрисовывает месяц в календаре
 * @function nextMonth
 * @returns {void}
 */
function nextMonth() {
	if (currentMonth === 11) {
		currentMonth = 0;
		currentYear += 1;
	} else {
		currentMonth += 1;
	}
	clearCalendar()
	showCurrMonth()

}

function clearCalendar() {
	getById('days').innerHTML = '';
}

function prevMonth() {
	if (currentMonth === 0) {
		currentMonth = 11;
		currentYear -= 1;
	} else {
		currentMonth -= 1;
	}
	clearCalendar()
	showCurrMonth()
}

/** 
 * @description Создает календарь
 * @function createCalendar
 * @returns {void}
 */
function createCalendar() {
	getById('prev').addEventListener('click', () => {
		prevMonth()
	})
	getById('next').addEventListener('click', () => {
		nextMonth()
	})
	let title = getById('daysTitle');
	daysOfWeek.forEach(item => {
		let day = document.createElement('span')
		day.textContent = item
		day.classList.add('day-title')
		title.append(day)
	})
	showCurrMonth()

}




//Создание календаря
createCalendar()

