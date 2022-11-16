let position = 0;

const START_ACTIVE_SLIDE = 0;
const SLIDER_TO_SHOW = 1;
const SLIDER_TO_SCROLL = 1;
const SLIDER_ACTIVE_SLIDE = 'slider-dots__item--active';

const sliderDots = document.querySelectorAll('.slider-dots__item');
const sliderContainer = document.querySelector('.header__slider');
const sliderTrack = document.querySelector('.slider__track');
const sliderItems = document.querySelectorAll('.header__slider-item');
const buttonPrev = document.querySelector('.button--prev');
const buttonNext = document.querySelector('.button--next');

const itemsCount = sliderItems.length;
const itemWidth = (sliderContainer.clientWidth) / SLIDER_TO_SHOW;
const movePosition = SLIDER_TO_SCROLL * itemWidth;

sliderItems.forEach((slide) => {
  slide.style.minWidth = `${itemWidth}px`;
})

const setPosition = () => {
  sliderTrack.style.transform = `translateX(${position}px)`;
};

const checkButtons = () => {
  buttonPrev.disabled = position === 0;
  buttonNext.disabled = position <= -(itemsCount - SLIDER_TO_SHOW) * itemWidth;
};

const setActiveSlide = (slide) => {
  let activeSlide = slide;

  return (evt) => {
    sliderDots[activeSlide].classList.remove(SLIDER_ACTIVE_SLIDE);
    if (evt.target.matches('.button--next img') && activeSlide < itemsCount - 1) {
      ++activeSlide
    } else if (evt.target.matches('.button--prev img') && activeSlide > 0) {
      --activeSlide
    }
    sliderDots[activeSlide].classList.add(SLIDER_ACTIVE_SLIDE);
  }
};

const swapActiveSlider = setActiveSlide(START_ACTIVE_SLIDE);

const onButtonNextClick = (evt) => {
  const itemsLeft = itemsCount - (Math.abs(position) + SLIDER_TO_SHOW * itemWidth) / itemWidth;

  position -= itemsLeft >= SLIDER_TO_SCROLL ? movePosition : itemsLeft * itemWidth;

  swapActiveSlider(evt);
  setPosition();
  checkButtons();
};

const onButtonBackCLick = (evt) => {
  const itemsLeft = Math.abs(position) / itemWidth;

  position += itemsLeft >= SLIDER_TO_SCROLL ? movePosition : itemsLeft * itemWidth;

  swapActiveSlider(evt);
  setPosition();
  checkButtons();
};

const onButtonsControlsClick = (evt) => {
  if (evt.target.matches('.button--next img')) {
    onButtonNextClick(evt);
  }
  if (evt.target.matches('.button--prev img')) {
    onButtonBackCLick(evt)
  }
}

sliderContainer.addEventListener('click', onButtonsControlsClick)

checkButtons();
