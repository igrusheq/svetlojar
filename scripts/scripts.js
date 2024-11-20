let date = new Date('Dec 9 2024 00:00:00')

function counts(){
    let now = new Date();
    let gap = date - now;

    let days = Math.floor(gap / 1000 / 60 / 60 / 24)
    let hours = Math.floor(gap / 1000 / 60 / 60 ) % 24
    let minutes = Math.floor(gap / 1000 / 60 ) % 60
    let seconds = Math.floor(gap / 1000 ) % 60

    document.getElementById('d').innerText = days + ' Дней'
    document.getElementById('h').innerText = hours + ' Часов'
    document.getElementById('m').innerText = minutes + ' Минут'
    document.getElementById('s').innerText = seconds + ' Секунд'
}
counts();

setInterval(counts, 1000);

const name = document.getElementById('name');
const phone = document.getElementById('phone');
const file = document.getElementById('file');
const label = document.getElementById('label');
const agree2 = document.getElementById('agree2');

document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных в поля, если они есть в localStorage
    if (localStorage.getItem('name') && localStorage.getItem('phone')) {
        updateFirstEntry(localStorage.getItem('name'), localStorage.getItem('phone'));
    }
});

document.getElementById('send').onclick = function(event){
    let hasError = false;

    [name, phone, file].forEach(item => {
        if (!item.value) {
            if (item.id === 'file') {
                const label = document.getElementById('label');
                label.style.borderColor = 'red';
                label.style.color = 'red';
                hasError = true;
            }
            item.style.borderColor = 'red';
            hasError = true;
        } else {
            item.style.borderColor = '';
            if (item.id === 'file') {
                label.style.color = '';
                label.style.borderColor = '';
            }
        }
    });

    if (!validatePhone(phone.value)) {
        phone.style.borderColor = 'red';
        hasError = true;
    } else {
        phone.style.borderColor = '';
    }

    if (!agree2.checked) {
        agree2.style.outline = '2px solid red';
        hasError = true;
    } else {
        agree2.style.outline = '';
    }

    if (!hasError) {
        // Сохранение данных в localStorage
        localStorage.setItem('name', name.value);
        localStorage.setItem('phone', phone.value);

        // Обновление текста в первом элементе блока
        updateFirstEntry(name.value, phone.value);

        // Очистка полей ввода
        [name, phone, file].forEach(item => {
            item.value = "";  // Очистка значения
            item.style.borderColor = '';  // Сброс стилей
        });
        label.style.color = '';  // Сброс стилей у лейбла
        agree2.checked = false;  // Сброс флага согласия
        alert('Вы участвуете!');
    }
};

// Валидация номера телефона
function validatePhone(phone) {
    const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
    return phoneRegex.test(phone);
}

// Функция для обновления данных в первом блоке
function updateFirstEntry(newName, newPhone) {
    const firstEntry = document.querySelector('.column .entry:first-child');
    const nameSpan = firstEntry.querySelector('.name');
    const phoneSpan = firstEntry.querySelector('.phone');

    nameSpan.innerText = newName;

    // Замена последних трех цифр телефона на ***
    const maskedPhone = newPhone.slice(0, -3) + '***';
    phoneSpan.innerText = maskedPhone;
}

