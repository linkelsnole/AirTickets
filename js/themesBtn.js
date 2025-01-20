const themesBtn = document.querySelectorAll('.themes-btn');
export let textButton = 'Авиабилеты';


themesBtn.forEach(button => {
	button.addEventListener('click', () => {
			themesBtn.forEach(btn => {
				btn.classList.remove('active-btn');
				btn.classList.add('inactive-btn');
			})
			button.classList.remove('inactive-btn');
			button.classList.add('active-btn');
			textButton = button.textContent;
	})
})

//?EMAIL-BOX--------------------------------
const emailInput = document.querySelector('.questions__content-right-email-box input');
const emailButton = document.querySelector('.questions__content-right-email-box button');
const errorMark = document.querySelector('.questions__content-right-email-box img');

emailButton.addEventListener('click', () => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (emailInput.value === '') {
		errorMark.classList.add('active');
		emailInput.style.border = '1px solid #F74069';
	} else if (!emailRegex.test(emailInput.value)) {
		errorMark.classList.add('active');
		emailInput.style.border = '1px solid #F74069';
		alert('Введите корректный email адрес');
	} else {
		alert('Почта отправлена в консоль');
		errorMark.classList.remove('active');
		emailInput.style.border = 'none';
		emailInput.value = '';
	}
})

//?EXCHANGE-BTN--------------------------------
const exchangeButton = document.querySelector('.header__intro-search-exchange');
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');

exchangeButton.addEventListener('click', () => {
	const fromValue = fromInput.value;
	const toValue = toInput.value;
	fromInput.value = toValue;
	toInput.value = fromValue;
})

//?АДАПТИВНЫЙ HEADER--------------------------------
const menuAdaptive = document.querySelector('.header__nav-adaptive-menu');
const listAdaptive = document.querySelector('.header__nav-list');

menuAdaptive.addEventListener('click', () => {
	if (listAdaptive.classList.contains('active')) {
		listAdaptive.classList.remove('active');
	} else {
		listAdaptive.classList.add('active');
	}
})




