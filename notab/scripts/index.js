const cookiesBar = document.querySelector('.cookies-confirm');
const confirmButton = document.querySelector('.cookies-confirm__button');
const phone = document.querySelector('.iphone_place_mission');
const missionDescription = document.querySelector('.mission__description');
const contactForm = document.querySelector('.form');
const formSubmitButton = document.querySelector('.form__submit-button');
const formInput = contactForm.querySelectorAll('.form__input');
const step = 0.4;
const stepMission = 1;
const start = 0;
const finish = 93;
let screenWidth;
let width;
let y = this.window.scrollY;
let mobile = false;
let notShowedCookiesBar = true;
let startOpacity = 1;
const startAngle = 90;
const startMarginPhone = 0;
const startMarginDescription = 0;
let isThrottledShowCookiesBar = false;
let isThrottledShowPhone = false;
let notShowedPhone = true;

function init() {
    screenWidth = document.documentElement.scrollWidth
    width = (screenWidth >= 1440) ? 1440 : screenWidth;
    console.log(screenWidth);
    console.log(width);
    if (width > 767) {
        phone.style.transform = 'translate(' + startMarginPhone + 'px,  0px) rotate(' + startAngle + 'deg)';
    } else {
        phone.style.transform = 'translate(' + startMarginPhone + 'px,  0px) rotate(' + 0 + 'deg)';
    }

    missionDescription.style.transform = 'translate(' + startMarginDescription + 'px)';
    missionDescription.style.opacity = startOpacity;
}

init();

contactForm.addEventListener('submit', function (evt) {

    evt.preventDefault();
    console.log("hmm");
    formInput.forEach( function (item) {
        if (item.value) {
            item.classList.remove('form__input_type_empty');
        } else {
            item.classList.add('form__input_type_empty');
        }
    });
});



window.addEventListener('resize', init);

showCookiesBarOnMobile()

function showCookiesBarOnMobile() {
    if (width >= 540) {
        showCookiesBar(start, finish);
    }

}


function showCookiesBar(start, finish) {
    if (isThrottledShowCookiesBar) {
        return
    } else {
        let x = start;
        cookiesBar.style.visibility = 'visible'
        let timer = setInterval(function () {

            if (x <= finish) {
                cookiesBar.style.transform = 'translate( 0, ' + -x + 'px)';
                x += step;
                isThrottledShowCookiesBar = true;
            } else {
                x = finish;
                cookiesBar.style.transform = 'translate( 0, ' + -x + 'px)';
                clearInterval(timer);
                isThrottledShowCookiesBar = false;
                notShowedCookiesBar = false;
            }
        }, 1)
    }
}


confirmButton.addEventListener('click', hideCookiesBar)

function hideCookiesBar() {
    cookiesBar.style.visibility = 'hidden';

}

window.addEventListener('scroll', function () {
    y = this.window.scrollY;
    if (y >= 1100 && y <= 1193 && notShowedCookiesBar) {
        showCookiesBar(start, finish);
    }
    if (y >= 1250 && y <= 1350 && width > 1023 && notShowedPhone) {
        showPhone();
    }
});

function showPhone() {

    if (isThrottledShowPhone) {
        return
    } else {

        let marginPhone = startMarginPhone;
        let phoneAngle = startAngle;
        let marginDescription = startMarginDescription;
        let opacity = startOpacity;
        const marginPhoneStep = (width / 2 - startMarginPhone - (phone.offsetWidth / 2)) / startAngle * step;
        const marginDescriptionStep = (width - startMarginDescription) / startAngle * step;
        const opacityStep = startOpacity / startAngle * step;

        let timer = setInterval(function () {

            if (phoneAngle >= 0) {
                phone.style.transform = 'translate(' + marginPhone + 'px,  0px) rotate(' + phoneAngle + 'deg)';
                missionDescription.style.transform = 'translate(' + marginDescription + 'px)';
                missionDescription.style.opacity = opacity;
                marginDescription += marginDescriptionStep;
                phoneAngle -= step;
                marginPhone += marginPhoneStep;
                opacity -= opacityStep;
                isThrottledShowPhone = true;
            } else {
                marginPhone = width / 2 - phone.offsetWidth / 2;
                phoneAngle = 0;
                marginDescription = width;
                opacity = 0
                phone.style.transform = 'translate(' + marginPhone + 'px,  0px) rotate(' + phoneAngle + 'deg)';
                missionDescription.style.opacity = opacity;
                clearInterval(timer);
                isThrottledShowPhone = false;
                notShowedPhone = false;
            }
        }, 1)
    }
}