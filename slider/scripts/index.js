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

// Preview-----------------------------------------------------------------------------------------

const preview = document.querySelector('.popup_type_preview');
const previewImage = document.querySelector('.popup__image');
const previewTitle = document.querySelector('.popup__title_type_preview');
const closePreviewButton = document.querySelector('.popup__close-button_type_preview');
const popup = document.querySelector(".popup");
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

//--------------------------------------------------------------------------------------------------------
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
        img.addEventListener('click', previewHandler);
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

<<<<<<< HEAD
=======

>>>>>>> develop
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

// проба тача



let  sliderTrack = document.querySelector('.slider__slider-line'),
  slides = document.querySelectorAll('.slider__slide'),
  prev = document.querySelector('.control-button_prev'),
  next = document.querySelector('.control-button_nxt'), 
  slideWidth = width,
  slideIndex = 0,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  posY1 = 0,
  posY2 = 0,
  posFinal = 0,
  isSwipe = false,
  isScroll = false,
  allowSwipe = true,
  transition = true,
  nextTrf = 0,
  prevTrf = 0,
  lastTrf = --slides.length * slideWidth,
  posThreshold = slides[0].offsetWidth * 0.35,
  trfRegExp = /([-0-9.]+(?=px))/,
  swipeStartTime,
  swipeEndTime,
  
  getEvent = function() {
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
  },

  
  swipeStart = function() {
    let evt = getEvent();

    if (allowSwipe) {

      swipeStartTime = Date.now();

      nextTrf = (slideIndex + 1) * -slideWidth;
      prevTrf = (slideIndex - 1) * -slideWidth;

      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;

      sliderTrack.style.transition = '';

      document.addEventListener('touchmove', swipeAction);
      document.addEventListener('mousemove', swipeAction);
      document.addEventListener('touchend', swipeEnd);
      document.addEventListener('mouseup', swipeEnd);
    }
  },
  swipeAction = function() {

    let evt = getEvent(),
      style = sliderTrack.style.transform,
      transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      if (slideIndex === 0) {
        if (posInit < posX1) {
          setTransform(transform, 0);
          return;
        } else {
          allowSwipe = true;
        }
      }

      // запрет ухода вправо на последнем слайде
      if (slideIndex === --slides.length) {
        if (posInit > posX1) {
          setTransform(transform, lastTrf);
          return;
        } else {
          allowSwipe = true;
        }
      }

      if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
        reachEdge();
        return;
      }

      sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }

  },
  swipeEnd = function() {
    posFinal = posInit - posX1;

    isScroll = false;
    isSwipe = false;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    if (allowSwipe) {
      swipeEndTime = Date.now();
      if (Math.abs(posFinal) > posThreshold || swipeEndTime - swipeStartTime < 300) {
        if (posInit < posX1) {
          slideIndex--;
        } else if (posInit > posX1) {
          slideIndex++;
        }
      }

      if (posInit !== posX1) {
        allowSwipe = false;
        rollSliderL();
      } else {
        allowSwipe = true;
      }

    } else {
      allowSwipe = true;
    }

  },
  setTransform = function(transform, comapreTransform) {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    allowSwipe = false;
  },
  reachEdge = function() {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  };

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';


sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
sliderTrack.addEventListener('touchstart', swipeStart);
sliderTrack.addEventListener('mousedown', swipeStart);
