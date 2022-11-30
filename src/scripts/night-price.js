const setNightPrice = () => {
  const BASE_PRICE = 17.45;
  const VALUE_ROUND_NUMBER = 2;

  const NightConfig = {
    START: 5,
    MIN: 1,
    MAX: 9
  };

  const GuestsConfig = {
    START: 4,
    MIN: 1,
    MAX: 9
  };

  const sleepSection = document.querySelector('.sleep');

  const resultPrice = sleepSection.querySelector('.result-price').querySelector('.price-value');

  const nightSection = sleepSection.querySelector('.night');
  const nightInput = nightSection.querySelector('.night-value');

  const guestsSection = sleepSection.querySelector('.guests');
  const guestsInput = sleepSection.querySelector('.guests-value');

  const getPrice = () => {
    resultPrice.textContent = (BASE_PRICE * Number(nightInput.textContent) * Number(guestsInput.textContent)).toFixed(VALUE_ROUND_NUMBER);
  }


  const changeValue = (attributeConfig, section, changeInput) => {
    const { START, MIN, MAX } = attributeConfig;
    let value = START;

    const onSectionClick = (evt) => {
      if (evt.target.closest('.minus') && value > MIN) {
        value--;
        changeInput.textContent = value;
      } else if (evt.target.closest('.plus') && value < MAX) {
        value++;
        changeInput.textContent = value;
      }
      getPrice();
    };

    section.addEventListener('click', onSectionClick);
  };

  changeValue(NightConfig, nightSection, nightInput);
  changeValue(GuestsConfig, guestsSection, guestsInput);
};

setNightPrice();
