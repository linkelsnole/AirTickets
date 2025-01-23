//?ВЫПАДАЮЩЕЕ МЕНЮ
const dropMenu = document.querySelector('.drop-menu');
const navLink = document.querySelectorAll('.header__nav-link');
const headerNavListItem = document.querySelectorAll('.header__nav-list-item');

headerNavListItem.forEach(item => {
	const dropMenuClosest = item.querySelector('.drop-menu');
	const navLink = item.querySelector('.header__nav-link');

	navLink.addEventListener('click', (e) => {
		e.preventDefault();
	});

	if (dropMenuClosest) {
		item.addEventListener('mouseenter', () => {
			dropMenuClosest.classList.remove('drop-menu-out');
			dropMenuClosest.classList.add('drop-menu-in');
		})
		item.addEventListener('mouseleave', () => {
			dropMenuClosest.classList.remove('drop-menu-in');
			dropMenuClosest.classList.add('drop-menu-out');
		})
	}
})