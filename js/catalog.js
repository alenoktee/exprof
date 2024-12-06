let activeProfile = null;

// Загружаем данные из JSON
fetch("profiles.json")
    .then(response => response.json())
    .then(profiles => init(profiles));

// Инициализация
function init(profiles) {
    const profilesGrid = document.getElementById("profiles");

    // Отображаем карточки
    profiles.forEach(profile => {
        const card = document.createElement("div");
        card.className = "bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer";
        card.dataset.profileId = profile.id;
        card.innerHTML = `
            <img src="${profile.subprofiles[0].img}" alt="${profile.title}" class="w-full mb-4">
            <h2 class="text-lg font-bold">${profile.title}</h2>
        `;
        card.addEventListener("click", () => toggleProfile(profile));
        profilesGrid.appendChild(card);
    });
}

// Переключение профиля
function toggleProfile(profile) {
    const details = document.getElementById("profileDetails");
    if (activeProfile === profile.id) {
        details.classList.add("hidden");
        activeProfile = null;
    } else {
        showProfile(profile);
        activeProfile = profile.id;
    }
}

function showProfile(profile) {
    const details = document.getElementById("profileDetails");
    const title = document.getElementById("profileTitle");
    const description = document.getElementById("profileDescription");
    const images = document.getElementById("subprofileImages");
    const table = document.getElementById("profileTable");

    title.textContent = profile.title;
    description.textContent = profile.description;

    // Обновляем изображения подпрофилей
    images.innerHTML = "";
    profile.subprofiles.forEach((subprofile, index) => {
        const img = document.createElement("img");
        img.src = subprofile.img;
        img.alt = subprofile.title;
        img.className = `w-20 h-20 border-2 rounded ${
            index === 0 ? "border-blue-500" : "border-gray-200"
        } cursor-pointer`;
        img.addEventListener("click", () => {
            // Смена обводки у всех изображений
            images.querySelectorAll("img").forEach(img => {
                img.classList.remove("border-blue-500");
                img.classList.add("border-gray-200");
            });
            img.classList.add("border-blue-500");
            img.classList.remove("border-gray-200");

            // Обновляем таблицу
            updateTable(profile, index);
        });
        images.appendChild(img);
    });

    // Вывод характеристик первого подпрофиля
    updateTable(profile, 0);

    details.classList.remove("hidden");
}


function updateTable(profile, subIndex) {
    const template = document.getElementById("profileTableTemplate");
    const tableClone = template.cloneNode(true);
    const specs = profile.subprofiles[subIndex].specs;

    tableClone.id = ""; // Убираем ID у клона, чтобы не дублировать
    tableClone.classList.remove("hidden");

    // Заполняем таблицу
    tableClone.querySelectorAll("[data-spec]").forEach(cell => {
        const index = cell.dataset.spec;
        cell.textContent = specs[index];
    });

    // Обновляем таблицу на странице
    const container = document.getElementById("profileTable");
    container.innerHTML = ""; // Очищаем старую таблицу
    container.appendChild(tableClone);
}
