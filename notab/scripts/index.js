const cookiesBar = document.querySelector('.cookies-confirm');
const confirmButton = document.querySelector('.cookies-confirm__button');
const phone = document.querySelector('.iphone_place_mission');
const missionDescription = document.querySelector('.mission__description');
const step = 0.4;
const stepMission = 1;
const start = 0;
const finish = 93;
const screenWidth = document.documentElement.scrollWidth;
let width = (screenWidth >= 1440) ? 1440 : screenWidth;
let y = this.window.scrollY;
let mobile = false;
let notShowedCookiesBar = true;
let startOpacity = 1;
const startAngle = 90;
const startMarginPhone = 40;
const startMarginDescription = 300;
let isThrottledShowCookiesBar = false;
let isThrottledShowPhone = false;
let notShowedPhone = true;
const marginPhoneStep = (width / 2 - startMarginPhone - (phone.offsetWidth / 2)) / startAngle * step;
const marginDescriptionStep = startMarginDescription / startAngle * step;
const opacityStep = startOpacity / startAngle * step;



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
    if (y >= 1100 && y <= 1193 && notConfirmed) {
        showCookiesBar(start, finish);
    }
    if (y >= 1350 && y <= 1450 && width > 1023 && notShowedPhone) {
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
                phone.style.transform = 'translate(' + marginPhone + 'px,  20px) rotate(' + phoneAngle + 'deg)';
                missionDescription.style.transform = 'translate(' + marginDescription + 'px) opacity(' + opacity + ')';
                clearInterval(timer);
                isThrottledShowPhone = false;
                notShowedPhone = false;
            }
        }, 1)
    }
}