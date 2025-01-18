'use strict';
const btn = document.getElementById('pass');
const passInput = document.querySelector('.pass input');
const box = document.getElementById('pass__box');
let show = false;
const minusBtns = document.querySelectorAll('.minus');
const plusBtns = document.querySelectorAll('.plus');
const counters = document.querySelectorAll('.counter');
const _class = document.querySelectorAll('.pass__class');
let selectedClass = 'любой';
const passBtnOk = document.getElementById('pass-btn-ok');


export const flightPassengers = {
	countAdults: 1,
	countChildren: 0,
	countBaby: 0,
	totalPassengers: 1,
	classPass: 'любой'
}

function togglePass(action) {
	box.classList[action]('hidden');
}

btn.addEventListener('click', () => {
	box.classList.add('visible');
	// togglePass('remove');
	inputTextContent();
})

_class.forEach(item => {
	item.addEventListener('click', (e) => {
			document.querySelector('.active_class').classList.replace('active_class', 'inactive_class');
			item.classList.replace('inactive_class', 'active_class');
			selectedClass = item.textContent.toLowerCase();
			flightPassengers.classPass = selectedClass;
	})
})

document.addEventListener('click', (e) => {
	const clickedElem = e.target;
	if(!box.contains(clickedElem) && !btn.contains(clickedElem)) {
		box.classList.remove('visible');
		// togglePass('add');
	}
})

passBtnOk.addEventListener('click', (e) => {
	e.stopPropagation();
	box.classList.remove('visible');
	// togglePass('add');
})

const passengers = {
	adults: 1,
	children: 0,
	baby: 0
}


plusBtns.forEach(btn => {
	changeCounter(btn, 'plus');
})
minusBtns.forEach(btn => {
	changeCounter(btn, 'minus');
})

function changeCounter(btn, sign) {
	let plus = true;
	if (sign === 'minus') {
		plus = false;
	}
	btn.addEventListener('click', () => {
		const id = +btn.dataset.id;
		switch(id) {
				case 0:
					if (!checkPassengers('adults', plus)) return;
					if ((passengers.adults === 1) && !plus && passengers.children === 0 && passengers.baby === 0) {
						return;
					}
					if (passengers.adults === 1 && !plus) {
						alert('Дети должны находиться под сопровождением взрослого!');
						return;
					}
					plus ? passengers.adults++ : passengers.adults--;
					flightPassengers.countAdults = passengers.adults;
					counters[id].textContent = passengers.adults;
					break;
				case 1:
					if (!checkPassengers('children', plus)) return;
					if ((passengers.children >= 1) && plus && passengers.adults === 0 && passengers.baby === 0) {
						return;
					}
					plus ? passengers.children++ : passengers.children--;
					flightPassengers.countChildren = passengers.children;
					counters[id].textContent = passengers.children;
					break;
				case 2:
					if (!checkPassengers('baby', plus)) return;
					if ((passengers.baby === 1) && !plus && passengers.adults === 0 && passengers.children === 0) {
						return;
					}
					plus ? passengers.baby++ : passengers.baby--;
					flightPassengers.countBaby = passengers.baby;
					counters[id].textContent = passengers.baby;
					break;
			}
			console.log('flightPassengers', flightPassengers);
		})
	}

function checkPassengers(key, plus) {
	const allPassengers = Object.values(passengers).reduce((acc, item) => acc + item);
	plusBtns.forEach(btn => {
		btn.disabled = false;
		btn.classList.remove('disabled-btn'); 
	});
	minusBtns.forEach(btn => {
		btn.disabled = false;
		btn.classList.remove('disabled-btn'); 
	});
	if (allPassengers <= 1) {

	}
	if (passengers[key] <= 0 && !plus) {
		return false;
	}
	if (allPassengers >= 9 && plus) {
		plusBtns.forEach(btn => {
			btn.disabled = true;
			btn.classList.add('disabled-btn'); 
		});
		return false;
	}

	return true;
}

function inputTextContent() {
	let allPassengers = Object.values(passengers).reduce((acc, item) => acc + item);
	flightPassengers.totalPassengers = allPassengers;
	
	if (allPassengers > 0) {
		passInput.value = `${allPassengers} пассажир(ов), ${selectedClass}`;
	}
}

inputTextContent();
	


