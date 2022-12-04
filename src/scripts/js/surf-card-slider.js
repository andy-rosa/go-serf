const initSurfSlider = () => {
  let surfPosition = 0;
  let activeSlide = 1;

  const surf_SLIDER_TO_SHOW = 4;
  const surf_SLIDER_TO_SCROLL = 1;

  const surfSliderContainer = document.querySelector('.surf-slider');
  const surfSliderTrack = document.querySelector('.surf-slider__track');
  const surfSliderItems = document.querySelectorAll('.surf-box');

  const buttonSurfPrev = document.querySelector('.surf-slider-buttons__container .button--prev');
  const buttonSurfNext = document.querySelector('.surf-slider-buttons__container .button--next');

  const itemsSurfCount = surfSliderItems.length;
  const itemSurfWidth = (surfSliderContainer.clientWidth) / surf_SLIDER_TO_SHOW;

  const moveSurfPosition = surf_SLIDER_TO_SCROLL * itemSurfWidth;

  surfSliderItems.forEach((slide) => {
    slide.style.minWidth = `${itemSurfWidth}px`;
  })

  const setSurfPosition = () => {
    surfSliderTrack.style.transform = `translateX(${surfPosition}px)`;
  };

  const checkSurfButtons = () => {
    buttonSurfPrev.disabled = activeSlide === 0;
    buttonSurfNext.disabled = (surfPosition <= -(itemsSurfCount - surf_SLIDER_TO_SHOW) * itemSurfWidth) && activeSlide === itemsSurfCount - 1;
  };

  const addActiveSlide = () => {
    if ((activeSlide === itemsSurfCount - 1) || buttonSurfNext.disabled) {
      return
    }
    mapDots[activeSlide].classList.remove('slider-dots--current');

    surfSliderItems[activeSlide].querySelector('.surf-box__inner-button').classList.remove('surf-box__inner-button--active')
    surfSliderItems[activeSlide].querySelector('.surf-box__inner').style.background = null;
    ++activeSlide;
    surfSliderItems[activeSlide].querySelector('.surf-box__inner-button').classList.add('surf-box__inner-button--active')
    surfSliderItems[activeSlide].querySelector('.surf-box__inner').style.background = 'rgba(28,33,33,0.3)';
    mapDots[activeSlide].classList.add('slider-dots--current');

  };

  const removeActiveSlide = () => {
    if ((activeSlide === 0) || buttonSurfPrev.disabled) {
      return
    }
    mapDots[activeSlide].classList.remove('slider-dots--current');

    surfSliderItems[activeSlide].querySelector('.surf-box__inner-button').classList.remove('surf-box__inner-button--active')
    surfSliderItems[activeSlide].querySelector('.surf-box__inner').style.background = null;
    activeSlide--;
    surfSliderItems[activeSlide].querySelector('.surf-box__inner-button').classList.add('surf-box__inner-button--active')
    surfSliderItems[activeSlide].querySelector('.surf-box__inner').style.background = 'rgba(28,33,33,0.3)';
    mapDots[activeSlide].classList.add('slider-dots--current');

  };

  const onSurfButtonNextClick = () => {
    const itemsLeft = itemsSurfCount - (Math.abs(surfPosition) + surf_SLIDER_TO_SHOW * itemSurfWidth) / itemSurfWidth;

    surfPosition -= itemsLeft >= surf_SLIDER_TO_SCROLL ? moveSurfPosition : itemsLeft * itemSurfWidth;

    addActiveSlide();
    setSurfPosition();
    checkSurfButtons();

  };

  const onSurfButtonBackClick = () => {
    const itemsLeft = Math.abs(surfPosition) / itemSurfWidth;

    surfPosition += itemsLeft >= surf_SLIDER_TO_SCROLL ? moveSurfPosition : itemsLeft * itemSurfWidth;

    removeActiveSlide();
    setSurfPosition();
    checkSurfButtons();
  };




  const onSurfButtonsControlsClick = (evt) => {
    if (evt.target.matches('.button--next img')) {
      onSurfButtonNextClick();
    }
    if (evt.target.matches('.button--prev img')) {
      onSurfButtonBackClick()
    }
  }


  surfSliderContainer.addEventListener('click', onSurfButtonsControlsClick)
  // surfSliderContainer.addEventListener('wheel', (evt) => {
  // evt.preventDefault();
  //   surfSliderTrack.style.transform += `translateX(${evt.deltaY}px)`;
  // })

  checkSurfButtons();


  const onSlideClick = (evt) => {
    if (evt.target.matches('.surf-box__inner')) {
      mapDots[activeSlide].classList.remove('slider-dots--current');

      surfSliderItems[activeSlide].querySelector('.surf-box__inner-button')
        .classList.remove('surf-box__inner-button--active');
      surfSliderItems[activeSlide].querySelector('.surf-box__inner')
        .style.background = null;

      evt.target.querySelector('.surf-box__inner-button')
        .classList.add('surf-box__inner-button--active');
      evt.target
        .style.background = 'rgba(28,33,33,0.3)';

      activeSlide = +evt.target.closest('.surf-box').dataset.slideIndex;
      mapDots[activeSlide].classList.add('slider-dots--current');

      checkSurfButtons();
    }
  };

  surfSliderItems[activeSlide].querySelector('.surf-box__inner').style.backgroundColor = 'rgba(28,33,33,0.3)';

  surfSliderContainer.addEventListener('click', onSlideClick);

  // slider-map

  const sliderMap = document.querySelector('.slider-map');
  const mapDots = sliderMap.querySelectorAll('.slider-dots')

  sliderMap.addEventListener('click', (evt) => {
    if (evt.target.closest('.slider-dots')) {
      mapDots[activeSlide].classList.remove('slider-dots--current')
      surfSliderItems[activeSlide].querySelector('.surf-box__inner-button').classList.remove('surf-box__inner-button--active')
      surfSliderItems[activeSlide].querySelector('.surf-box__inner').style.background = null;

      activeSlide = evt.target.closest('.slider-dots').dataset.slideIndex;

      mapDots[activeSlide].classList.add('slider-dots--current')
      surfSliderItems[activeSlide].querySelector('.surf-box__inner-button').classList.add('surf-box__inner-button--active')
      surfSliderItems[activeSlide].querySelector('.surf-box__inner').style.background = 'rgba(28,33,33,0.3)';
    }
  })
};
initSurfSlider();