document.addEventListener('DOMContentLoaded', function() {
    const photosDiv = document.getElementById('photos');
    const slidesContainer = photosDiv.querySelector('.slides-container');
    const prevArrow = document.getElementById('prevArrow');
    const nextArrow = document.getElementById('nextArrow');

    const images = [
        'images/otziv4.png', // замените на фактические пути к вашим изображениям
        'images/otziv3.png'
    ];
    let currentIndex = 0;

    // Создаем элементы img для каждой фотографии
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('slide');
        img.style.display = index === 0 ? 'block' : 'none'; // Показываем только первое изображение
        slidesContainer.appendChild(img);
    });

    const slides = slidesContainer.querySelectorAll('.slide');

    // Функция смены изображения
    function showSlide(index) {
        slides[currentIndex].style.display = 'none';
        currentIndex = (index + slides.length) % slides.length; // Циклическая смена
        slides[currentIndex].style.display = 'block';
    }

    // Функции для обработки стрелок
    prevArrow.addEventListener('click', () => showSlide(currentIndex - 1));
    nextArrow.addEventListener('click', () => showSlide(currentIndex + 1));

    // Запускаем автоматический слайдер
    let interval = setInterval(() => showSlide(currentIndex + 1), 3000); // Меняем изображение каждые 3 секунды

    // Останавливаем слайдер при наведении и снова запускаем при выходе
    photosDiv.addEventListener('mouseover', () => clearInterval(interval));
    photosDiv.addEventListener('mouseout', () => {
        interval = setInterval(() => showSlide(currentIndex + 1), 3000);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.photos img');  // Получаем все изображения с классом .photos img

    images.forEach(image => {
        image.addEventListener('click', function() {
            // Если изображение уже увеличено, убираем увеличение
            if (image.classList.contains('zoomed')) {
                image.classList.remove('zoomed');
            } else {
                // Убираем увеличение у других изображений
                images.forEach(img => img.classList.remove('zoomed'));
                // Добавляем увеличение для текущего изображения
                image.classList.add('zoomed');
            }
        });
    });
});


// Добавляем обработчики событий на ввод текста
[name, phone, file].forEach(item => {
    item.addEventListener('input', function () {
        if (item.value) {
            item.style.borderColor = ''; // Снимаем красную подсветку
            if (item.id === 'file') {
                label.style.color = ''; // Снимаем красную подсветку у label
                label.style.borderColor = '';
            }
        }
    });
});

agree2.addEventListener('change', function () {
    agree2.style.outline = ''; // Снимаем красную рамку при изменении состояния чекбокса
});

document.getElementById('send').onclick = async function (event) {
    event.preventDefault(); // Отключаем стандартное поведение кнопки

    let hasError = false;

    // Проверяем поля формы
    [name, phone, file].forEach(item => {
        if (!item.value) {
            if (item.id === 'file') {
                label.style.borderColor = 'red';
                label.style.color = 'red';
                hasError = true;
            }
            item.style.borderColor = 'red';
            hasError = true;
        } else {
            item.style.borderColor = '';
            if (item.id === 'file') {
                label.style.color = '';
                label.style.borderColor = '';
            }
        }
    });

    if (!validatePhone(phone.value)) {
        phone.style.borderColor = 'red';
        hasError = true;
    } else {
        phone.style.borderColor = '';
    }

    if (!agree2.checked) {
        agree2.style.outline = '2px solid red';
        hasError = true;
    } else {
        agree2.style.outline = '';
    }

    if (!hasError) {
        // Сохраняем данные
        const payload = {
            name: name.value.trim(),
            phone: phone.value.trim(),
        };

        const scriptURL = 'https://script.google.com/macros/s/AKfycbyxqkFV_X7KPnLhiQ2hZpwAxftHkscZGyTAkSh276vywbwIhzzcgFYTpaRgisc0KF1A/exec'; // Вставьте ваш URL Google Apps Script

        let sendSuccess = false;

        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                mode: 'no-cors',
            });

            console.log('Данные отправлены успешно.');
            sendSuccess = true;
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }

        updateFirstEntry(payload.name, payload.phone);

        if (sendSuccess) {
            alert('Вы участвуете! Данные успешно отправлены.');
        } else {
            alert('Вы участвуете! Но данные не удалось отправить на сервер.');
        }

        // Очищаем поля формы
        [name, phone, file].forEach(item => {
            item.value = ''; // Очистка значения
            item.style.borderColor = ''; // Сброс стилей
        });
        label.style.color = ''; // Сброс стилей у лейбла
        agree2.checked = false; // Сброс флага согласия
    }
};


// Функция для обновления данных в первом блоке
function updateFirstEntry(newName, newPhone) {
    const firstEntry = document.querySelector('.column .entry:first-child');
    const nameSpan = firstEntry.querySelector('.name');
    const phoneSpan = firstEntry.querySelector('.phone');

    nameSpan.innerText = newName;

    // Замена последних трех цифр телефона на ***
    const maskedPhone = newPhone ? newPhone.slice(0, -3) + '***' : '';
    phoneSpan.innerText = maskedPhone;
}

// Валидация номера телефона
function validatePhone(phone) {
    const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
    return phoneRegex.test(phone);
}






