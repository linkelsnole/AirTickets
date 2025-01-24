'use strict';
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


let selectedDates = {
	start: null,
	end: null
};

export const flightDates = {
	thereDirectionDate: null,
	backDirectionDate: null
}


document.addEventListener('click', (e) => {
	const calendar = getById('calendar');
	const clickedElem = e.target;
	if (!calendar.contains(clickedElem) && 
			!thereDirection.contains(clickedElem) && 
			!backDirection.contains(clickedElem)) {
			getById('calendar').classList.remove
			('visible');
	}
});

function getById(id) {
	return document.getElementById(id)
}

function showCurrMonth() {
	showMonth(currentYear, currentMonth);
}

[thereDirection, backDirection].forEach(input => {
	input.addEventListener('click', (e) => {
		getById('calendar').classList.add('visible');
	});
});

[thereDirection, backDirection].forEach(input => {
	input.addEventListener('change', (e) => {
			const direction = input.id === 'from' ? 'backDirectionDate' : 'thereDirectionDate';
			flightDates[direction] = input.value;
	});
});


/** 
 * @description Отрисовывает выбранные дни в календаре
 */
function paintDay(day) {
	console.log('counter', counter);
	
	
	if (counter > 1) {
		counter = 0;
		clickedDays.forEach(item => {
			item.querySelector('.day-label').remove();
			item.classList.remove('selected-day');
			clickedDays = [];
			
		})
		betweenDays.forEach(item => {
			item.classList.remove('between-days');
			betweenDays = [];
		})
	}

	const dayNumber = day.textContent.replace(/[^\d]/g, '');
	
	

	//Если это 2-ой клик и выбранный день раньше первого
	if (clickedDays.length) {
			const firstClickDate = new Date(clickedDays[0].dataset.fullDate.split('.').reverse().join('-'));
			const currentFullDate = day.dataset.fullDate;
			const currentClickDate = new Date(currentFullDate.split('.').reverse().join('-'));
			
			if (currentClickDate < firstClickDate) {
					counter = 0;
					clickedDays.forEach(item => {
							item.querySelector('.day-label')?.remove();
							item.classList.remove('selected-day');
					});
					clickedDays = [];
					selectedDates.start = null;
					selectedDates.end = null;
			}
	}
	clickedDays.push(day);

	if (counter === 0) {
		const dayNum = day.getAttribute('data-day') || dayNumber;
		thereDirection.value = `${dayNum.padStart(2, '0')}.${(currentMonth + 1).toString().padStart(2, '0')}.${currentYear}`;
		flightDates.thereDirectionDate = thereDirection.value;//обнова объекта
		selectedDates.start = thereDirection.value;
	}

	if (counter === 1) {
		let first = allDays.indexOf(clickedDays[0]);
		let last = allDays.indexOf(clickedDays[1]);
		
		if (first === last) { 
			counter = 0;
			clickedDays.forEach(item => {
				if (item.querySelector('.day-label')) {
					item.querySelector('.day-label').remove();
				}
				item.classList.remove('selected-day');
			});
			clickedDays = [];
			// Сбрасываем выбранные даты
			selectedDates.start = null;
			selectedDates.end = null;
			return;
		}

		backDirection.value = `${dayNumber}.${(currentMonth + 1).toString().padStart(2, '0')}.${currentYear}`;
		flightDates.backDirectionDate = backDirection.value;//обнова объекта

		// Сохраняем конечную дату
		selectedDates.end = backDirection.value;
		console.log('selectedDates', selectedDates);
		betweenDays = allDays.slice(first+1, last);
		betweenDays.forEach(item => {
			item.classList.add('between-days');
		})
	}
	//добавил
	const label = document.createElement('div');
  label.classList.add('day-label');
  label.textContent = counter === 0 ? 'Туда' : 'Обратно';
	label.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  day.appendChild(label);
  day.classList.add('selected-day');

	counter += 1;
	console.log('counter++', counter);
}



/** 
 * Отрисовывает месяц в календаре
 */
function showMonth(year, month) {
	allDays =[];//------------------------------------------------------
	getById('month').textContent = `${months[month]} ${year}`
	let firstDayOfMonth = new Date(year, month, 7).getDay();
	let lastDayOfMonth = new Date(year, month + 1, 0).getDate();
	let lastDayOfPreviousMonth = new Date(year, month, 0).getDate();
	let currentDay = date.getDate();
	let currentDate = new Date();
	let today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
	

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
		day.dataset.fullDate = `${i.toString().padStart(2, '0')}.${(month + 1).toString().padStart(2, '0')}.${year}`;//РЕШЕНИЕ


		if (i === currentDay && currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()) {
			day.classList.add('current-days');

			day.setAttribute('data-day', i.toString().padStart(2, '0'));//РЕШЕНИЕ
			day.textContent = i.toString().padStart(2, '0');

			const label = document.createElement('div');
			label.classList.add('current-day-label');
			label.textContent = 'Сегодня';
			day.appendChild(label);
			console.log('textContentDAY', day.textContent);
			
		}
		
		day.addEventListener('click', () => {
			if (day.classList.contains('inactive')) {
				return
			}
			paintDay(day)
		})
		allDays.push(day);
		calendar.append(day)

		
		//Проверка на прошедшие дни
		let checkDate = new Date(year, month, i);
		if (checkDate < today) {
			day.classList.add('inactive');
		}

		if (i === lastDayOfMonth) {
			let remainDays = new Date(year, month, i).getDay();
			let counterRemain = 1;
			for (remainDays; remainDays < 7; remainDays++) {
				let day = document.createElement('div')
				day.textContent = counterRemain
				day.classList.add('day-title', 'inactive')
				calendar.append(day)
				counterRemain += 1;
			}
		}
	}
}


/** 
 * Отрисовывает месяц в календаре
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
 * Создает календарь
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

