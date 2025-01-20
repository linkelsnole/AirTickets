const accordionItems = document.querySelectorAll('.footer__lists ul');

accordionItems.forEach(item => {
    const header = item.querySelector('div:first-child');
    const content = item.querySelector('div:nth-child(2)');
    
    header.addEventListener('click', () => {
        if (!content.classList.contains('active')) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.footer__lists')) {
        accordionItems.forEach(item => {
            const content = item.querySelector('div:nth-child(2)');
            content.classList.remove('active');
        });
    }
});