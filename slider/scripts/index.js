let images = document.querySelectorAll('.slider__slide');
const sliderLine = document.querySelector('.slider__slider-line');
const template = document.querySelector('#template').content;
const choiceButtonLine = document.querySelector('.slider__button-line');
let buttons;
let count = 0;
let width;
const step = 5;
let isThrottled = false;
let x = 0;
let isStart = true;

function renderSlides() {
    slider.forEach(item => {
        const img = template.querySelector('.slider__slide').cloneNode(true);
        const choiceButton = template.querySelector('.button_type_choice').cloneNode(true);
        img.src = item.link;
        img.alt = item.name;
        choiceButton.name = item.number
        choiceButton.addEventListener('click', check);
        choiceButtonLine.append(choiceButton);
        sliderLine.append(img);
    });
    buttons = document.querySelectorAll('.button');
}

renderSlides()

function init() {
    width = document.querySelector('.slider').offsetWidth;
    images = document.querySelectorAll('.slider__slide');
    choiceButton = document.querySelectorAll('.button_type_choice');
    choiceButton[count].classList.add('button_type_active');
    images.forEach(item => {
        item.style.width = width + 'px';
    });
    if (images.length - 1 == 0) {
        buttons.forEach(item => item.setAttribute("disabled", "disabled"));
    }
    x=count*width
    sliderLine.style.transform = 'translate(-' + x + 'px)';
    sliderLine.style.width = width * images.length + 'px';

}

init();

window.addEventListener('resize', init);
document.querySelector('.control-button_nxt').addEventListener('click', rollSliderL);
document.querySelector('.control-button_prev').addEventListener('click', rollSliderR);

document.addEventListener('keyup', function(event) {
    if (event.code == 'ArrowLeft') {
        rollSliderR()
    }
  });
document.addEventListener('keyup', function(event) {
    if (event.code == 'ArrowRight') {
        rollSliderL()
    }
  });

function rollSliderL() {
    if (isThrottled) {
        return
    } else {
        choiceButton[count].classList.remove('button_type_active');
        count++
        if (count >= images.length) {
            choiceButton[0].classList.add('button_type_active');
            count = 1;
            x = 0
            sliderLine.style.transform = 'translate(-' + x + 'px)';
            images.forEach(function (item, index) {
                if (index < (images.length - 1)) {
                    sliderLine.append(item);
                }
            })
            images = document.querySelectorAll('.slider .slider__slider-line img');
            let timer = setInterval(function () {
                if (count * width >= x + step) {
                    x += step;
                    sliderLine.style.transform = 'translate(-' + x + 'px)';
                    isThrottled = true;
                } else {
                    clearInterval(timer);
                    reset(true);
                    return
                }
            }, 1);
        } else {
            let timer = setInterval(function () {
                choiceButton[count].classList.add('button_type_active');
                if (count * width >= x + step) {
                    x += step;
                    sliderLine.style.transform = 'translate(-' + x + 'px)';
                    isThrottled = true;
                } else {
                    x = count * width
                    sliderLine.style.transform = 'translate(-' + x + 'px)';
                    clearInterval(timer);
                    isThrottled = false;
                }
            }, 1);
        }
    }
}

function rollSliderR() {
    if (isThrottled) {
        return
    } else {
        choiceButton[count].classList.remove('button_type_active');
        count--;
        if (count < 0) {
            count = images.length - 1;
            choiceButton[count].classList.add('button_type_active');
            x = width * count
            sliderLine.style.transform = 'translate(-' + x + 'px)';

            images.forEach(function (item, index) {
                if (index < (images.length - 1)) {
                    sliderLine.append(item);
                }
            })
            x = width
            sliderLine.style.transform = 'translate(-' + x + 'px)';
            images = document.querySelectorAll('.slider__slide');
            count = 0
            let timer = setInterval(function () {
                if (count * width <= x + step) {
                    x -= step;
                    sliderLine.style.transform = 'translate(-' + x + 'px)';
                    isThrottled = true;
                } else {
                    clearInterval(timer);
                    reset(false);
                    return
                }
            }, 1);
        } else {
            let timer = setInterval(function () {
                choiceButton[count].classList.add('button_type_active');
                if (count * width <= x - step) {
                    x -= step;
                    sliderLine.style.transform = 'translate(-' + x + 'px)';
                    isThrottled = true;
                } else {
                    x = count * width;
                    sliderLine.style.transform = 'translate(-' + x + 'px)';
                    clearInterval(timer);
                    isThrottled = false;
                    return
                }
            }, 1);
        }
    }
}

function check(evt) {
    if (isThrottled) {
        return
    } else {
        if (evt.target.name == count) {
            return
        } else {
            choiceButton[count].classList.remove('button_type_active');
            let newCount = evt.target.name;
            if (newCount > count) {
                count = +newCount - 1
                rollSliderL(count);
            } else if (newCount < count) {
                count = +newCount + 1
                rollSliderR(count);
            }
        }
    }
}

function reset(isStart) {
    if (isStart) {
        isThrottled = false;
        x = 0;
        sliderLine.append(images[count - 1]);
        sliderLine.style.transform = 'translate(-' + x + 'px)';
        images = document.querySelectorAll('.slider__slide');
        count = 0;
    } else {
        isThrottled = false;
        count = images.length - 1;
        x = count * width;
        sliderLine.append(images[0]);
        sliderLine.style.transform = 'translate(-' + x + 'px)';
        images = document.querySelectorAll('.slider__slide');
    }
}