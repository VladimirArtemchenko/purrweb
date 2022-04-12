let images = document.querySelectorAll('.slider__slide');
const sliderLine = document.querySelector('.slider__slider-line');
const template = document.querySelector('#template').content;
const choiceButtonLine = document.querySelector('.slider__button-line');
let buttons;
const duration = 500;
let width;
let isThrottled = false;
let x = 0;
let direction;
const controlButtons = Array.from(document.querySelectorAll('.button_type_control'));
let multiplier = 1;
let currentSlide = 0;

// Preview доп-------------------------------------------------------------------------------------------

const preview = document.querySelector('.popup_type_preview');
const previewImage = document.querySelector('.popup__image');
const previewTitle = document.querySelector('.popup__title_type_preview');
const closePreviewButton = document.querySelector('.popup__close-button_type_preview');
closePreviewButton.addEventListener('click', closePreviewButtonHandler);

function previewHandler(evt) {
    previewImage.src = evt.target.src;
    previewImage.alt = evt.target.alt;
    previewTitle.textContent = evt.target.alt;
    openPopup(preview);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function closePreviewButtonHandler() {
    closePopup(preview);
}

//Функция рендера колекции слайдов
function renderSlides() {
    slider.forEach((item, index) => {
        const img = template.querySelector('.slider__slide').cloneNode(true);
        const choiceButton = template.querySelector('.button_type_choice').cloneNode(true);
        img.src = item.link;
        img.alt = item.name;
        img.id = index;
        choiceButton.id = index;
        choiceButton.addEventListener('click', checkSlide);
        choiceButtonLine.append(choiceButton);
        sliderLine.append(img);
        img.addEventListener('click', previewHandler);
    });
    buttons = document.querySelectorAll('.button');

    controlButtons.forEach(button => {
        button.addEventListener('click', function (evt) {
            let target = evt.target;
            if (isThrottled) {
                return
            } else {
                if (target.classList.contains('control-button_nxt')) {
                    multiplier = 1;
                    direction = "left"
                } else if (target.classList.contains('control-button_prev')) {
                    multiplier = 1;
                    direction = "right"
                } else {
                    return;
                }
                rollSlider(multiplier, direction);
            }
        });
    });
}

renderSlides();

//----------------------------------------------------------------------------------------------------------------------
function init() {
    width = document.querySelector('.slider').offsetWidth;
    images = document.querySelectorAll('.slider__slide');
    choiceButton = document.querySelectorAll('.button_type_choice');
    choiceButton[currentSlide].classList.add('button_type_active');
    images.forEach(item => {
        item.style.width = width + 'px';
    });
    if (images.length - 1 === 0) {
        buttons.forEach(item => item.setAttribute("disabled", "disabled"));
    }
    console.log(width)
}

init();
//----------------------------------------------------------------------------------------------------------------------
window.addEventListener('resize', init);
//----------------------------------------------------------------------------------------------------------------------
document.addEventListener('keyup', function (event) {
    if (event.code === 'ArrowLeft') {
        multiplier = 1;
        direction = "left"
        rollSlider(multiplier, direction)
    }
    if (event.code === 'ArrowRight') {
        multiplier = 1;
        direction = "right"
        rollSlider(multiplier, direction)
    }
});

//----------------------------------------------------------------------------------------------------------------------
function rollSlider(multiplier, direction) {
    isThrottled = true
    insertSlide(direction);
    animate({multiplier, direction, roll});
}

function animate({multiplier, direction, roll}) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) {
            timeFraction = 1;
            roll(multiplier, direction, timeFraction);
            deleteSlide(direction);
            currentSlide = images[0].id;
            isThrottled = false;
            return
        }
        roll(multiplier, direction, timeFraction);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

function roll(multiplier, direction, timeFraction) {
    if (direction === 'left') {
        sliderLine.style.transform = 'translate(-' + timeFraction * width * multiplier + 'px)';
    }
    if (direction === 'right') {
        sliderLine.style.transform = 'translate(-' + (width - timeFraction * width) * multiplier + 'px)';
    }
}

function checkSlide(evt) {
    if (isThrottled) {
        return
    } else {
        isThrottled = true
        if (evt.target.id > currentSlide) {
            multiplier = evt.target.id - currentSlide
            direction = 'left';
            rollSlider(multiplier, direction)
        }
        if (evt.target.id < currentSlide) {
            multiplier = currentSlide - evt.target.id
            direction = 'right';
            rollSlider(multiplier, direction)
        }else {
            isThrottled = false
        }
    }
}

function insertSlide(direction) {
    for (let i = 0; i < multiplier; ++i) {
        if (direction === 'left') {
            choiceButton[(images[i].id)].classList.remove('button_type_active');
            choiceButton[(images[1 + i].id)].classList.add('button_type_active');
            const copy = images[i].cloneNode(true);
            sliderLine.append(copy);
            sliderLine.style.transform = 'translate(-' + 0 + 'px)';
            images = document.querySelectorAll('.slider__slide');
        }
        if (direction === 'right') {
            choiceButton[(images[0].id)].classList.remove('button_type_active');
            choiceButton[(images[images.length - 1 - i].id)].classList.add('button_type_active');
            const copy = images[images.length - 1 - i].cloneNode(true);
            sliderLine.prepend(copy);
            sliderLine.style.transform = 'translate(-' + width + 'px)';
            images = document.querySelectorAll('.slider__slide');
        }
    }
}

function deleteSlide(direction) {
    for (let i = 0; i < multiplier; ++i) {
        if (direction === 'left') {
            images[i].remove();
        }
        if (direction === 'right') {
            images[images.length - 1 - i].remove();
        }
    }
    sliderLine.style.transform = 'translate(-' + 0 + 'px)';
    images = document.querySelectorAll('.slider__slide');
}