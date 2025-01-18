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
