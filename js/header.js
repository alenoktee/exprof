const burger = document.querySelector('.burger');
const overlay = document.querySelector('.burger-overlay');
const closeBurger = document.querySelector('.close-burger');

burger.addEventListener('click', () => {
    overlay.classList.add('active');
    burger.classList.add('hidden');
});

closeBurger.addEventListener('click', () => {
    overlay.classList.remove('active');
    burger.classList.remove('hidden');
});

overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        overlay.classList.remove('active');
        burger.classList.remove('hidden');
    }
});