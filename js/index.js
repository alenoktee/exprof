const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide) {
            slide.classList.add('active');
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentSlide) {
            dot.classList.add('active');
        }
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlides();
    });
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlides();
}, 10000);

updateSlides();



document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".lamination-slider .lamination-grid");
    const items = document.querySelectorAll(".lamination-item");
    const prevButton = document.querySelector(".left-button");
    const nextButton = document.querySelector(".right-button");

    const itemWidth = items[0].offsetWidth + 10; // Ширина элемента с учетом отступов
    const visibleItems = 4; // Количество видимых элементов
    const totalItems = items.length;

    // Количество клонов
    const clonesToAdd = visibleItems;

    // Клонирование
    const firstClone = [...items].slice(0, clonesToAdd).map(item => item.cloneNode(true));
    const lastClone = [...items].slice(-clonesToAdd).map(item => item.cloneNode(true));

    // Правильное добавление клонов
    lastClone.reverse().forEach(clone => slider.insertBefore(clone, slider.firstChild));
    firstClone.forEach(clone => slider.appendChild(clone));

    let currentIndex = clonesToAdd; // Начальная позиция (после добавленных клонов)
    let offset = -itemWidth * currentIndex;

    // Инициализация начального положения
    slider.style.transform = `translateX(${offset}px)`;

    const updateSlider = (direction) => {
        if (direction === "next") {
            currentIndex++;
            offset = -itemWidth * currentIndex;
            slider.style.transition = "transform 0.5s ease";
            slider.style.transform = `translateX(${offset}px)`;

            if (currentIndex >= totalItems + clonesToAdd) {
                setTimeout(() => {
                    slider.style.transition = "none";
                    currentIndex = clonesToAdd;
                    offset = -itemWidth * currentIndex;
                    slider.style.transform = `translateX(${offset}px)`;
                }, 500);
            }
        } else if (direction === "prev") {
            currentIndex--;
            offset = -itemWidth * currentIndex;
            slider.style.transition = "transform 0.5s ease";
            slider.style.transform = `translateX(${offset}px)`;

            if (currentIndex < clonesToAdd) {
                setTimeout(() => {
                    slider.style.transition = "none";
                    currentIndex = totalItems + clonesToAdd - 1;
                    offset = -itemWidth * currentIndex;
                    slider.style.transform = `translateX(${offset}px)`;
                }, 500);
            }
        }
    };

    // События для кнопок
    nextButton.addEventListener("click", () => updateSlider("next"));
    prevButton.addEventListener("click", () => updateSlider("prev"));
});
